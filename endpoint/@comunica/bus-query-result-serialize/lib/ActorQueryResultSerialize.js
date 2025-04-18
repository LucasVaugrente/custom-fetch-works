"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryResultSerialize = void 0;
const actor_abstract_mediatyped_1 = require("@comunica/actor-abstract-mediatyped");
/**
 * A comunica actor for query-result-serialize events.
 *
 * Actor types:
 * * Input:  IActionSparqlSerialize:      SPARQL bindings or a quad stream.
 * * Test:   <none>
 * * Output: IActorQueryResultSerializeOutput: A text stream.
 *
 * @see IActionSparqlSerialize
 * @see IActorQueryResultSerializeOutput
 */
class ActorQueryResultSerialize extends actor_abstract_mediatyped_1.ActorAbstractMediaTyped {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Query result serialization failed: none of the configured actors were able to serialize for type ${action.handle.type}} busFailMessage
     */
    /* eslint-enable max-len */
    constructor(args) {
        super(args);
    }
}
exports.ActorQueryResultSerialize = ActorQueryResultSerialize;
//# sourceMappingURL=ActorQueryResultSerialize.js.map