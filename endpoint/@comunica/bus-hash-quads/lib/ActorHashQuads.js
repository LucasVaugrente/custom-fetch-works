"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorHashQuads = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for hash-quads events.
 *
 * Actor types:
 * * Input:  IActionHashQuads:      Metadata for selecting a hash function.
 * * Test:   <none>
 * * Output: IActorHashQuadsOutput: The resulting hash function.
 *
 * @see IActionHashQuads
 * @see IActorHashQuadsOutput
 */
class ActorHashQuads extends core_1.Actor {
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Failed to obtaining hash functions for quads} busFailMessage
     */
    constructor(args) {
        super(args);
    }
}
exports.ActorHashQuads = ActorHashQuads;
//# sourceMappingURL=ActorHashQuads.js.map