"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfParseFixedMediaTypes = void 0;
const actor_abstract_mediatyped_1 = require("@comunica/actor-abstract-mediatyped");
const core_1 = require("@comunica/core");
/**
 * A base actor for listening to RDF parse events that has fixed media types.
 *
 * Actor types:
 * * Input:  IActionRdfParseOrMediaType:      A parse input or a media type input.
 * * Test:   <none>
 * * Output: IActorOutputRdfParseOrMediaType: The parsed quads.
 *
 * @see IActionInit
 */
class ActorRdfParseFixedMediaTypes extends actor_abstract_mediatyped_1.ActorAbstractMediaTypedFixed {
    /* eslint-disable max-len */
    /**
     * TODO: rm this (and eslint-disable) once we remove the abstract media typed actor
     * @param args -
     *   \ @defaultNested {<cbrp:components/ActorRdfParse.jsonld#ActorRdfParse_default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {RDF parsing failed: none of the configured parsers were able to handle the media type ${action.handle.mediaType} for ${action.handle.url}} busFailMessage
     */
    constructor(args) {
        super(args);
    }
    /* eslint-enable max-len */
    async testHandleChecked(_action) {
        return (0, core_1.passTestVoid)();
    }
}
exports.ActorRdfParseFixedMediaTypes = ActorRdfParseFixedMediaTypes;
//# sourceMappingURL=ActorRdfParseFixedMediaTypes.js.map