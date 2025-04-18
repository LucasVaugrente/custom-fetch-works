"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfSerializeJsonLd = void 0;
const bus_rdf_serialize_1 = require("@comunica/bus-rdf-serialize");
const jsonld_streaming_serializer_1 = require("jsonld-streaming-serializer");
/**
 * A comunica Jsonld RDF Serialize Actor.
 */
class ActorRdfSerializeJsonLd extends bus_rdf_serialize_1.ActorRdfSerializeFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "application/ld+json": 1.0
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "application/ld+json": "http://www.w3.org/ns/formats/JSON-LD"
     *     }} mediaTypeFormats
     */
    constructor(args) {
        super(args);
    }
    async runHandle(action, _mediaType, _context) {
        const writer = new jsonld_streaming_serializer_1.JsonLdSerializer({ space: ' '.repeat(this.jsonStringifyIndentSpaces) });
        let data;
        if ('pipe' in action.quadStream) {
            // Prefer piping if possible, to maintain backpressure
            action.quadStream.on('error', error => writer.emit('error', error));
            data = action.quadStream.pipe(writer);
        }
        else {
            data = writer.import(action.quadStream);
        }
        return { data };
    }
}
exports.ActorRdfSerializeJsonLd = ActorRdfSerializeJsonLd;
//# sourceMappingURL=ActorRdfSerializeJsonLd.js.map