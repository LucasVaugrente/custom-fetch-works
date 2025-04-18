"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorOptimizeQueryOperationJoinBgp = void 0;
const bus_optimize_query_operation_1 = require("@comunica/bus-optimize-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Join BGP Optimize Query Operation Actor.
 */
class ActorOptimizeQueryOperationJoinBgp extends bus_optimize_query_operation_1.ActorOptimizeQueryOperation {
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const operation = sparqlalgebrajs_1.Util.mapOperation(action.operation, {
            join(op, factory) {
                if (op.input.every(subInput => subInput.type === 'bgp')) {
                    return {
                        recurse: false,
                        result: factory.createBgp(op.input.flatMap(subInput => subInput.patterns)),
                    };
                }
                return {
                    recurse: false,
                    result: op,
                };
            },
        }, algebraFactory);
        return { operation, context: action.context };
    }
}
exports.ActorOptimizeQueryOperationJoinBgp = ActorOptimizeQueryOperationJoinBgp;
//# sourceMappingURL=ActorOptimizeQueryOperationJoinBgp.js.map