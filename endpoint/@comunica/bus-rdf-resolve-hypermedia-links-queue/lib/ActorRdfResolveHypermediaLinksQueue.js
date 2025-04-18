"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfResolveHypermediaLinksQueue = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for rdf-resolve-hypermedia-links-queue events.
 *
 * Actor types:
 * * Input:  IActionRdfResolveHypermediaLinksQueue:      Creates a new {@link ILinkQueue} for the given seed URL.
 * * Test:   <none>
 * * Output: IActorRdfResolveHypermediaLinksQueueOutput: The created {@link ILinkQueue}.
 *
 * @see IActionRdfResolveHypermediaLinksQueue
 * @see IActorRdfResolveHypermediaLinksQueueOutput
 */
class ActorRdfResolveHypermediaLinksQueue extends core_1.Actor {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Link queue creation failed: none of the configured actors were able to create a link queue starting from ${action.firstUrl}} busFailMessage
     */
    /* eslint-enable max-len */
    constructor(args) {
        super(args);
    }
}
exports.ActorRdfResolveHypermediaLinksQueue = ActorRdfResolveHypermediaLinksQueue;
//# sourceMappingURL=ActorRdfResolveHypermediaLinksQueue.js.map