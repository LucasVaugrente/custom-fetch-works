"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorMergeBindingsContext = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for the creation of merge handlers for binding context keys.
 *
 * Actor types:
 * * Input:  IActionMergeBindingFactory: The query actionContext
 * * Test:   <none>
 * * Output: IActorMergeBindingFactoryOutput: Returns a function that merges context entries.
 *   the function only runs on contextKeys equal to the key of the returned record.
 * @see IActionMergeBindingsContext
 * @see IActorMergeBindingsContextOutput
 */
class ActorMergeBindingsContext extends core_1.Actor {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Merging of bindings contexts failed: none of the configured actors were able to handle the merging} busFailMessage
     */
    /* eslint-enable max-len */
    constructor(args) {
        super(args);
    }
}
exports.ActorMergeBindingsContext = ActorMergeBindingsContext;
//# sourceMappingURL=ActorMergeBindingsContext.js.map