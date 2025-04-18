"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfUpdateQuads = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for rdf-update-quads events.
 *
 * Actor types:
 * * Input:  IActionRdfUpdateQuads:      Quad insertion and deletion streams.
 * * Test:   <none>
 * * Output: IActorRdfUpdateQuadsOutput: A promise resolving when the update operation is done.
 *
 * @see IActionRdfUpdateQuads
 * @see IActorRdfUpdateQuadsOutput
 */
class ActorRdfUpdateQuads extends core_1.Actor {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {RDF updating failed: none of the configured actors were able to handle an update} busFailMessage
     */
    /* eslint-enable max-len */
    constructor(args) {
        super(args);
    }
}
exports.ActorRdfUpdateQuads = ActorRdfUpdateQuads;
//# sourceMappingURL=ActorRdfUpdateQuads.js.map