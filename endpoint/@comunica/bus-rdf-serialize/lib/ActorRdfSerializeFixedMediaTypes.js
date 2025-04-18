"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfSerializeFixedMediaTypes = void 0;
const actor_abstract_mediatyped_1 = require("@comunica/actor-abstract-mediatyped");
const core_1 = require("@comunica/core");
/**
 * A base actor for listening to RDF serialize events that has fixed media types.
 *
 * Actor types:
 * * Input:  IActionRdfSerializeOrMediaType:      A serialize input or a media type input.
 * * Test:   <none>
 * * Output: IActorRdfSerializeOutputOrMediaType: The serialized quads.
 *
 * @see IActionInit
 */
class ActorRdfSerializeFixedMediaTypes extends actor_abstract_mediatyped_1.ActorAbstractMediaTypedFixed {
    /* eslint-disable max-len */
    /**
     * TODO: rm this (and eslint-disable) once we remove the abstract media typed actor
     * @param args -
     *   \ @defaultNested {<cbrs:components/ActorRdfSerialize.jsonld#ActorRdfSerialize_default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {RDF serialization failed: none of the configured serializers were able to handle media type ${action.handleMediaType}} busFailMessage
     */
    constructor(args) {
        super(args);
    }
    /* eslint-enable max-len */
    async testHandleChecked() {
        return (0, core_1.passTestVoid)();
    }
}
exports.ActorRdfSerializeFixedMediaTypes = ActorRdfSerializeFixedMediaTypes;
//# sourceMappingURL=ActorRdfSerializeFixedMediaTypes.js.map