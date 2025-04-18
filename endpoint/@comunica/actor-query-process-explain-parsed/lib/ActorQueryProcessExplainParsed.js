"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryProcessExplainParsed = void 0;
const bus_query_process_1 = require("@comunica/bus-query-process");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
/**
 * A comunica Explain Parsed Query Process Actor.
 */
class ActorQueryProcessExplainParsed extends bus_query_process_1.ActorQueryProcess {
    constructor(args) {
        super(args);
    }
    async test(action) {
        if ((action.context.get(context_entries_1.KeysInitQuery.explain) ??
            action.context.get(new core_1.ActionContextKey('explain'))) !== 'parsed') {
            return (0, core_1.failTest)(`${this.name} can only explain in 'parsed' mode.`);
        }
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        // Parse the query
        const { operation } = await this.queryProcessor.parse(action.query, action.context);
        return {
            result: {
                explain: true,
                type: 'parsed',
                data: operation,
            },
        };
    }
}
exports.ActorQueryProcessExplainParsed = ActorQueryProcessExplainParsed;
//# sourceMappingURL=ActorQueryProcessExplainParsed.js.map