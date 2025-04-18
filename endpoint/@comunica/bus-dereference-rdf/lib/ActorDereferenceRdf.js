"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorDereferenceRdf = void 0;
const bus_dereference_1 = require("@comunica/bus-dereference");
/**
 * A base actor for dereferencing URLs to quad streams.
 *
 * Actor types:
 * * Input:  IActionDereferenceRdf:      A URL.
 * * Test:   <none>
 * * Output: IActorDereferenceRdfOutput: A quad stream.
 *
 * @see IActionDereferenceRdf
 * @see IActorDereferenceRdfOutput
 */
class ActorDereferenceRdf extends bus_dereference_1.ActorDereferenceParse {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {RDF dereferencing failed: none of the configured parsers were able to handle the media type ${action.handle.mediaType} for ${action.handle.url}} busFailMessage
     */
    /* eslint-enable max-len */
    constructor(args) {
        super(args);
    }
}
exports.ActorDereferenceRdf = ActorDereferenceRdf;
//# sourceMappingURL=ActorDereferenceRdf.js.map