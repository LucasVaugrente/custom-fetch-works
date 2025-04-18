"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorContextPreprocessQuerySourceSkolemize = void 0;
const bus_context_preprocess_1 = require("@comunica/bus-context-preprocess");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const QuerySourceSkolemized_1 = require("./QuerySourceSkolemized");
const utils_1 = require("./utils");
/**
 * A comunica Query Source Skolemize Context Preprocess Actor.
 */
class ActorContextPreprocessQuerySourceSkolemize extends bus_context_preprocess_1.ActorContextPreprocess {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        let context = action.context;
        // Wrap sources in skolemized sources
        if (context.has(context_entries_1.KeysQueryOperation.querySources)) {
            // Determine map of source id's
            if (!context.has(context_entries_1.KeysQuerySourceIdentify.sourceIds)) {
                context = context.set(context_entries_1.KeysQuerySourceIdentify.sourceIds, new Map());
            }
            const sourceIds = context.getSafe(context_entries_1.KeysQuerySourceIdentify.sourceIds);
            let sources = context.getSafe(context_entries_1.KeysQueryOperation.querySources);
            sources = sources.map(sourceWrapper => ({
                source: new QuerySourceSkolemized_1.QuerySourceSkolemized(sourceWrapper.source, (0, utils_1.getSourceId)(sourceIds, sourceWrapper.source)),
                context: sourceWrapper.context,
            }));
            context = context.set(context_entries_1.KeysQueryOperation.querySources, sources);
        }
        return { context };
    }
}
exports.ActorContextPreprocessQuerySourceSkolemize = ActorContextPreprocessQuerySourceSkolemize;
//# sourceMappingURL=ActorContextPreprocessQuerySourceSkolemize.js.map