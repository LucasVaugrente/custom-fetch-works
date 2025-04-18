"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorOptimizeQueryOperationFilterPushdown = void 0;
const bus_optimize_query_operation_1 = require("@comunica/bus-optimize-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const rdf_terms_1 = require("rdf-terms");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Filter Pushdown Optimize Query Operation Actor.
 */
class ActorOptimizeQueryOperationFilterPushdown extends bus_optimize_query_operation_1.ActorOptimizeQueryOperation {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        let operation = action.operation;
        // eslint-disable-next-line ts/no-this-alias
        const self = this;
        // Split conjunctive filters into nested filters
        if (this.splitConjunctive) {
            operation = sparqlalgebrajs_1.Util.mapOperation(operation, {
                filter(op, factory) {
                    // Split conjunctive filters into separate filters
                    if (op.expression.expressionType === sparqlalgebrajs_1.Algebra.expressionTypes.OPERATOR && op.expression.operator === '&&') {
                        self.logDebug(action.context, `Split conjunctive filter into ${op.expression.args.length} nested filters`);
                        return {
                            recurse: true,
                            result: op.expression.args
                                .reduce((operation, expression) => factory.createFilter(operation, expression), op.input),
                        };
                    }
                    return {
                        recurse: true,
                        result: op,
                    };
                },
            }, algebraFactory);
        }
        // Collect selector shapes of all operations
        const sources = this.getSources(operation);
        // eslint-disable-next-line ts/no-unnecessary-type-assertion
        const sourceShapes = new Map(await Promise.all(sources
            .map(async (source) => [source, await source.source.getSelectorShape(action.context)])));
        // Push down all filters
        // We loop until no more filters can be pushed down.
        let repeat = true;
        let iterations = 0;
        while (repeat && iterations < this.maxIterations) {
            repeat = false;
            operation = sparqlalgebrajs_1.Util.mapOperation(operation, {
                filter(op, factory) {
                    // Check if the filter must be pushed down
                    if (!self.shouldAttemptPushDown(op, sources, sourceShapes)) {
                        return {
                            recurse: true,
                            result: op,
                        };
                    }
                    // For all filter expressions in the operation,
                    // we attempt to push them down as deep as possible into the algebra.
                    const variables = self.getExpressionVariables(op.expression);
                    const [isModified, result] = self
                        .filterPushdown(op.expression, variables, op.input, factory, action.context);
                    if (isModified) {
                        repeat = true;
                    }
                    return {
                        recurse: true,
                        result,
                    };
                },
            });
            iterations++;
        }
        if (iterations > 1) {
            self.logDebug(action.context, `Pushed down filters in ${iterations} iterations`);
        }
        // Merge nested filters into conjunctive filters
        if (this.mergeConjunctive) {
            operation = sparqlalgebrajs_1.Util.mapOperation(operation, {
                filter(op, factory) {
                    if (op.input.type === sparqlalgebrajs_1.Algebra.types.FILTER) {
                        const { nestedExpressions, input } = self.getNestedFilterExpressions(op);
                        self.logDebug(action.context, `Merge ${nestedExpressions.length} nested filters into conjunctive filter`);
                        return {
                            recurse: true,
                            result: factory.createFilter(input, nestedExpressions.slice(1).reduce((previous, current) => factory.createOperatorExpression('&&', [previous, current]), nestedExpressions[0])),
                        };
                    }
                    return {
                        recurse: true,
                        result: op,
                    };
                },
            });
        }
        return { operation, context: action.context };
    }
    /**
     * Check if the given filter operation must be attempted to push down, based on the following criteria:
     * - Always push down if aggressive mode is enabled
     * - Push down if the filter is extremely selective
     * - Push down if federated and at least one accepts the filter
     * @param operation The filter operation
     * @param sources The query sources in the operation
     * @param sourceShapes A mapping of sources to selector shapes.
     */
    shouldAttemptPushDown(operation, sources, sourceShapes) {
        // Always push down if aggressive mode is enabled
        if (this.aggressivePushdown) {
            return true;
        }
        // Push down if the filter is extremely selective
        const expression = operation.expression;
        if (expression.expressionType === sparqlalgebrajs_1.Algebra.expressionTypes.OPERATOR &&
            expression.operator === '=' &&
            ((expression.args[0].expressionType === 'term' && expression.args[0].term.termType !== 'Variable' &&
                expression.args[1].expressionType === 'term' && expression.args[1].term.termType === 'Variable') ||
                (expression.args[0].expressionType === 'term' && expression.args[0].term.termType === 'Variable' &&
                    expression.args[1].expressionType === 'term' && expression.args[1].term.termType !== 'Variable'))) {
            return true;
        }
        // Push down if federated and at least one accepts the filter
        if (sources.some(source => (0, utils_query_operation_1.doesShapeAcceptOperation)(sourceShapes.get(source), operation))) {
            return true;
        }
        // Don't push down in all other cases
        return false;
    }
    /**
     * Collected all sources that are defined within the given operation of children recursively.
     * @param operation An operation.
     */
    getSources(operation) {
        const sources = new Set();
        const sourceAdder = (subOperation) => {
            const src = (0, utils_query_operation_1.getOperationSource)(subOperation);
            if (src) {
                sources.add(src);
            }
            return false;
        };
        sparqlalgebrajs_1.Util.recurseOperation(operation, {
            [sparqlalgebrajs_1.Algebra.types.PATTERN]: sourceAdder,
            [sparqlalgebrajs_1.Algebra.types.LINK]: sourceAdder,
            [sparqlalgebrajs_1.Algebra.types.NPS]: sourceAdder,
            [sparqlalgebrajs_1.Algebra.types.SERVICE]: sourceAdder,
        });
        return [...sources];
    }
    /**
     * Get all variables inside the given expression.
     * @param expression An expression.
     * @return An array of variables, or undefined if the expression is unsupported for pushdown.
     */
    getExpressionVariables(expression) {
        switch (expression.expressionType) {
            case sparqlalgebrajs_1.Algebra.expressionTypes.AGGREGATE:
            case sparqlalgebrajs_1.Algebra.expressionTypes.WILDCARD:
                throw new Error(`Getting expression variables is not supported for ${expression.expressionType}`);
            case sparqlalgebrajs_1.Algebra.expressionTypes.EXISTENCE:
                return sparqlalgebrajs_1.Util.inScopeVariables(expression.input);
            case sparqlalgebrajs_1.Algebra.expressionTypes.NAMED:
                return [];
            case sparqlalgebrajs_1.Algebra.expressionTypes.OPERATOR:
                return (0, rdf_terms_1.uniqTerms)(expression.args.flatMap(arg => this.getExpressionVariables(arg)));
            case sparqlalgebrajs_1.Algebra.expressionTypes.TERM:
                if (expression.term.termType === 'Variable') {
                    return [expression.term];
                }
                return [];
        }
    }
    getOverlappingOperations(operation, expressionVariables) {
        const fullyOverlapping = [];
        const partiallyOverlapping = [];
        const notOverlapping = [];
        for (const input of operation.input) {
            const inputVariables = sparqlalgebrajs_1.Util.inScopeVariables(input);
            if (this.variablesSubSetOf(expressionVariables, inputVariables)) {
                fullyOverlapping.push(input);
            }
            else if (this.variablesIntersect(expressionVariables, inputVariables)) {
                partiallyOverlapping.push(input);
            }
            else {
                notOverlapping.push(input);
            }
        }
        return {
            fullyOverlapping,
            partiallyOverlapping,
            notOverlapping,
        };
    }
    /**
     * Recursively push down the given expression into the given operation if possible.
     * Different operators have different semantics for choosing whether or not to push down,
     * and how this pushdown is done.
     * For every passed operator, it is checked whether or not the filter will have any effect on the operation.
     * If not, the filter is voided.
     * @param expression An expression to push down.
     * @param expressionVariables The variables inside the given expression.
     * @param operation The operation to push down into.
     * @param factory An algebra factory.
     * @param context The action context.
     * @return A tuple indicating if the operation was modified and the modified operation.
     */
    filterPushdown(expression, expressionVariables, operation, factory, context) {
        // Void false expressions
        if (this.isExpressionFalse(expression)) {
            return [true, factory.createUnion([])];
        }
        // Don't push down (NOT) EXISTS
        if (expression.type === sparqlalgebrajs_1.Algebra.types.EXPRESSION &&
            expression.expressionType === sparqlalgebrajs_1.Algebra.expressionTypes.EXISTENCE) {
            return [false, factory.createFilter(operation, expression)];
        }
        switch (operation.type) {
            case sparqlalgebrajs_1.Algebra.types.EXTEND:
                // Pass if the variable is not part of the expression
                if (!this.variablesIntersect([operation.variable], expressionVariables)) {
                    return [true, factory.createExtend(this.filterPushdown(expression, expressionVariables, operation.input, factory, context)[1], operation.variable, operation.expression)];
                }
                return [false, factory.createFilter(operation, expression)];
            case sparqlalgebrajs_1.Algebra.types.FILTER: {
                // Always pass
                const [isModified, result] = this
                    .filterPushdown(expression, expressionVariables, operation.input, factory, context);
                return [isModified, factory.createFilter(result, operation.expression)];
            }
            case sparqlalgebrajs_1.Algebra.types.JOIN: {
                // Don't push down for empty join
                if (operation.input.length === 0) {
                    return [false, factory.createFilter(operation, expression)];
                }
                // Determine overlapping operations
                const { fullyOverlapping, partiallyOverlapping, notOverlapping, } = this.getOverlappingOperations(operation, expressionVariables);
                const joins = [];
                let isModified = false;
                if (fullyOverlapping.length > 0) {
                    isModified = true;
                    joins.push(factory.createJoin(fullyOverlapping
                        .map(input => this.filterPushdown(expression, expressionVariables, input, factory, context)[1])));
                }
                if (partiallyOverlapping.length > 0) {
                    joins.push(factory.createFilter(factory.createJoin(partiallyOverlapping, false), expression));
                }
                if (notOverlapping.length > 0) {
                    joins.push(...notOverlapping);
                }
                if (joins.length > 1) {
                    isModified = true;
                }
                if (isModified) {
                    this.logDebug(context, `Push down filter across join entries with ${fullyOverlapping.length} fully overlapping, ${partiallyOverlapping.length} partially overlapping, and ${notOverlapping.length} not overlapping`);
                }
                return [isModified, joins.length === 1 ? joins[0] : factory.createJoin(joins)];
            }
            case sparqlalgebrajs_1.Algebra.types.NOP:
                return [true, operation];
            case sparqlalgebrajs_1.Algebra.types.PROJECT:
                // Push down if variables overlap
                if (this.variablesIntersect(operation.variables, expressionVariables)) {
                    return [true, factory.createProject(this.filterPushdown(expression, expressionVariables, operation.input, factory, context)[1], operation.variables)];
                }
                // Void expression otherwise
                return [true, operation];
            case sparqlalgebrajs_1.Algebra.types.UNION: {
                // Determine overlapping operations
                const { fullyOverlapping, partiallyOverlapping, notOverlapping, } = this.getOverlappingOperations(operation, expressionVariables);
                const unions = [];
                let isModified = false;
                if (fullyOverlapping.length > 0) {
                    isModified = true;
                    unions.push(factory.createUnion(fullyOverlapping
                        .map(input => this.filterPushdown(expression, expressionVariables, input, factory, context)[1])));
                }
                if (partiallyOverlapping.length > 0) {
                    unions.push(factory.createFilter(factory.createUnion(partiallyOverlapping, false), expression));
                }
                if (notOverlapping.length > 0) {
                    unions.push(...notOverlapping);
                }
                if (unions.length > 1) {
                    isModified = true;
                }
                if (isModified) {
                    this.logDebug(context, `Push down filter across union entries with ${fullyOverlapping.length} fully overlapping, ${partiallyOverlapping.length} partially overlapping, and ${notOverlapping.length} not overlapping`);
                }
                return [isModified, unions.length === 1 ? unions[0] : factory.createUnion(unions)];
            }
            case sparqlalgebrajs_1.Algebra.types.VALUES:
                // Only keep filter if it overlaps with the variables
                if (this.variablesIntersect(operation.variables, expressionVariables)) {
                    return [false, factory.createFilter(operation, expression)];
                }
                return [true, operation];
            case sparqlalgebrajs_1.Algebra.types.LEFT_JOIN: {
                if (this.pushIntoLeftJoins) {
                    const rightVariables = sparqlalgebrajs_1.Util.inScopeVariables(operation.input[1]);
                    if (!this.variablesIntersect(expressionVariables, rightVariables)) {
                        // If filter *only* applies to left entry of optional, push it down into that.
                        this.logDebug(context, `Push down filter into left join`);
                        return [true, factory.createLeftJoin(this.filterPushdown(expression, expressionVariables, operation.input[0], factory, context)[1], operation.input[1], operation.expression)];
                    }
                }
                // Don't push down in all other cases
                return [false, factory.createFilter(operation, expression)];
            }
            case sparqlalgebrajs_1.Algebra.types.PATTERN: {
                if (this.pushEqualityIntoPatterns) {
                    // Try to push simple FILTER(?s = <iri>) expressions into the pattern
                    const pushableResult = this.getEqualityExpressionPushableIntoPattern(expression);
                    if (pushableResult) {
                        let isModified = false;
                        const originalMetadata = operation.metadata;
                        operation = (0, rdf_terms_1.mapTermsNested)(operation, (value) => {
                            if (value.equals(pushableResult.variable)) {
                                isModified = true;
                                return pushableResult.term;
                            }
                            return value;
                        });
                        operation.type = sparqlalgebrajs_1.Algebra.types.PATTERN;
                        operation.metadata = originalMetadata;
                        if (isModified) {
                            this.logDebug(context, `Push down filter into pattern for ?${pushableResult.variable.value}`);
                            return [true, factory.createJoin([
                                    operation,
                                    factory.createValues([pushableResult.variable], [{ [`?${pushableResult.variable.value}`]: pushableResult.term }]),
                                ])];
                        }
                    }
                }
                // Don't push down in all other cases
                return [false, factory.createFilter(operation, expression)];
            }
            case sparqlalgebrajs_1.Algebra.types.PATH: {
                if (this.pushEqualityIntoPatterns) {
                    // Try to push simple FILTER(?s = <iri>) expressions into the path
                    const pushableResult = this.getEqualityExpressionPushableIntoPattern(expression);
                    if (pushableResult &&
                        (operation.subject.equals(pushableResult.variable) || operation.object.equals(pushableResult.variable))) {
                        this.logDebug(context, `Push down filter into path for ?${pushableResult.variable.value}`);
                        const originalMetadata = operation.metadata;
                        operation = factory.createPath(operation.subject.equals(pushableResult.variable) ? pushableResult.term : operation.subject, operation.predicate, operation.object.equals(pushableResult.variable) ? pushableResult.term : operation.object);
                        operation.metadata = originalMetadata;
                        return [true, factory.createJoin([
                                operation,
                                factory.createValues([pushableResult.variable], [{ [`?${pushableResult.variable.value}`]: pushableResult.term }]),
                            ])];
                    }
                }
                // Don't push down in all other cases
                return [false, factory.createFilter(operation, expression)];
            }
            case sparqlalgebrajs_1.Algebra.types.MINUS:
            case sparqlalgebrajs_1.Algebra.types.ALT:
            case sparqlalgebrajs_1.Algebra.types.ASK:
            case sparqlalgebrajs_1.Algebra.types.BGP:
            case sparqlalgebrajs_1.Algebra.types.CONSTRUCT:
            case sparqlalgebrajs_1.Algebra.types.DESCRIBE:
            case sparqlalgebrajs_1.Algebra.types.DISTINCT:
            case sparqlalgebrajs_1.Algebra.types.EXPRESSION:
            case sparqlalgebrajs_1.Algebra.types.FROM:
            case sparqlalgebrajs_1.Algebra.types.GRAPH:
            case sparqlalgebrajs_1.Algebra.types.GROUP:
            case sparqlalgebrajs_1.Algebra.types.INV:
            case sparqlalgebrajs_1.Algebra.types.LINK:
            case sparqlalgebrajs_1.Algebra.types.NPS:
            case sparqlalgebrajs_1.Algebra.types.ONE_OR_MORE_PATH:
            case sparqlalgebrajs_1.Algebra.types.ORDER_BY:
            case sparqlalgebrajs_1.Algebra.types.REDUCED:
            case sparqlalgebrajs_1.Algebra.types.SEQ:
            case sparqlalgebrajs_1.Algebra.types.SERVICE:
            case sparqlalgebrajs_1.Algebra.types.SLICE:
            case sparqlalgebrajs_1.Algebra.types.ZERO_OR_MORE_PATH:
            case sparqlalgebrajs_1.Algebra.types.ZERO_OR_ONE_PATH:
            case sparqlalgebrajs_1.Algebra.types.COMPOSITE_UPDATE:
            case sparqlalgebrajs_1.Algebra.types.DELETE_INSERT:
            case sparqlalgebrajs_1.Algebra.types.LOAD:
            case sparqlalgebrajs_1.Algebra.types.CLEAR:
            case sparqlalgebrajs_1.Algebra.types.CREATE:
            case sparqlalgebrajs_1.Algebra.types.DROP:
            case sparqlalgebrajs_1.Algebra.types.ADD:
            case sparqlalgebrajs_1.Algebra.types.MOVE:
            case sparqlalgebrajs_1.Algebra.types.COPY:
                // Operations that do not support pushing down
                // Left-join and minus might be possible to support in the future.
                return [false, factory.createFilter(operation, expression)];
        }
    }
    /**
     * Check if the given expression is a simple equals operation with one variable and one non-literal
     * (or literal with canonical lexical form) term that can be pushed into a pattern.
     * @param expression The current expression.
     * @return The variable and term to fill into the pattern, or undefined.
     */
    getEqualityExpressionPushableIntoPattern(expression) {
        if (expression.expressionType === sparqlalgebrajs_1.Algebra.expressionTypes.OPERATOR && expression.operator === '=') {
            if (expression.args[0].expressionType === 'term' && expression.args[0].term.termType !== 'Variable' &&
                (expression.args[0].term.termType !== 'Literal' ||
                    this.isLiteralWithCanonicalLexicalForm(expression.args[0].term)) &&
                expression.args[1].expressionType === 'term' && expression.args[1].term.termType === 'Variable') {
                return {
                    variable: expression.args[1].term,
                    term: expression.args[0].term,
                };
            }
            if (expression.args[0].expressionType === 'term' && expression.args[0].term.termType === 'Variable' &&
                expression.args[1].expressionType === 'term' && expression.args[1].term.termType !== 'Variable' &&
                (expression.args[1].term.termType !== 'Literal' ||
                    this.isLiteralWithCanonicalLexicalForm(expression.args[1].term))) {
                return {
                    variable: expression.args[0].term,
                    term: expression.args[1].term,
                };
            }
        }
    }
    /**
     * Check if the given term is a literal with datatype that where all values
     * can only have one possible lexical representation.
     * In other words, no variants of values exist that should be considered equal.
     * For example: "01"^xsd:number and "1"^xsd:number will return false.
     * @param term An RDF term.
     * @protected
     */
    isLiteralWithCanonicalLexicalForm(term) {
        if (term.termType === 'Literal') {
            switch (term.datatype.value) {
                case 'http://www.w3.org/2001/XMLSchema#string':
                case 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString':
                case 'http://www.w3.org/2001/XMLSchema#normalizedString':
                case 'http://www.w3.org/2001/XMLSchema#anyURI':
                case 'http://www.w3.org/2001/XMLSchema#base64Binary':
                case 'http://www.w3.org/2001/XMLSchema#language':
                case 'http://www.w3.org/2001/XMLSchema#Name':
                case 'http://www.w3.org/2001/XMLSchema#NCName':
                case 'http://www.w3.org/2001/XMLSchema#NMTOKEN':
                case 'http://www.w3.org/2001/XMLSchema#token':
                case 'http://www.w3.org/2001/XMLSchema#hexBinary':
                    return true;
            }
        }
        return false;
    }
    /**
     * Check if there is an overlap between the two given lists of variables.
     * @param varsA A list of variables.
     * @param varsB A list of variables.
     */
    variablesIntersect(varsA, varsB) {
        return varsA.some(varA => varsB.some(varB => varA.equals(varB)));
    }
    /**
     * Check if all variables from the first list are included in the second list.
     * The second list may contain other variables as well.
     * @param varsNeedles A list of variables to search for.
     * @param varsHaystack A list of variables to search in.
     */
    variablesSubSetOf(varsNeedles, varsHaystack) {
        return varsNeedles.length <= varsHaystack.length &&
            varsNeedles.every(varA => varsHaystack.some(varB => varA.equals(varB)));
    }
    /**
     * Check if an expression is simply 'false'.
     * @param expression An expression.
     */
    isExpressionFalse(expression) {
        return (expression.term && expression.term.termType === 'Literal' && expression.term.value === 'false');
    }
    /**
     * Get all directly nested filter expressions.
     * As soon as a non-filter is found, it is returned as the input field.
     * @param op A filter expression.
     */
    getNestedFilterExpressions(op) {
        if (op.input.type === sparqlalgebrajs_1.Algebra.types.FILTER) {
            const childData = this.getNestedFilterExpressions(op.input);
            return { nestedExpressions: [op.expression, ...childData.nestedExpressions], input: childData.input };
        }
        return { nestedExpressions: [op.expression], input: op.input };
    }
}
exports.ActorOptimizeQueryOperationFilterPushdown = ActorOptimizeQueryOperationFilterPushdown;
//# sourceMappingURL=ActorOptimizeQueryOperationFilterPushdown.js.map