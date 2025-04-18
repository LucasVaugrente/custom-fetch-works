"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationTyped = void 0;
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_metadata_1 = require("@comunica/utils-metadata");
const ActorQueryOperation_1 = require("./ActorQueryOperation");
/**
 * A base implementation for query operation actors for a specific operation type.
 */
class ActorQueryOperationTyped extends ActorQueryOperation_1.ActorQueryOperation {
    constructor(args, operationName) {
        super({ ...args, operationName });
        if (!this.operationName) {
            throw new Error('A valid "operationName" argument must be provided.');
        }
    }
    async test(action) {
        if (!action.operation) {
            return (0, core_1.failTest)('Missing field \'operation\' in a query operation action.');
        }
        if (action.operation.type !== this.operationName) {
            return (0, core_1.failTest)(`Actor ${this.name} only supports ${this.operationName} operations, but got ${action.operation.type}`);
        }
        const operation = action.operation;
        return this.testOperation(operation, action.context);
    }
    async run(action, sideData) {
        // Log to physical plan
        const physicalQueryPlanLogger = action.context
            .get(context_entries_1.KeysInitQuery.physicalQueryPlanLogger);
        if (physicalQueryPlanLogger) {
            physicalQueryPlanLogger.logOperation(action.operation.type, undefined, action.operation, action.context.get(context_entries_1.KeysInitQuery.physicalQueryPlanNode), this.name, {});
            action.context = action.context.set(context_entries_1.KeysInitQuery.physicalQueryPlanNode, action.operation);
        }
        const operation = action.operation;
        const subContext = action.context.set(context_entries_1.KeysQueryOperation.operation, operation);
        const output = await this.runOperation(operation, subContext, sideData);
        if ('metadata' in output) {
            output.metadata = (0, utils_metadata_1.cachifyMetadata)(output.metadata);
        }
        return output;
    }
}
exports.ActorQueryOperationTyped = ActorQueryOperationTyped;
//# sourceMappingURL=ActorQueryOperationTyped.js.map