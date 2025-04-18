"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationAsk = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const core_1 = require("@comunica/core");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
/**
 * A comunica Ask Query Operation Actor.
 */
class ActorQueryOperationAsk extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'ask');
    }
    async testOperation(_operation, _context) {
        return (0, core_1.passTestVoid)();
    }
    async runOperation(operation, context) {
        // Call other query operations like this:
        const output = await this.mediatorQueryOperation.mediate({ operation: operation.input, context });
        const { bindingsStream } = (0, utils_query_operation_1.getSafeBindings)(output);
        return { type: 'boolean', execute: async () => (await bindingsStream.take(1).toArray()).length === 1 };
    }
}
exports.ActorQueryOperationAsk = ActorQueryOperationAsk;
//# sourceMappingURL=ActorQueryOperationAsk.js.map