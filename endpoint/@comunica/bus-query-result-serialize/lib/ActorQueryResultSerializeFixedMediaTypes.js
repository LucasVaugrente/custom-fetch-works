"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryResultSerializeFixedMediaTypes = void 0;
const actor_abstract_mediatyped_1 = require("@comunica/actor-abstract-mediatyped");
const core_1 = require("@comunica/core");
/**
 * A base actor for listening to SPARQL serialize events that has fixed media types.
 *
 * Actor types:
 * * Input:  IActionSparqlSerializeOrMediaType:      A serialize input or a media type input.
 * * Test:   <none>
 * * Output: IActorQueryResultSerializeOutputOrMediaType: The serialized quads.
 *
 * @see IActionInit
 */
class ActorQueryResultSerializeFixedMediaTypes extends actor_abstract_mediatyped_1.ActorAbstractMediaTypedFixed {
    /* eslint-disable max-len */
    /**
     * TODO: rm this (and eslint-disable) once we remove the abstract media typed actor
     * @param args -
     *   \ @defaultNested {<cbqrs:components/ActorQueryResultSerialize.jsonld#ActorQueryResultSerialize_default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Query result serialization failed: none of the configured actors were able to serialize for type ${action.handle.type}} busFailMessage
     */
    constructor(args) {
        super(args);
    }
    /* eslint-enable max-len */
    async testHandleChecked(_action, _context) {
        return (0, core_1.passTestVoid)();
    }
}
exports.ActorQueryResultSerializeFixedMediaTypes = ActorQueryResultSerializeFixedMediaTypes;
//# sourceMappingURL=ActorQueryResultSerializeFixedMediaTypes.js.map