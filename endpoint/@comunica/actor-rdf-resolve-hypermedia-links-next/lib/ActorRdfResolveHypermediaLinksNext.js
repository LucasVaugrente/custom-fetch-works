"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfResolveHypermediaLinksNext = void 0;
const bus_rdf_resolve_hypermedia_links_1 = require("@comunica/bus-rdf-resolve-hypermedia-links");
const core_1 = require("@comunica/core");
/**
 * A comunica Next RDF Resolve Hypermedia Links Actor.
 */
class ActorRdfResolveHypermediaLinksNext extends bus_rdf_resolve_hypermedia_links_1.ActorRdfResolveHypermediaLinks {
    constructor(args) {
        super(args);
    }
    async test(action) {
        if (!action.metadata.next || action.metadata.next.length === 0) {
            return (0, core_1.failTest)(`Actor ${this.name} requires a 'next' metadata entry.`);
        }
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        return { links: action.metadata.next.map((url) => ({ url })) };
    }
}
exports.ActorRdfResolveHypermediaLinksNext = ActorRdfResolveHypermediaLinksNext;
//# sourceMappingURL=ActorRdfResolveHypermediaLinksNext.js.map