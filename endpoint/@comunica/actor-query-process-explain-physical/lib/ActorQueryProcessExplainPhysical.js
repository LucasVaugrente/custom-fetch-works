"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryProcessExplainPhysical = void 0;
const bus_query_process_1 = require("@comunica/bus-query-process");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const MemoryPhysicalQueryPlanLogger_1 = require("./MemoryPhysicalQueryPlanLogger");
/**
 * A comunica Explain Physical Query Process Actor.
 */
class ActorQueryProcessExplainPhysical extends bus_query_process_1.ActorQueryProcess {
    constructor(args) {
        super(args);
    }
    async test(action) {
        const mode = (action.context.get(context_entries_1.KeysInitQuery.explain) ?? action.context.get(new core_1.ActionContextKey('explain')));
        if (mode !== 'physical' && mode !== 'physical-json') {
            return (0, core_1.failTest)(`${this.name} can only explain in 'physical' or 'physical-json' mode.`);
        }
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        // Run all query processing steps in sequence
        let { operation, context } = await this.queryProcessor.parse(action.query, action.context);
        ({ operation, context } = await this.queryProcessor.optimize(operation, context));
        // If we need a physical query plan, store a physical query plan logger in the context, and collect it after exec
        const physicalQueryPlanLogger = new MemoryPhysicalQueryPlanLogger_1.MemoryPhysicalQueryPlanLogger();
        context = context.set(context_entries_1.KeysInitQuery.physicalQueryPlanLogger, physicalQueryPlanLogger);
        const output = await this.queryProcessor.evaluate(operation, context);
        // Make sure the whole result is produced
        switch (output.type) {
            case 'bindings':
                await output.bindingsStream.toArray();
                break;
            case 'quads':
                await output.quadStream.toArray();
                break;
            case 'boolean':
                await output.execute();
                break;
            case 'void':
                await output.execute();
                break;
        }
        const mode = (action.context.get(context_entries_1.KeysInitQuery.explain) ??
            action.context.getSafe(new core_1.ActionContextKey('explain')));
        return {
            result: {
                explain: true,
                type: mode,
                data: mode === 'physical' ? physicalQueryPlanLogger.toCompactString() : physicalQueryPlanLogger.toJson(),
            },
        };
    }
}
exports.ActorQueryProcessExplainPhysical = ActorQueryProcessExplainPhysical;
//# sourceMappingURL=ActorQueryProcessExplainPhysical.js.map