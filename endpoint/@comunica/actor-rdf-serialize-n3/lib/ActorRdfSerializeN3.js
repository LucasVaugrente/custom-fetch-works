"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfSerializeN3 = void 0;
const bus_rdf_serialize_1 = require("@comunica/bus-rdf-serialize");
const n3_1 = require("n3");
/**
 * A comunica N3 RDF Serialize Actor.
 */
class ActorRdfSerializeN3 extends bus_rdf_serialize_1.ActorRdfSerializeFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "application/n-quads": 1.0,
     *       "application/trig": 0.95,
     *       "application/n-triples": 0.8,
     *       "text/turtle": 0.6,
     *       "text/n3": 0.35
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "application/n-quads": "http://www.w3.org/ns/formats/N-Quads",
     *       "application/trig": "http://www.w3.org/ns/formats/TriG",
     *       "application/n-triples": "http://www.w3.org/ns/formats/N-Triples",
     *       "text/turtle": "http://www.w3.org/ns/formats/Turtle",
     *       "text/n3": "http://www.w3.org/ns/formats/N3"
     *     }} mediaTypeFormats
     */
    constructor(args) {
        super(args);
    }
    async runHandle(action, mediaType) {
        const writer = new n3_1.StreamWriter({ format: mediaType });
        let data;
        if ('pipe' in action.quadStream) {
            // Prefer piping if possible, to maintain backpressure
            action.quadStream.on('error', error => writer.emit('error', error));
            data = action.quadStream.pipe(writer);
        }
        else {
            data = writer.import(action.quadStream);
        }
        return { data, triples: mediaType === 'text/turtle' ||
                mediaType === 'application/n-triples' ||
                mediaType === 'text/n3' };
    }
}
exports.ActorRdfSerializeN3 = ActorRdfSerializeN3;
//# sourceMappingURL=ActorRdfSerializeN3.js.map