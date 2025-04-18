"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfParseShaclc = void 0;
const bus_rdf_parse_1 = require("@comunica/bus-rdf-parse");
const stream_to_string_1 = require("@jeswr/stream-to-string");
const readable_stream_1 = require("readable-stream");
const shaclc_parse_1 = require("shaclc-parse");
const PrefixWrappingIterator_1 = require("./PrefixWrappingIterator");
/**
 * A comunica SHACL Compact Syntax RDF Parse Actor.
 */
class ActorRdfParseShaclc extends bus_rdf_parse_1.ActorRdfParseFixedMediaTypes {
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
    async runHandle(action, mediaType, _context) {
        const prefixIterator = new PrefixWrappingIterator_1.PrefixWrappingIterator(
        // TODO: pass data factory
        (0, stream_to_string_1.stringify)(action.data).then(str => (0, shaclc_parse_1.parse)(str, {
            extendedSyntax: mediaType === 'text/shaclc-ext',
            baseIRI: action.metadata?.baseIRI,
        })));
        const readable = new readable_stream_1.Readable({ objectMode: true });
        prefixIterator.on('prefix', (...args) => readable.emit('prefix', ...args));
        return {
            data: readable.wrap(prefixIterator),
            metadata: { triples: true },
        };
    }
}
exports.ActorRdfParseShaclc = ActorRdfParseShaclc;
//# sourceMappingURL=ActorRdfParseShaclc.js.map