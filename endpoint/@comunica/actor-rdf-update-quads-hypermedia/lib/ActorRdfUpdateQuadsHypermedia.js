"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfUpdateQuadsHypermedia = void 0;
const bus_rdf_update_quads_1 = require("@comunica/bus-rdf-update-quads");
const core_1 = require("@comunica/core");
const lru_cache_1 = require("lru-cache");
/**
 * A comunica Hypermedia RDF Update Quads Actor.
 */
class ActorRdfUpdateQuadsHypermedia extends bus_rdf_update_quads_1.ActorRdfUpdateQuadsDestination {
    constructor(args) {
        super(args);
        this.cache = this.cacheSize ? new lru_cache_1.LRUCache({ max: this.cacheSize }) : undefined;
        const cache = this.cache;
        if (cache) {
            this.httpInvalidator.addInvalidateListener(({ url }) => url ? cache.delete(url) : cache.clear());
        }
    }
    async test(action) {
        const url = (0, bus_rdf_update_quads_1.getContextDestinationUrl)((0, bus_rdf_update_quads_1.getContextDestination)(action.context));
        if (!url) {
            return (0, core_1.failTest)(`Actor ${this.name} can only update quads against a single destination URL.`);
        }
        return (0, core_1.passTestVoid)();
    }
    getDestination(context) {
        const dataDestination = (0, bus_rdf_update_quads_1.getContextDestination)(context);
        let url = (0, bus_rdf_update_quads_1.getContextDestinationUrl)(dataDestination);
        // Try to read from cache
        if (this.cache && this.cache.has(url)) {
            return this.cache.get(url);
        }
        // Otherwise, call mediators
        const ret = (async () => {
            let metadata;
            let exists;
            try {
                // Dereference destination URL
                const dereferenceRdfOutput = await this.mediatorDereferenceRdf
                    .mediate({ context, url, acceptErrors: true });
                exists = dereferenceRdfOutput.exists;
                url = dereferenceRdfOutput.url;
                // Determine the metadata
                const rdfMetadataOuput = await this.mediatorMetadata.mediate({ context, url, quads: dereferenceRdfOutput.data, triples: dereferenceRdfOutput.metadata?.triples });
                metadata = (await this.mediatorMetadataExtract.mediate({
                    context,
                    url,
                    metadata: rdfMetadataOuput.metadata,
                    headers: dereferenceRdfOutput.headers,
                    requestTime: dereferenceRdfOutput.requestTime,
                })).metadata;
            }
            catch {
                metadata = {};
                exists = false;
            }
            // Obtain destination
            const { destination } = await this.mediatorRdfUpdateHypermedia.mediate({
                context,
                url,
                metadata,
                exists,
                forceDestinationType: (0, bus_rdf_update_quads_1.getDataDestinationType)(dataDestination),
            });
            return destination;
        })();
        if (this.cache) {
            this.cache.set(url, ret);
        }
        return ret;
    }
}
exports.ActorRdfUpdateQuadsHypermedia = ActorRdfUpdateQuadsHypermedia;
//# sourceMappingURL=ActorRdfUpdateQuadsHypermedia.js.map