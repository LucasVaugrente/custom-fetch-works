"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorOptimizeQueryOperationAssignSourcesExhaustive = void 0;
const bus_optimize_query_operation_1 = require("@comunica/bus-optimize-query-operation");
const bus_rdf_update_quads_1 = require("@comunica/bus-rdf-update-quads");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Assign Sources Exhaustive Optimize Query Operation Actor.
 */
class ActorOptimizeQueryOperationAssignSourcesExhaustive extends bus_optimize_query_operation_1.ActorOptimizeQueryOperation {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const sources = action.context.get(context_entries_1.KeysQueryOperation.querySources) ?? [];
        if (sources.length === 0) {
            return { operation: action.operation, context: action.context };
        }
        if (sources.length === 1) {
            const sourceWrapper = sources[0];
            const destination = action.context.get(context_entries_1.KeysRdfUpdateQuads.destination);
            if (!destination || sourceWrapper.source.referenceValue === (0, bus_rdf_update_quads_1.getDataDestinationValue)(destination)) {
                try {
                    const shape = await sourceWrapper.source.getSelectorShape(action.context);
                    if ((0, utils_query_operation_1.doesShapeAcceptOperation)(shape, action.operation)) {
                        return {
                            operation: (0, utils_query_operation_1.assignOperationSource)(action.operation, sourceWrapper),
                            context: action.context,
                        };
                    }
                }
                catch {
                    // Fallback to the default case when the selector shape does not exist,
                    // which can occur for a non-existent destination.
                }
            }
        }
        return {
            operation: this.assignExhaustive(algebraFactory, action.operation, sources),
            // We only keep queryString in the context if we only have a single source that accepts the full operation.
            // In that case, the queryString can be sent to the source as-is.
            context: action.context
                .delete(context_entries_1.KeysInitQuery.queryString),
        };
    }
    /**
     * Assign the given sources to the leaves in the given query operation.
     * Leaves will be wrapped in a union operation and duplicated for every source.
     * The input operation will not be modified.
     * @param algebraFactory The algebra factory.
     * @param operation The input operation.
     * @param sources The sources to assign.
     */
    assignExhaustive(algebraFactory, operation, sources) {
        // eslint-disable-next-line ts/no-this-alias
        const self = this;
        return sparqlalgebrajs_1.Util.mapOperation(operation, {
            [sparqlalgebrajs_1.Algebra.types.PATTERN](subOperation, factory) {
                if (sources.length === 1) {
                    return {
                        result: (0, utils_query_operation_1.assignOperationSource)(subOperation, sources[0]),
                        recurse: false,
                    };
                }
                return {
                    result: factory.createUnion(sources
                        .map(source => (0, utils_query_operation_1.assignOperationSource)(subOperation, source))),
                    recurse: false,
                };
            },
            [sparqlalgebrajs_1.Algebra.types.LINK](subOperation, factory) {
                if (sources.length === 1) {
                    return {
                        result: (0, utils_query_operation_1.assignOperationSource)(subOperation, sources[0]),
                        recurse: false,
                    };
                }
                return {
                    result: factory.createAlt(sources
                        .map(source => (0, utils_query_operation_1.assignOperationSource)(subOperation, source))),
                    recurse: false,
                };
            },
            [sparqlalgebrajs_1.Algebra.types.NPS](subOperation, factory) {
                if (sources.length === 1) {
                    return {
                        result: (0, utils_query_operation_1.assignOperationSource)(subOperation, sources[0]),
                        recurse: false,
                    };
                }
                return {
                    result: factory.createAlt(sources
                        .map(source => (0, utils_query_operation_1.assignOperationSource)(subOperation, source))),
                    recurse: false,
                };
            },
            [sparqlalgebrajs_1.Algebra.types.SERVICE](subOperation) {
                return {
                    result: subOperation,
                    recurse: false,
                };
            },
            [sparqlalgebrajs_1.Algebra.types.CONSTRUCT](subOperation, factory) {
                return {
                    result: factory.createConstruct(self.assignExhaustive(algebraFactory, subOperation.input, sources), subOperation.template),
                    recurse: false,
                };
            },
            [sparqlalgebrajs_1.Algebra.types.DELETE_INSERT](subOperation, factory) {
                return {
                    result: factory.createDeleteInsert(subOperation.delete, subOperation.insert, subOperation.where ? self.assignExhaustive(algebraFactory, subOperation.where, sources) : undefined),
                    recurse: false,
                };
            },
        }, algebraFactory);
    }
}
exports.ActorOptimizeQueryOperationAssignSourcesExhaustive = ActorOptimizeQueryOperationAssignSourcesExhaustive;
//# sourceMappingURL=ActorOptimizeQueryOperationAssignSourcesExhaustive.js.map