"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorContextPreprocessConvertShortcuts = void 0;
const bus_context_preprocess_1 = require("@comunica/bus-context-preprocess");
const core_1 = require("@comunica/core");
/**
 * A comunica Convert Shortcuts Context Preprocess Actor.
 */
class ActorContextPreprocessConvertShortcuts extends bus_context_preprocess_1.ActorContextPreprocess {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        return {
            context: ActorContextPreprocessConvertShortcuts.expandShortcuts(action.context, this.contextKeyShortcuts),
        };
    }
    static expandShortcuts(context, contextKeyShortcuts) {
        for (const key of context.keys()) {
            if (contextKeyShortcuts[key.name]) {
                context = context
                    .set(new core_1.ActionContextKey(contextKeyShortcuts[key.name]), context.get(key))
                    .delete(key);
            }
        }
        return context;
    }
}
exports.ActorContextPreprocessConvertShortcuts = ActorContextPreprocessConvertShortcuts;
//# sourceMappingURL=ActorContextPreprocessConvertShortcuts.js.map