"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQuerySourceIdentify = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for query-source-identify events.
 *
 * Actor types:
 * * Input:  IActionQuerySourceIdentify:      An unidentified query source.
 * * Test:   <none>
 * * Output: IActorQuerySourceIdentifyOutput: An identified query source.
 *
 * @see IActionQuerySourceIdentify
 * @see IActorQuerySourceIdentifyOutput
 */
class ActorQuerySourceIdentify extends core_1.Actor {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Query source identification failed: none of the configured actors were able to identify ${action.querySourceUnidentified.value}} busFailMessage
     */
    /* eslint-enable max-len */
    constructor(args) {
        super(args);
    }
}
exports.ActorQuerySourceIdentify = ActorQuerySourceIdentify;
//# sourceMappingURL=ActorQuerySourceIdentify.js.map