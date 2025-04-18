"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQuerySourceIdentifyHypermedia = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for query-source-identify-hypermedia events.
 *
 * Actor types:
 * * Input:  IActionQuerySourceIdentifyHypermedia:      The metadata in the document and a query operation.
 * * Test:   <none>
 * * Output: IActorQuerySourceIdentifyHypermediaOutput: A query source.
 *
 * @see IActionQuerySourceIdentifyHypermedia
 * @see IActorQuerySourceIdentifyHypermediaOutput
 */
class ActorQuerySourceIdentifyHypermedia extends core_1.Actor {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Query source hypermedia identification failed: none of the configured actors were able to identify ${action.url}} busFailMessage
     * @param sourceType The source type.
     */
    /* eslint-enable max-len */
    constructor(args, sourceType) {
        super(args);
        this.sourceType = sourceType;
    }
    async test(action) {
        if (action.forceSourceType && this.sourceType !== action.forceSourceType) {
            return (0, core_1.failTest)(`Actor ${this.name} is not able to handle source type ${action.forceSourceType}.`);
        }
        return this.testMetadata(action);
    }
}
exports.ActorQuerySourceIdentifyHypermedia = ActorQuerySourceIdentifyHypermedia;
//# sourceMappingURL=ActorQuerySourceIdentifyHypermedia.js.map