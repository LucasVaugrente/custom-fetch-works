"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorOptimizeQueryOperationPruneEmptySourceOperations = void 0;
const bus_optimize_query_operation_1 = require("@comunica/bus-optimize-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Prune Empty Source Operations Optimize Query Operation Actor.
 */
class ActorOptimizeQueryOperationPruneEmptySourceOperations extends bus_optimize_query_operation_1.ActorOptimizeQueryOperation {
    constructor(args) {
        super(args);
    }
    async test(action) {
        if ((0, utils_query_operation_1.getOperationSource)(action.operation)) {
            return (0, core_1.failTest)(`Actor ${this.name} does not work with top-level operation sources.`);
        }
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        let operation = action.operation;
        // Collect all operations with source types
        // Only consider unions of patterns or alts of links, since these are created during exhaustive source assignment.
        const collectedOperations = [];
        // eslint-disable-next-line ts/no-this-alias
        const self = this;
        sparqlalgebrajs_1.Util.recurseOperation(operation, {
            [sparqlalgebrajs_1.Algebra.types.UNION](subOperation) {
                self.collectMultiOperationInputs(subOperation.input, collectedOperations, sparqlalgebrajs_1.Algebra.types.PATTERN);
                return true;
            },
            [sparqlalgebrajs_1.Algebra.types.ALT](subOperation) {
                self.collectMultiOperationInputs(subOperation.input, collectedOperations, sparqlalgebrajs_1.Algebra.types.LINK);
                return false;
            },
            [sparqlalgebrajs_1.Algebra.types.SERVICE]() {
                return false;
            },
        });
        // Determine in an async manner whether or not these sources return non-empty results
        const emptyOperations = new Set();
        await Promise.all(collectedOperations.map(async (collectedOperation) => {
            const checkOperation = collectedOperation.type === 'link' ?
                algebraFactory.createPattern(dataFactory.variable('?s'), collectedOperation.iri, dataFactory.variable('?o')) :
                collectedOperation;
            if (!await this.hasSourceResults(algebraFactory, (0, utils_query_operation_1.getOperationSource)(collectedOperation), checkOperation, action.context)) {
                emptyOperations.add(collectedOperation);
            }
        }));
        // Only perform next mapping if we have at least one empty operation
        if (emptyOperations.size > 0) {
            this.logDebug(action.context, `Pruning ${emptyOperations.size} source-specific operations`);
            // Rewrite operations by removing the empty children
            operation = sparqlalgebrajs_1.Util.mapOperation(operation, {
                [sparqlalgebrajs_1.Algebra.types.UNION](subOperation, factory) {
                    return self.mapMultiOperation(subOperation, emptyOperations, children => factory.createUnion(children));
                },
                [sparqlalgebrajs_1.Algebra.types.ALT](subOperation, factory) {
                    return self.mapMultiOperation(subOperation, emptyOperations, children => factory.createAlt(children));
                },
            }, algebraFactory);
            // Identify and remove operations that have become empty now due to missing variables
            operation = sparqlalgebrajs_1.Util.mapOperation(operation, {
                [sparqlalgebrajs_1.Algebra.types.PROJECT](subOperation, factory) {
                    // Remove projections that have become empty now due to missing variables
                    if (ActorOptimizeQueryOperationPruneEmptySourceOperations.hasEmptyOperation(subOperation)) {
                        return {
                            recurse: false,
                            result: factory.createUnion([]),
                        };
                    }
                    return {
                        recurse: true,
                        result: subOperation,
                    };
                },
                [sparqlalgebrajs_1.Algebra.types.LEFT_JOIN](subOperation) {
                    // Remove left joins with empty right operation
                    if (ActorOptimizeQueryOperationPruneEmptySourceOperations.hasEmptyOperation(subOperation.input[1])) {
                        return {
                            recurse: true,
                            result: subOperation.input[0],
                        };
                    }
                    return {
                        recurse: true,
                        result: subOperation,
                    };
                },
            }, algebraFactory);
        }
        return { operation, context: action.context };
    }
    static hasEmptyOperation(operation) {
        // If union (or alt) is empty, consider it empty (`Array.every` on an empty array always returns true)
        // But if we find a union with multiple children,
        // *all* of the children must be empty before the full operation is considered empty.
        let emptyOperation = false;
        sparqlalgebrajs_1.Util.recurseOperation(operation, {
            [sparqlalgebrajs_1.Algebra.types.UNION](subOperation) {
                if (subOperation.input.every(subSubOperation => ActorOptimizeQueryOperationPruneEmptySourceOperations
                    .hasEmptyOperation(subSubOperation))) {
                    emptyOperation = true;
                }
                return false;
            },
            [sparqlalgebrajs_1.Algebra.types.ALT](subOperation) {
                if (subOperation.input.length === 0) {
                    emptyOperation = true;
                }
                return false;
            },
            [sparqlalgebrajs_1.Algebra.types.LEFT_JOIN](subOperation) {
                // Only recurse into left part of left-join
                if (ActorOptimizeQueryOperationPruneEmptySourceOperations.hasEmptyOperation(subOperation.input[0])) {
                    emptyOperation = true;
                }
                return false;
            },
        });
        return emptyOperation;
    }
    collectMultiOperationInputs(inputs, collectedOperations, inputType) {
        for (const input of inputs) {
            if ((0, utils_query_operation_1.getOperationSource)(input) && input.type === inputType) {
                collectedOperations.push(input);
            }
        }
    }
    mapMultiOperation(operation, emptyOperations, multiOperationFactory) {
        // Determine which operations return non-empty results
        const nonEmptyInputs = operation.input.filter(input => !emptyOperations.has(input));
        // Remove empty operations
        if (nonEmptyInputs.length === operation.input.length) {
            return { result: operation, recurse: true };
        }
        if (nonEmptyInputs.length === 0) {
            return { result: multiOperationFactory([]), recurse: false };
        }
        if (nonEmptyInputs.length === 1) {
            return { result: nonEmptyInputs[0], recurse: true };
        }
        return { result: multiOperationFactory(nonEmptyInputs), recurse: true };
    }
    /**
     * Check if the given query operation will produce at least one result in the given source.
     * @param algebraFactory The algebra factory.
     * @param source A query source.
     * @param input A query operation.
     * @param context The query context.
     */
    async hasSourceResults(algebraFactory, source, input, context) {
        // Traversal sources should never be considered empty at optimization time.
        if (source.context?.get(context_entries_1.KeysQuerySourceIdentify.traverse) ?? context.get(context_entries_1.KeysQuerySourceIdentify.traverse)) {
            return true;
        }
        // Send an ASK query
        if (this.useAskIfSupported) {
            const askOperation = algebraFactory.createAsk(input);
            if ((0, utils_query_operation_1.doesShapeAcceptOperation)(await source.source.getSelectorShape(context), askOperation)) {
                return source.source.queryBoolean(askOperation, context);
            }
        }
        // Send the operation as-is and check the response cardinality
        const bindingsStream = source.source.queryBindings(input, context);
        return new Promise((resolve, reject) => {
            bindingsStream.on('error', reject);
            bindingsStream.getProperty('metadata', (metadata) => {
                bindingsStream.destroy();
                resolve(metadata.cardinality.value > 0);
            });
        });
    }
}
exports.ActorOptimizeQueryOperationPruneEmptySourceOperations = ActorOptimizeQueryOperationPruneEmptySourceOperations;
//# sourceMappingURL=ActorOptimizeQueryOperationPruneEmptySourceOperations.js.map