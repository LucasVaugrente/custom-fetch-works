"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationMinus = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const core_1 = require("@comunica/core");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
/**
 * A comunica Minus Query Operation Actor.
 */
class ActorQueryOperationMinus extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'minus');
    }
    async testOperation(_operation, _context) {
        return (0, core_1.passTestVoid)();
    }
    async runOperation(operationOriginal, context) {
        const entries = (await Promise.all(operationOriginal.input
            .map(async (subOperation) => ({
            output: await this.mediatorQueryOperation.mediate({ operation: subOperation, context }),
            operation: subOperation,
        }))))
            .map(({ output, operation }) => ({
            output: (0, utils_query_operation_1.getSafeBindings)(output),
            operation,
        }));
        return this.mediatorJoin.mediate({ type: 'minus', entries, context });
    }
}
exports.ActorQueryOperationMinus = ActorQueryOperationMinus;
//# sourceMappingURL=ActorQueryOperationMinus.js.map