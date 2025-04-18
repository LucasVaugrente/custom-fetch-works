"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQuerySourceIdentifyRdfJs = void 0;
const bus_query_source_identify_1 = require("@comunica/bus-query-source-identify");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const QuerySourceRdfJs_1 = require("./QuerySourceRdfJs");
/**
 * A comunica RDFJS Query Source Identify Actor.
 */
class ActorQuerySourceIdentifyRdfJs extends bus_query_source_identify_1.ActorQuerySourceIdentify {
    constructor(args) {
        super(args);
    }
    async test(action) {
        const source = action.querySourceUnidentified;
        if (source.type !== undefined && source.type !== 'rdfjs') {
            return (0, core_1.failTest)(`${this.name} requires a single query source with rdfjs type to be present in the context.`);
        }
        if (typeof source.value === 'string' || !('match' in source.value)) {
            return (0, core_1.failTest)(`${this.name} received an invalid rdfjs query source.`);
        }
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        return {
            querySource: {
                source: new QuerySourceRdfJs_1.QuerySourceRdfJs(action.querySourceUnidentified.value, dataFactory, await utils_bindings_factory_1.BindingsFactory.create(this.mediatorMergeBindingsContext, action.context, dataFactory)),
                context: action.querySourceUnidentified.context ?? new core_1.ActionContext(),
            },
        };
    }
}
exports.ActorQuerySourceIdentifyRdfJs = ActorQuerySourceIdentifyRdfJs;
//# sourceMappingURL=ActorQuerySourceIdentifyRdfJs.js.map