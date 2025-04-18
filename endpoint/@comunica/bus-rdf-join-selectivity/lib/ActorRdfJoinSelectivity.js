"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfJoinSelectivity = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for rdf-join-selectivity events.
 *
 * Actor types:
 * * Input:  IActionRdfJoinSelectivity:      Join entries.
 * * Test:   IMediatorTypeAccuracy:          The accuracy of the selectivity calculator.
 * * Output: IActorRdfJoinSelectivityOutput: The calculated join selectivity.
 *
 * @see IActionRdfJoinSelectivity
 * @see IActorRdfJoinSelectivityTest
 * @see IActorRdfJoinSelectivityOutput
 */
class ActorRdfJoinSelectivity extends core_1.Actor {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Determining join selectivity failed: none of the configured actors were able to calculate selectivities} busFailMessage
     */
    /* eslint-enable max-len */
    constructor(args) {
        super(args);
    }
}
exports.ActorRdfJoinSelectivity = ActorRdfJoinSelectivity;
//# sourceMappingURL=ActorRdfJoinSelectivity.js.map