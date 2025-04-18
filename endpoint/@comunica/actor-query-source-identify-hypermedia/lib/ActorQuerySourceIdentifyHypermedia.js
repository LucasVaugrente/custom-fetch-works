"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQuerySourceIdentifyHypermedia = void 0;
const bus_query_source_identify_1 = require("@comunica/bus-query-source-identify");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const QuerySourceHypermedia_1 = require("./QuerySourceHypermedia");
/**
 * A comunica Hypermedia Query Source Identify Actor.
 */
class ActorQuerySourceIdentifyHypermedia extends bus_query_source_identify_1.ActorQuerySourceIdentify {
    constructor(args) {
        super(args);
    }
    async test(action) {
        if (typeof action.querySourceUnidentified.value !== 'string') {
            return (0, core_1.failTest)(`${this.name} requires a single query source with a URL value to be present in the context.`);
        }
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        return {
            querySource: {
                source: new QuerySourceHypermedia_1.QuerySourceHypermedia(this.cacheSize, action.querySourceUnidentified.value, action.querySourceUnidentified.type, this.maxIterators, this.aggregateTraversalStore &&
                    Boolean(action.querySourceUnidentified.context?.get(context_entries_1.KeysQuerySourceIdentify.traverse)), {
                    mediatorMetadata: this.mediatorMetadata,
                    mediatorMetadataExtract: this.mediatorMetadataExtract,
                    mediatorMetadataAccumulate: this.mediatorMetadataAccumulate,
                    mediatorDereferenceRdf: this.mediatorDereferenceRdf,
                    mediatorQuerySourceIdentifyHypermedia: this.mediatorQuerySourceIdentifyHypermedia,
                    mediatorRdfResolveHypermediaLinks: this.mediatorRdfResolveHypermediaLinks,
                    mediatorRdfResolveHypermediaLinksQueue: this.mediatorRdfResolveHypermediaLinksQueue,
                }, warningMessage => this.logWarn(action.context, warningMessage), dataFactory, await utils_bindings_factory_1.BindingsFactory.create(this.mediatorMergeBindingsContext, action.context, dataFactory)),
                context: action.querySourceUnidentified.context ?? new core_1.ActionContext(),
            },
        };
    }
}
exports.ActorQuerySourceIdentifyHypermedia = ActorQuerySourceIdentifyHypermedia;
//# sourceMappingURL=ActorQuerySourceIdentifyHypermedia.js.map