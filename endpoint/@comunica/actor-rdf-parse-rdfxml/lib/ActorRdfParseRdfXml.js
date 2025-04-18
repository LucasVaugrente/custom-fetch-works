"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfParseRdfXml = void 0;
const bus_rdf_parse_1 = require("@comunica/bus-rdf-parse");
const context_entries_1 = require("@comunica/context-entries");
const rdfxml_streaming_parser_1 = require("rdfxml-streaming-parser");
/**
 * A comunica RDF/XML RDF Parse Actor.
 */
class ActorRdfParseRdfXml extends bus_rdf_parse_1.ActorRdfParseFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "application/rdf+xml": 1.0
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "application/rdf+xml": "http://www.w3.org/ns/formats/RDF_XML"
     *     }} mediaTypeFormats
     */
    constructor(args) {
        super(args);
    }
    async runHandle(action) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        action.data.on('error', error => data.emit('error', error));
        const data = action.data.pipe(new rdfxml_streaming_parser_1.RdfXmlParser({
            dataFactory,
            baseIRI: action.metadata?.baseIRI,
        }));
        return {
            data,
            metadata: { triples: true },
        };
    }
}
exports.ActorRdfParseRdfXml = ActorRdfParseRdfXml;
//# sourceMappingURL=ActorRdfParseRdfXml.js.map