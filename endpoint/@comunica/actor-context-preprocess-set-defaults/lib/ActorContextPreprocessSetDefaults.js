"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorContextPreprocessSetDefaults = void 0;
const bus_context_preprocess_1 = require("@comunica/bus-context-preprocess");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const rdf_data_factory_1 = require("rdf-data-factory");
/**
 * A comunica Set Defaults Context Preprocess Actor.
 */
class ActorContextPreprocessSetDefaults extends bus_context_preprocess_1.ActorContextPreprocess {
    constructor(args) {
        super(args);
        this.defaultFunctionArgumentsCache = {};
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        let context = action.context;
        if (action.initialize) {
            // Set default values
            context = context
                .setDefault(context_entries_1.KeysInitQuery.queryTimestamp, new Date())
                .setDefault(context_entries_1.KeysInitQuery.queryTimestampHighResolution, performance.now())
                .setDefault(context_entries_1.KeysQuerySourceIdentify.sourceIds, new Map())
                .setDefault(context_entries_1.KeysCore.log, this.logger)
                .setDefault(context_entries_1.KeysInitQuery.functionArgumentsCache, this.defaultFunctionArgumentsCache)
                .setDefault(context_entries_1.KeysQuerySourceIdentify.hypermediaSourcesAggregatedStores, new Map())
                .setDefault(context_entries_1.KeysInitQuery.dataFactory, new rdf_data_factory_1.DataFactory());
            // Handle default query format
            let queryFormat = { language: 'sparql', version: '1.1' };
            if (context.has(context_entries_1.KeysInitQuery.queryFormat)) {
                queryFormat = context.get(context_entries_1.KeysInitQuery.queryFormat);
                if (queryFormat.language === 'graphql') {
                    context = context.setDefault(context_entries_1.KeysInitQuery.graphqlSingularizeVariables, {});
                }
            }
            else {
                context = context.set(context_entries_1.KeysInitQuery.queryFormat, queryFormat);
            }
        }
        return { context };
    }
}
exports.ActorContextPreprocessSetDefaults = ActorContextPreprocessSetDefaults;
//# sourceMappingURL=ActorContextPreprocessSetDefaults.js.map