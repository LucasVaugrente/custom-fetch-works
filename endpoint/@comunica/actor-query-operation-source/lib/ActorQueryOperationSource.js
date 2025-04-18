"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationSource = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_metadata_1 = require("@comunica/utils-metadata");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Source Query Operation Actor.
 */
class ActorQueryOperationSource extends bus_query_operation_1.ActorQueryOperation {
    constructor(args) {
        super(args);
    }
    async test(action) {
        if (!(0, utils_query_operation_1.getOperationSource)(action.operation)) {
            return (0, core_1.failTest)(`Actor ${this.name} requires an operation with source annotation.`);
        }
        return (0, core_1.passTest)({ httpRequests: 1 });
    }
    async run(action) {
        // Log to physical plan
        const physicalQueryPlanLogger = action.context
            .get(context_entries_1.KeysInitQuery.physicalQueryPlanLogger);
        if (physicalQueryPlanLogger) {
            physicalQueryPlanLogger.logOperation(action.operation.type, undefined, action.operation, action.context.get(context_entries_1.KeysInitQuery.physicalQueryPlanNode), this.name, {});
            action.context = action.context.set(context_entries_1.KeysInitQuery.physicalQueryPlanNode, action.operation);
        }
        const sourceWrapper = (0, utils_query_operation_1.getOperationSource)(action.operation);
        const mergedContext = sourceWrapper.context ? action.context.merge(sourceWrapper.context) : action.context;
        // Check if the operation is a CONSTRUCT query
        // We recurse because it may be wrapped in other operations such as SLICE and FROM
        let construct = false;
        sparqlalgebrajs_1.Util.recurseOperation(action.operation, {
            construct() {
                construct = true;
                return false;
            },
        });
        // If so, delegate to queryQuads
        if (construct) {
            const quadStream = sourceWrapper.source.queryQuads(action.operation, mergedContext);
            const metadata = (0, utils_metadata_1.getMetadataQuads)(quadStream);
            return {
                type: 'quads',
                quadStream,
                metadata,
            };
        }
        // eslint-disable-next-line ts/switch-exhaustiveness-check
        switch (action.operation.type) {
            case sparqlalgebrajs_1.Algebra.types.ASK:
                return {
                    type: 'boolean',
                    execute: () => sourceWrapper.source.queryBoolean(action.operation, mergedContext),
                };
            case sparqlalgebrajs_1.Algebra.types.COMPOSITE_UPDATE:
            case sparqlalgebrajs_1.Algebra.types.DELETE_INSERT:
            case sparqlalgebrajs_1.Algebra.types.LOAD:
            case sparqlalgebrajs_1.Algebra.types.CLEAR:
            case sparqlalgebrajs_1.Algebra.types.CREATE:
            case sparqlalgebrajs_1.Algebra.types.DROP:
            case sparqlalgebrajs_1.Algebra.types.ADD:
            case sparqlalgebrajs_1.Algebra.types.MOVE:
            case sparqlalgebrajs_1.Algebra.types.COPY:
                return {
                    type: 'void',
                    execute: () => sourceWrapper.source.queryVoid(action.operation, mergedContext),
                };
        }
        const bindingsStream = sourceWrapper.source.queryBindings(action.operation, mergedContext);
        const metadata = (0, utils_metadata_1.getMetadataBindings)(bindingsStream);
        return {
            type: 'bindings',
            bindingsStream,
            metadata,
        };
    }
}
exports.ActorQueryOperationSource = ActorQueryOperationSource;
//# sourceMappingURL=ActorQueryOperationSource.js.map