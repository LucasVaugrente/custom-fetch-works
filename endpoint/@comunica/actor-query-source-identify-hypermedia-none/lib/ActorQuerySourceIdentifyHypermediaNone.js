"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQuerySourceIdentifyHypermediaNone = void 0;
const actor_query_source_identify_rdfjs_1 = require("@comunica/actor-query-source-identify-rdfjs");
const bus_query_source_identify_hypermedia_1 = require("@comunica/bus-query-source-identify-hypermedia");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const rdf_store_stream_1 = require("rdf-store-stream");
/**
 * A comunica None Query Source Identify Hypermedia Actor.
 */
class ActorQuerySourceIdentifyHypermediaNone extends bus_query_source_identify_hypermedia_1.ActorQuerySourceIdentifyHypermedia {
    constructor(args) {
        super(args, 'file');
    }
    async testMetadata(_action) {
        return (0, core_1.passTest)({ filterFactor: 0 });
    }
    async run(action) {
        this.logInfo(action.context, `Identified as file source: ${action.url}`);
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const source = new actor_query_source_identify_rdfjs_1.QuerySourceRdfJs(await (0, rdf_store_stream_1.storeStream)(action.quads), dataFactory, await utils_bindings_factory_1.BindingsFactory.create(this.mediatorMergeBindingsContext, action.context, dataFactory));
        source.toString = () => `QuerySourceRdfJs(${action.url})`;
        source.referenceValue = action.url;
        return { source };
    }
}
exports.ActorQuerySourceIdentifyHypermediaNone = ActorQuerySourceIdentifyHypermediaNone;
//# sourceMappingURL=ActorQuerySourceIdentifyHypermediaNone.js.map