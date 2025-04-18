"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfParseXmlRdfa = void 0;
const bus_rdf_parse_1 = require("@comunica/bus-rdf-parse");
const context_entries_1 = require("@comunica/context-entries");
const rdfa_streaming_parser_1 = require("rdfa-streaming-parser");
/**
 * A comunica XML RDFa RDF Parse Actor.
 */
class ActorRdfParseXmlRdfa extends bus_rdf_parse_1.ActorRdfParseFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "application/xml": 1.0,
     *       "text/xml": 1.0,
     *       "image/svg+xml": 1.0
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "application/xml": "http://www.w3.org/ns/formats/RDFa",
     *       "text/xml": "http://www.w3.org/ns/formats/RDFa",
     *       "image/svg+xml": "http://www.w3.org/ns/formats/RDFa"
     *     }} mediaTypeFormats
     */
    constructor(args) {
        super(args);
    }
    async runHandle(action, _mediaType, _context) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const language = (action.headers && action.headers.get('content-language')) ?? undefined;
        action.data.on('error', error => data.emit('error', error));
        const data = action.data.pipe(new rdfa_streaming_parser_1.RdfaParser({
            dataFactory,
            baseIRI: action.metadata?.baseIRI,
            profile: 'xml',
            language,
        }));
        return { data, metadata: { triples: true } };
    }
}
exports.ActorRdfParseXmlRdfa = ActorRdfParseXmlRdfa;
//# sourceMappingURL=ActorRdfParseXmlRdfa.js.map