"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfSerializeShaclc = void 0;
const bus_rdf_serialize_1 = require("@comunica/bus-rdf-serialize");
const arrayify_stream_1 = require("arrayify-stream");
const readable_stream_1 = require("readable-stream");
const shaclc_write_1 = require("shaclc-write");
/**
 * A comunica SHACL Compact Syntax RDF Serialize Actor.
 */
class ActorRdfSerializeShaclc extends bus_rdf_serialize_1.ActorRdfSerializeFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "text/shaclc": 1.0,
     *       "text/shaclc-ext": 0.5
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "text/shaclc": "http://www.w3.org/ns/formats/Shaclc",
     *       "text/shaclc-ext": "http://www.w3.org/ns/formats/ShaclcExtended"
     *     }} mediaTypeFormats
     */
    constructor(args) {
        super(args);
    }
    async runHandle(action, mediaType) {
        const data = new readable_stream_1.Readable();
        data._read = () => {
            // Do nothing
        };
        try {
            const prefixes = {};
            action.quadStream.on('prefix', (prefix, iri) => {
                prefixes[prefix] = iri;
            });
            const { text } = await (0, shaclc_write_1.write)(await (0, arrayify_stream_1.default)(action.quadStream), { errorOnUnused: true, extendedSyntax: mediaType === 'text/shaclc-ext', prefixes });
            data.push(text);
            data.push(null);
        }
        catch (error) {
            // Push the error into the stream
            data._read = () => {
                data.emit('error', error);
            };
        }
        return {
            data,
            triples: true,
        };
    }
}
exports.ActorRdfSerializeShaclc = ActorRdfSerializeShaclc;
//# sourceMappingURL=ActorRdfSerializeShaclc.js.map