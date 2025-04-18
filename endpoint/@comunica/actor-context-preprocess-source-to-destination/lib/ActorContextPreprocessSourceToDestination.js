"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorContextPreprocessSourceToDestination = void 0;
const bus_context_preprocess_1 = require("@comunica/bus-context-preprocess");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
/**
 * A comunica Source To Destination Context Preprocess Actor.
 */
class ActorContextPreprocessSourceToDestination extends bus_context_preprocess_1.ActorContextPreprocess {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        if (action.context.get(context_entries_1.KeysInitQuery.querySourcesUnidentified) &&
            !action.context.get(context_entries_1.KeysRdfUpdateQuads.destination)) {
            const sources = action.context.get(context_entries_1.KeysInitQuery.querySourcesUnidentified);
            if (sources.length === 1) {
                return { context: action.context.set(context_entries_1.KeysRdfUpdateQuads.destination, sources[0]) };
            }
        }
        return action;
    }
}
exports.ActorContextPreprocessSourceToDestination = ActorContextPreprocessSourceToDestination;
//# sourceMappingURL=ActorContextPreprocessSourceToDestination.js.map