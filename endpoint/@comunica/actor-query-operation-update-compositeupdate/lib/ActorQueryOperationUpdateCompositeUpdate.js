"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationUpdateCompositeUpdate = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
/**
 * A comunica Update CompositeUpdate Query Operation Actor.
 */
class ActorQueryOperationUpdateCompositeUpdate extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'compositeupdate');
    }
    async testOperation(operation, context) {
        return (0, utils_query_operation_1.testReadOnly)(context);
    }
    async runOperation(operationOriginal, context) {
        const execute = () => (async () => {
            // Execute update operations in sequence
            for (const operation of operationOriginal.updates) {
                const subResult = (0, utils_query_operation_1.getSafeVoid)(await this.mediatorQueryOperation.mediate({ operation, context }));
                await subResult.execute();
            }
        })();
        return {
            type: 'void',
            execute,
        };
    }
}
exports.ActorQueryOperationUpdateCompositeUpdate = ActorQueryOperationUpdateCompositeUpdate;
//# sourceMappingURL=ActorQueryOperationUpdateCompositeUpdate.js.map