"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorOptimizeQueryOperationRewriteCopy = void 0;
const bus_optimize_query_operation_1 = require("@comunica/bus-optimize-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Rewrite Copy Optimize Query Operation Actor.
 */
class ActorOptimizeQueryOperationRewriteCopy extends bus_optimize_query_operation_1.ActorOptimizeQueryOperation {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const operation = sparqlalgebrajs_1.Util.mapOperation(action.operation, {
            [sparqlalgebrajs_1.Algebra.types.COPY](operationOriginal, factory) {
                // No-op if source === destination
                let result;
                if ((typeof operationOriginal.destination === 'string' && typeof operationOriginal.source === 'string' &&
                    operationOriginal.destination === operationOriginal.source) ||
                    (typeof operationOriginal.destination !== 'string' && typeof operationOriginal.source !== 'string' &&
                        operationOriginal.destination.equals(operationOriginal.source))) {
                    result = factory.createCompositeUpdate([]);
                }
                else {
                    // COPY is equivalent to drop destination, and add
                    result = factory.createCompositeUpdate([
                        factory.createDrop(operationOriginal.destination, true),
                        factory.createAdd(operationOriginal.source, operationOriginal.destination, operationOriginal.silent),
                    ]);
                }
                return {
                    result,
                    recurse: false,
                };
            },
        }, algebraFactory);
        return { operation, context: action.context };
    }
}
exports.ActorOptimizeQueryOperationRewriteCopy = ActorOptimizeQueryOperationRewriteCopy;
//# sourceMappingURL=ActorOptimizeQueryOperationRewriteCopy.js.map