"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfParseN3 = void 0;
const bus_rdf_parse_1 = require("@comunica/bus-rdf-parse");
const context_entries_1 = require("@comunica/context-entries");
const n3_1 = require("n3");
/**
 * An N3 RDF Parse actor that listens on the 'rdf-parse' bus.
 *
 * It is able to parse N3-based RDF serializations and announce the presence of them by media type.
 */
class ActorRdfParseN3 extends bus_rdf_parse_1.ActorRdfParseFixedMediaTypes {
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
    async runHandle(action, mediaType, _context) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        action.data.on('error', error => data.emit('error', error));
        const data = action.data.pipe(new n3_1.StreamParser({
            factory: dataFactory,
            baseIRI: action.metadata?.baseIRI,
            // Enable RDF-star-mode on all formats, except N3, where this is not supported.
            format: mediaType.endsWith('n3') ? mediaType : `${mediaType}*`,
        }));
        return {
            data,
            metadata: {
                triples: mediaType === 'text/turtle' ||
                    mediaType === 'application/n-triples' ||
                    mediaType === 'text/n3',
            },
        };
    }
}
exports.ActorRdfParseN3 = ActorRdfParseN3;
//# sourceMappingURL=ActorRdfParseN3.js.map