"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryProcessExplainLogical = void 0;
const bus_query_process_1 = require("@comunica/bus-query-process");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
/**
 * A comunica Explain Logical Query Process Actor.
 */
class ActorQueryProcessExplainLogical extends bus_query_process_1.ActorQueryProcess {
    constructor(args) {
        super(args);
    }
    async test(action) {
        if ((action.context.get(context_entries_1.KeysInitQuery.explain) ??
            action.context.get(new core_1.ActionContextKey('explain'))) !== 'logical') {
            return (0, core_1.failTest)(`${this.name} can only explain in 'logical' mode.`);
        }
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        // Parse and optimize the query
        let { operation, context } = await this.queryProcessor.parse(action.query, action.context);
        ({ operation, context } = await this.queryProcessor.optimize(operation, context));
        return {
            result: {
                explain: true,
                type: 'logical',
                data: operation,
            },
        };
    }
}
exports.ActorQueryProcessExplainLogical = ActorQueryProcessExplainLogical;
//# sourceMappingURL=ActorQueryProcessExplainLogical.js.map