"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorHashBindings = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for hash-bindings events.
 *
 * Actor types:
 * * Input:  IActionHashBindings:      Metadata for selecting a hash function.
 * * Test:   IActorTest:
 * * Output: IActorHashBindingsOutput: The resulting hash function.
 *
 * @see IActionHashBindings
 * @see IActorHashBindingsTest
 * @see IActorHashBindingsOutput
 */
class ActorHashBindings extends core_1.Actor {
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Failed to obtaining hash functions for bindings} busFailMessage
     */
    constructor(args) {
        super(args);
    }
}
exports.ActorHashBindings = ActorHashBindings;
//# sourceMappingURL=ActorHashBindings.js.map