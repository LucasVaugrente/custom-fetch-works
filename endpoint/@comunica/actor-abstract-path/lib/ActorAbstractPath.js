"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorAbstractPath = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const asynciterator_1 = require("asynciterator");
const rdf_string_1 = require("rdf-string");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
const PathVariableObjectIterator_1 = require("./PathVariableObjectIterator");
/**
 * An abstract actor that handles Path operations.
 *
 * Provides multiple helper functions used by the Path operation actors.
 */
class ActorAbstractPath extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args, predicateType) {
        super(args, 'path');
        this.predicateType = predicateType;
    }
    async testOperation(operation, _context) {
        if (operation.predicate.type !== this.predicateType) {
            return (0, core_1.failTest)(`This Actor only supports ${this.predicateType} Path operations.`);
        }
        return (0, core_1.passTestVoid)();
    }
    // Generates a variable that does not yet occur in the path
    generateVariable(dataFactory, path, name) {
        if (!name) {
            return this.generateVariable(dataFactory, path, 'b');
        }
        // Path predicates can't contain variables
        if (path && (path.subject.value === name || path.object.value === name)) {
            return this.generateVariable(dataFactory, path, `${name}b`);
        }
        return dataFactory.variable(name);
    }
    // Such connectivity matching does not introduce duplicates (it does not incorporate any count of the number
    // of ways the connection can be made) even if the repeated path itself would otherwise result in duplicates.
    // https://www.w3.org/TR/sparql11-query/#propertypaths
    async isPathArbitraryLengthDistinct(algebraFactory, context, path) {
        if (!context.get(context_entries_1.KeysQueryOperation.isPathArbitraryLengthDistinctKey)) {
            context = context.set(context_entries_1.KeysQueryOperation.isPathArbitraryLengthDistinctKey, true);
            return { context, operation: (0, utils_query_operation_1.getSafeBindings)(await this.mediatorQueryOperation.mediate({
                    operation: algebraFactory.createDistinct(path),
                    context,
                })) };
        }
        context = context.set(context_entries_1.KeysQueryOperation.isPathArbitraryLengthDistinctKey, false);
        return { context, operation: undefined };
    }
    async predicateStarGraphVariable(subject, object, predicate, graph, context, algebraFactory, bindingsFactory) {
        const sources = this.getPathSources(predicate);
        // TODO: refactor this with an iterator just like PathVariableObjectIterator so we handle backpressure correctly
        // Construct path to obtain all graphs where subject exists
        const predVar = this.generateVariable(algebraFactory.dataFactory, algebraFactory
            .createPath(subject, predicate, object, graph));
        const findGraphs = algebraFactory.createUnion([
            this.assignPatternSources(algebraFactory, algebraFactory.createPattern(subject, predVar, object, graph), sources),
            this.assignPatternSources(algebraFactory, algebraFactory.createPattern(object, predVar, subject, graph), sources),
        ]);
        const results = (0, utils_query_operation_1.getSafeBindings)(await this.mediatorQueryOperation.mediate({ context, operation: findGraphs }));
        const passedGraphs = new Set();
        const bindingsStream = new asynciterator_1.MultiTransformIterator(results.bindingsStream, {
            multiTransform: (bindings) => {
                // Extract the graph and start a predicate* search starting from subject in each graph
                const graphValue = bindings.get(graph);
                if (passedGraphs.has(graphValue.value)) {
                    return new asynciterator_1.EmptyIterator();
                }
                passedGraphs.add(graphValue.value);
                return new asynciterator_1.TransformIterator(async () => {
                    const it = new asynciterator_1.BufferedIterator();
                    await this
                        .getObjectsPredicateStar(algebraFactory, subject, predicate, graphValue, context, {}, it, { count: 0 });
                    return it.transform({
                        transform(item, next, push) {
                            push(bindingsFactory.bindings([
                                [object, item],
                                [graph, graphValue],
                            ]));
                            next();
                        },
                    });
                }, { maxBufferSize: 128 });
            },
            autoStart: false,
        });
        return {
            bindingsStream,
            metadata: results.metadata,
        };
    }
    /**
     * Returns an iterator with Bindings of the query subject predicate* ?o or subject predicate+ ?o
     * If graph is a variable, it will also be in those bindings
     * @param {Term} subject Term of where we start the predicate* search.
     * @param {Algebra.PropertyPathSymbol} predicate Predicate of the *-path.
     * @param {Variable} object Variable of the zeroOrMore-query.
     * @param {Term} graph The graph in which we search for the pattern. (Possibly a variable)
     * @param {ActionContext} context The context to pass to sub-opertations
     * @param emitFirstSubject If the path operation is predicate*, otherwise it is predicate+.
     * @param algebraFactory The algebra factory.
     * @param bindingsFactory The data factory.
     * @return {Promise<AsyncIterator<Bindings>} Iterator to where all bindings of query should have been pushed.
     */
    async getObjectsPredicateStarEval(subject, predicate, object, graph, context, emitFirstSubject, algebraFactory, bindingsFactory) {
        if (graph.termType === 'Variable') {
            return this
                .predicateStarGraphVariable(subject, object, predicate, graph, context, algebraFactory, bindingsFactory);
        }
        const it = new PathVariableObjectIterator_1.PathVariableObjectIterator(algebraFactory, subject, predicate, graph, context, this.mediatorQueryOperation, emitFirstSubject);
        const bindingsStream = it.transform({
            autoStart: false,
            transform(item, next, push) {
                push(bindingsFactory.bindings([[object, item]]));
                next();
            },
        });
        return {
            bindingsStream,
            async metadata() {
                const metadata = await new Promise((resolve) => {
                    it.getProperty('metadata', (metadataInner) => resolve(metadataInner()));
                });
                // Increment cardinality by one, because we always have at least one result once we reach this stage.
                // See the transformation above where we push a single binding.
                metadata.cardinality.value++;
                return metadata;
            },
        };
    }
    /**
     * Pushes all terms to iterator `it` that are a solution of object predicate* ?o.
     * @param algebraFactory The algebra factory.
     * @param {Term} object Term of where we start the predicate* search.
     * @param {Algebra.PropertyPathSymbol} predicate Predicate of the *-path.
     * @param {Term} graph The graph in which we search for the pattern.
     * @param {ActionContext} context
     * @param {Record<string, Term>} termHashes Remembers the objects we've already searched for.
     * @param {BufferedIterator<Term>} it Iterator to push terms to.
     * @param {any} counter Counts how many searches are in progress to close it when needed (when counter == 0).
     * @return {Promise<IPathResultStream['metadata']>} The results metadata.
     */
    async getObjectsPredicateStar(algebraFactory, object, predicate, graph, context, termHashes, it, counter) {
        const termString = (0, rdf_string_1.termToString)(object);
        if (termHashes[termString]) {
            return;
        }
        it._push(object);
        termHashes[termString] = object;
        counter.count++;
        const thisVariable = this.generateVariable(algebraFactory.dataFactory);
        const path = algebraFactory.createPath(object, predicate, thisVariable, graph);
        const results = (0, utils_query_operation_1.getSafeBindings)(await this.mediatorQueryOperation.mediate({ operation: path, context }));
        // TODO: fixme
        // eslint-disable-next-line ts/no-misused-promises
        results.bindingsStream.on('data', async (bindings) => {
            const result = bindings.get(thisVariable);
            await this.getObjectsPredicateStar(algebraFactory, result, predicate, graph, context, termHashes, it, counter);
        });
        results.bindingsStream.on('end', () => {
            if (--counter.count === 0) {
                it.close();
            }
        });
        return results.metadata;
    }
    /**
     * Pushes all terms to iterator `it` that are a solution of ?s predicate* ?o.
     * @param {string} subjectVar String representation of subjectVariable
     * @param {string} objectVar String representation of objectVariable
     * @param {Term} subjectVal Term of where we start the predicate* search.
     * @param {Term} objectVal Found solution for an object, start for the new step.
     * @param {Algebra.PropertyPathSymbol} predicate Predicate of the *-path.
     * @param {Term} graph The graph in which we search for the pattern.
     * @param {ActionContext} context
     * @param {{[id: string]: Promise<Term[]>}} termHashesGlobal
     * Remembers solutions for when objectVal is already been calculated, can be reused when same objectVal occurs
     * @param {{[id: string]: Term}} termHashesCurrentSubject
     * Remembers the pairs we've already searched for, can stop searching if so.
     * @param {BufferedIterator<Bindings>} it Iterator to push terms to.
     * @param {any} counter Counts how many searches are in progress to close it when needed (when counter == 0).
     * @param algebraFactory The algebra factory.
     * @param bindingsFactory The bindings factory.
     * @return {Promise<void>} All solutions of query should have been pushed to it by then.
     */
    // Let the iterator `it` emit all bindings of size 2, with subjectStringVariable as value subjectVal
    // and objectStringVariable as value all nodes reachable through predicate* beginning at objectVal
    async getSubjectAndObjectBindingsPredicateStar(subjectVar, objectVar, subjectVal, objectVal, predicate, graph, context, termHashesGlobal, termHashesCurrentSubject, it, counter, algebraFactory, bindingsFactory) {
        const termString = (0, rdf_string_1.termToString)(objectVal) + (0, rdf_string_1.termToString)(graph);
        // If this combination of subject and object already done, return nothing
        if (termHashesCurrentSubject[termString]) {
            return;
        }
        counter.count++;
        termHashesCurrentSubject[termString] = true;
        it._push(bindingsFactory.bindings([
            [subjectVar, subjectVal],
            [objectVar, objectVal],
        ]));
        // If every reachable node from object has already been calculated, use these for current subject too
        if (termString in termHashesGlobal) {
            const objects = await termHashesGlobal[termString];
            for (const object of objects) {
                await this.getSubjectAndObjectBindingsPredicateStar(subjectVar, objectVar, subjectVal, object, predicate, graph, context, termHashesGlobal, termHashesCurrentSubject, it, counter, algebraFactory, bindingsFactory);
            }
            if (--counter.count === 0) {
                it.close();
            }
            return;
        }
        // Construct promise to calculate all reachable nodes from this object
        // TODO: fixme
        // eslint-disable-next-line no-async-promise-executor,ts/no-misused-promises
        const promise = new Promise(async (resolve, reject) => {
            const objectsArray = [];
            // Construct path that leads us one step through predicate
            const thisVariable = this.generateVariable(algebraFactory.dataFactory);
            const path = algebraFactory.createPath(objectVal, predicate, thisVariable, graph);
            const results = (0, utils_query_operation_1.getSafeBindings)(await this.mediatorQueryOperation.mediate({ operation: path, context }));
            // Recursive call on all neighbours
            // TODO: fixme
            // eslint-disable-next-line ts/no-misused-promises
            results.bindingsStream.on('data', async (bindings) => {
                const result = bindings.get(thisVariable);
                objectsArray.push(result);
                await this.getSubjectAndObjectBindingsPredicateStar(subjectVar, objectVar, subjectVal, result, predicate, graph, context, termHashesGlobal, termHashesCurrentSubject, it, counter, algebraFactory, bindingsFactory);
            });
            results.bindingsStream.on('error', reject);
            results.bindingsStream.on('end', () => {
                if (--counter.count === 0) {
                    it.close();
                }
                resolve(objectsArray);
            });
        });
        // Set it in the termHashesGlobal when this object occurs again they can wait for this promise
        termHashesGlobal[termString] = promise;
    }
    /**
     * Find all sources recursively contained in the given path operation.
     * @param operation
     */
    getPathSources(operation) {
        switch (operation.type) {
            case sparqlalgebrajs_1.Algebra.types.ALT:
            case sparqlalgebrajs_1.Algebra.types.SEQ:
                return operation.input
                    .flatMap((subOp) => this.getPathSources(subOp));
            case sparqlalgebrajs_1.Algebra.types.INV:
            case sparqlalgebrajs_1.Algebra.types.ONE_OR_MORE_PATH:
            case sparqlalgebrajs_1.Algebra.types.ZERO_OR_MORE_PATH:
            case sparqlalgebrajs_1.Algebra.types.ZERO_OR_ONE_PATH:
                return this.getPathSources(operation.path);
            case sparqlalgebrajs_1.Algebra.types.LINK:
            case sparqlalgebrajs_1.Algebra.types.NPS: {
                const source = (0, utils_query_operation_1.getOperationSource)(operation);
                if (!source) {
                    throw new Error(`Could not find a required source on a link path operation`);
                }
                return [source];
            }
        }
    }
    assignPatternSources(algebraFactory, pattern, sources) {
        if (sources.length === 0) {
            throw new Error(`Attempted to assign zero sources to a pattern during property path handling`);
        }
        if (sources.length === 1) {
            return (0, utils_query_operation_1.assignOperationSource)(pattern, sources[0]);
        }
        return algebraFactory.createUnion(sources
            .map(source => (0, utils_query_operation_1.assignOperationSource)(pattern, source)), true);
    }
}
exports.ActorAbstractPath = ActorAbstractPath;
//# sourceMappingURL=ActorAbstractPath.js.map