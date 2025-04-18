"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuerySourceSparql = void 0;
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_metadata_1 = require("@comunica/utils-metadata");
const asynciterator_1 = require("asynciterator");
const fetch_sparql_endpoint_1 = require("fetch-sparql-endpoint");
const lru_cache_1 = require("lru-cache");
const rdf_terms_1 = require("rdf-terms");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
const COUNT_INFINITY = { type: 'estimate', value: Number.POSITIVE_INFINITY };
class QuerySourceSparql {
    constructor(url, context, mediatorHttp, bindMethod, dataFactory, algebraFactory, bindingsFactory, forceHttpGet, cacheSize, countTimeout) {
        this.referenceValue = url;
        this.url = url;
        this.context = context;
        this.mediatorHttp = mediatorHttp;
        this.bindMethod = bindMethod;
        this.dataFactory = dataFactory;
        this.algebraFactory = algebraFactory;
        this.bindingsFactory = bindingsFactory;
        this.endpointFetcher = new fetch_sparql_endpoint_1.SparqlEndpointFetcher({
            method: forceHttpGet ? 'GET' : 'POST',
            fetch: (input, init) => this.mediatorHttp.mediate({ input, init, context: this.lastSourceContext }),
            prefixVariableQuestionMark: true,
            dataFactory,
        });
        this.cache = cacheSize > 0 ?
            new lru_cache_1.LRUCache({ max: cacheSize }) :
            undefined;
        this.countTimeout = countTimeout;
    }
    async getSelectorShape() {
        return QuerySourceSparql.SELECTOR_SHAPE;
    }
    queryBindings(operationIn, context, options) {
        // If bindings are passed, modify the operations
        let operationPromise;
        if (options?.joinBindings) {
            operationPromise = QuerySourceSparql.addBindingsToOperation(this.algebraFactory, this.bindMethod, operationIn, options.joinBindings);
        }
        else {
            operationPromise = Promise.resolve(operationIn);
        }
        const bindings = new asynciterator_1.TransformIterator(async () => {
            // Prepare queries
            const operation = await operationPromise;
            const variables = sparqlalgebrajs_1.Util.inScopeVariables(operation);
            const queryString = context.get(context_entries_1.KeysInitQuery.queryString);
            const selectQuery = !options?.joinBindings && queryString ?
                queryString :
                QuerySourceSparql.operationToSelectQuery(this.algebraFactory, operation, variables);
            const undefVariables = QuerySourceSparql.getOperationUndefs(operation);
            return this.queryBindingsRemote(this.url, selectQuery, variables, context, undefVariables);
        }, { autoStart: false });
        this.attachMetadata(bindings, context, operationPromise);
        return bindings;
    }
    queryQuads(operation, context) {
        this.lastSourceContext = this.context.merge(context);
        const rawStream = this.endpointFetcher.fetchTriples(this.url, context.get(context_entries_1.KeysInitQuery.queryString) ?? QuerySourceSparql.operationToQuery(operation));
        this.lastSourceContext = undefined;
        const quads = (0, asynciterator_1.wrap)(rawStream, { autoStart: false, maxBufferSize: Number.POSITIVE_INFINITY });
        this.attachMetadata(quads, context, Promise.resolve(operation.input));
        return quads;
    }
    queryBoolean(operation, context) {
        this.lastSourceContext = this.context.merge(context);
        const promise = this.endpointFetcher.fetchAsk(this.url, context.get(context_entries_1.KeysInitQuery.queryString) ?? QuerySourceSparql.operationToQuery(operation));
        this.lastSourceContext = undefined;
        return promise;
    }
    queryVoid(operation, context) {
        this.lastSourceContext = this.context.merge(context);
        const promise = this.endpointFetcher.fetchUpdate(this.url, context.get(context_entries_1.KeysInitQuery.queryString) ?? QuerySourceSparql.operationToQuery(operation));
        this.lastSourceContext = undefined;
        return promise;
    }
    attachMetadata(target, context, operationPromise) {
        // Emit metadata containing the estimated count
        let variablesCount = [];
        // eslint-disable-next-line no-async-promise-executor,ts/no-misused-promises
        new Promise(async (resolve, reject) => {
            // Prepare queries
            let countQuery;
            try {
                const operation = await operationPromise;
                const variablesScoped = sparqlalgebrajs_1.Util.inScopeVariables(operation);
                countQuery = QuerySourceSparql.operationToCountQuery(this.dataFactory, this.algebraFactory, operation);
                const undefVariables = QuerySourceSparql.getOperationUndefs(operation);
                variablesCount = variablesScoped.map(variable => ({
                    variable,
                    canBeUndef: undefVariables.some(undefVariable => undefVariable.equals(variable)),
                }));
                const cachedCardinality = this.cache?.get(countQuery);
                if (cachedCardinality !== undefined) {
                    return resolve(cachedCardinality);
                }
                const timeoutHandler = setTimeout(() => resolve(COUNT_INFINITY), this.countTimeout);
                const varCount = this.dataFactory.variable('count');
                const bindingsStream = await this
                    .queryBindingsRemote(this.url, countQuery, [varCount], context, []);
                bindingsStream.on('data', (bindings) => {
                    clearTimeout(timeoutHandler);
                    const count = bindings.get(varCount);
                    const cardinality = { type: 'estimate', value: Number.POSITIVE_INFINITY };
                    if (count) {
                        const cardinalityValue = Number.parseInt(count.value, 10);
                        if (!Number.isNaN(cardinalityValue)) {
                            cardinality.type = 'exact';
                            cardinality.value = cardinalityValue;
                            this.cache?.set(countQuery, cardinality);
                        }
                    }
                    return resolve(cardinality);
                });
                bindingsStream.on('error', () => {
                    clearTimeout(timeoutHandler);
                    resolve(COUNT_INFINITY);
                });
                bindingsStream.on('end', () => {
                    clearTimeout(timeoutHandler);
                    resolve(COUNT_INFINITY);
                });
            }
            catch (error) {
                return reject(error);
            }
        })
            .then((cardinality) => {
            target.setProperty('metadata', {
                state: new utils_metadata_1.MetadataValidationState(),
                cardinality,
                variables: variablesCount,
            });
        })
            .catch(() => target.setProperty('metadata', {
            state: new utils_metadata_1.MetadataValidationState(),
            cardinality: COUNT_INFINITY,
            variables: variablesCount,
        }));
    }
    /**
     * Create an operation that includes the bindings from the given bindings stream.
     * @param algebraFactory The algebra factory.
     * @param bindMethod A method for adding bindings to an operation.
     * @param operation The operation to bind to.
     * @param addBindings The bindings to add.
     * @param addBindings.bindings The bindings stream.
     * @param addBindings.metadata The bindings metadata.
     */
    static async addBindingsToOperation(algebraFactory, bindMethod, operation, addBindings) {
        const bindings = await addBindings.bindings.toArray();
        switch (bindMethod) {
            case 'values':
                return algebraFactory.createJoin([
                    algebraFactory.createValues(addBindings.metadata.variables.map(v => v.variable), bindings.map(binding => Object.fromEntries([...binding]
                        .map(([key, value]) => [`?${key.value}`, value])))),
                    operation,
                ], false);
            case 'union': {
                throw new Error('Not implemented yet: "union" case');
            }
            case 'filter': {
                throw new Error('Not implemented yet: "filter" case');
            }
        }
    }
    /**
     * Convert an operation to a select query for this pattern.
     * @param algebraFactory The algebra factory.
     * @param {Algebra.Operation} operation A query operation.
     * @param {RDF.Variable[]} variables The variables in scope for the operation.
     * @return {string} A select query string.
     */
    static operationToSelectQuery(algebraFactory, operation, variables) {
        return QuerySourceSparql.operationToQuery(algebraFactory.createProject(operation, variables));
    }
    /**
     * Convert an operation to a count query for the number of matching triples for this pattern.
     * @param dataFactory The data factory.
     * @param algebraFactory The algebra factory.
     * @param {Algebra.Operation} operation A query operation.
     * @return {string} A count query string.
     */
    static operationToCountQuery(dataFactory, algebraFactory, operation) {
        return QuerySourceSparql.operationToQuery(algebraFactory.createProject(algebraFactory.createExtend(algebraFactory.createGroup(operation, [], [algebraFactory.createBoundAggregate(dataFactory.variable('var0'), 'count', algebraFactory.createWildcardExpression(), false)]), dataFactory.variable('count'), algebraFactory.createTermExpression(dataFactory.variable('var0'))), [dataFactory.variable('count')]));
    }
    /**
     * Convert an operation to a query for this pattern.
     * @param {Algebra.Operation} operation A query operation.
     * @return {string} A query string.
     */
    static operationToQuery(operation) {
        return (0, sparqlalgebrajs_1.toSparql)(operation, { sparqlStar: true });
    }
    /**
     * Check if the given operation may produce undefined values.
     * @param operation
     */
    static getOperationUndefs(operation) {
        const variables = [];
        sparqlalgebrajs_1.Util.recurseOperation(operation, {
            leftjoin(subOperation) {
                const left = sparqlalgebrajs_1.Util.inScopeVariables(subOperation.input[0]);
                const right = sparqlalgebrajs_1.Util.inScopeVariables(subOperation.input[1]);
                for (const varRight of right) {
                    if (!left.some(varLeft => varLeft.equals(varRight))) {
                        variables.push(varRight);
                    }
                }
                return false;
            },
            values(values) {
                for (const variable of values.variables) {
                    if (values.bindings.some(bindings => !(`?${variable.value}` in bindings))) {
                        variables.push(variable);
                    }
                }
                return false;
            },
            union(union) {
                // Determine variables in scope of the union branches that are not occurring in every branch
                const scopedVariables = union.input.map(sparqlalgebrajs_1.Util.inScopeVariables);
                for (const variable of (0, rdf_terms_1.uniqTerms)(scopedVariables.flat())) {
                    if (!scopedVariables.every(input => input.some(inputVar => inputVar.equals(variable)))) {
                        variables.push(variable);
                    }
                }
                return true;
            },
        });
        return (0, rdf_terms_1.uniqTerms)(variables);
    }
    /**
     * Send a SPARQL query to a SPARQL endpoint and retrieve its bindings as a stream.
     * @param {string} endpoint A SPARQL endpoint URL.
     * @param {string} query A SPARQL query string.
     * @param {RDF.Variable[]} variables The expected variables.
     * @param {IActionContext} context The source context.
     * @param undefVariables Variables that may have undefs.
     * @return {BindingsStream} A stream of bindings.
     */
    async queryBindingsRemote(endpoint, query, variables, context, undefVariables) {
        // Index undef variables
        const undefVariablesIndex = new Set();
        for (const undefVariable of undefVariables) {
            undefVariablesIndex.add(undefVariable.value);
        }
        this.lastSourceContext = this.context.merge(context);
        const rawStream = await this.endpointFetcher.fetchBindings(endpoint, query);
        this.lastSourceContext = undefined;
        return (0, asynciterator_1.wrap)(rawStream, { autoStart: false, maxBufferSize: Number.POSITIVE_INFINITY })
            .map((rawData) => this.bindingsFactory.bindings(variables
            .map((variable) => {
            const value = rawData[`?${variable.value}`];
            if (!undefVariablesIndex.has(variable.value) && !value) {
                core_1.Actor.getContextLogger(this.context)?.warn(`The endpoint ${endpoint} failed to provide a binding for ${variable.value}.`);
            }
            return [variable, value];
        })
            .filter(([_, v]) => Boolean(v))));
    }
    toString() {
        return `QuerySourceSparql(${this.url})`;
    }
}
exports.QuerySourceSparql = QuerySourceSparql;
QuerySourceSparql.SELECTOR_SHAPE = {
    type: 'disjunction',
    children: [
        {
            type: 'operation',
            operation: { operationType: 'wildcard' },
            joinBindings: true,
        },
    ],
};
//# sourceMappingURL=QuerySourceSparql.js.map