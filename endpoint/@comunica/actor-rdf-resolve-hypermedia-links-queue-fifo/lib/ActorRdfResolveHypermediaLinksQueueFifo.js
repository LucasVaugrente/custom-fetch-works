"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfResolveHypermediaLinksQueueFifo = void 0;
const bus_rdf_resolve_hypermedia_links_queue_1 = require("@comunica/bus-rdf-resolve-hypermedia-links-queue");
const core_1 = require("@comunica/core");
const LinkQueueFifo_1 = require("./LinkQueueFifo");
/**
 * A comunica FIFO RDF Resolve Hypermedia Links Queue Actor.
 */
class ActorRdfResolveHypermediaLinksQueueFifo extends bus_rdf_resolve_hypermedia_links_queue_1.ActorRdfResolveHypermediaLinksQueue {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(_action) {
        return { linkQueue: new LinkQueueFifo_1.LinkQueueFifo() };
    }
}
exports.ActorRdfResolveHypermediaLinksQueueFifo = ActorRdfResolveHypermediaLinksQueueFifo;
//# sourceMappingURL=ActorRdfResolveHypermediaLinksQueueFifo.js.map