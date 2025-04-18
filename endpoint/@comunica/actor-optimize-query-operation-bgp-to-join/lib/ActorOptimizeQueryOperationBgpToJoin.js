"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorOptimizeQueryOperationBgpToJoin = void 0;
const bus_optimize_query_operation_1 = require("@comunica/bus-optimize-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica BGP to Join Optimize Query Operation Actor.
 */
class ActorOptimizeQueryOperationBgpToJoin extends bus_optimize_query_operation_1.ActorOptimizeQueryOperation {
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const operation = sparqlalgebrajs_1.Util.mapOperation(action.operation, {
            bgp(op, factory) {
                return {
                    recurse: false,
                    result: factory.createJoin(op.patterns),
                };
            },
        }, algebraFactory);
        return { operation, context: action.context };
    }
}
exports.ActorOptimizeQueryOperationBgpToJoin = ActorOptimizeQueryOperationBgpToJoin;
//# sourceMappingURL=ActorOptimizeQueryOperationBgpToJoin.js.map