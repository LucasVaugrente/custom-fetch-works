"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfResolveHypermediaLinks = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for rdf-resolve-hypermedia-links events.
 *
 * Actor types:
 * * Input:  IActionRdfResolveHypermediaLinks:      The metadata from which the links should be extracted.
 * * Test:   <none>
 * * Output: IActorRdfResolveHypermediaLinksOutput: The URLs that were detected.
 *
 * @see IActionRdfResolveHypermediaLinks
 * @see IActorRdfResolveHypermediaLinksOutput
 */
class ActorRdfResolveHypermediaLinks extends core_1.Actor {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Hypermedia link resolution failed: none of the configured actors were able to resolve links from metadata} busFailMessage
     */
    /* eslint-enable max-len */
    constructor(args) {
        super(args);
    }
}
exports.ActorRdfResolveHypermediaLinks = ActorRdfResolveHypermediaLinks;
//# sourceMappingURL=ActorRdfResolveHypermediaLinks.js.map