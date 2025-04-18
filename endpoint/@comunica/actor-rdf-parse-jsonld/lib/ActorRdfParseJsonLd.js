"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfParseJsonLd = void 0;
const bus_rdf_parse_1 = require("@comunica/bus-rdf-parse");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const jsonld_streaming_parser_1 = require("jsonld-streaming-parser");
const DocumentLoaderMediated_1 = require("./DocumentLoaderMediated");
/**
 * A JSON-LD RDF Parse actor that listens on the 'rdf-parse' bus.
 *
 * It is able to parse JSON-LD-based RDF serializations and announce the presence of them by media type.
 */
class ActorRdfParseJsonLd extends bus_rdf_parse_1.ActorRdfParseFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "application/ld+json": 1.0,
     *       "application/json": 0.15
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "application/ld+json": "http://www.w3.org/ns/formats/JSON-LD",
     *       "application/json": "http://www.w3.org/ns/formats/JSON-LD"
     *     }} mediaTypeFormats
     */
    constructor(args) {
        super(args);
    }
    async testHandle(action, mediaType, context) {
        if (context.has(context_entries_1.KeysRdfParseHtmlScript.processingHtmlScript) && mediaType !== 'application/ld+json') {
            return (0, core_1.failTest)(`JSON-LD in script tags can only have media type 'application/ld+json'`);
        }
        if (!mediaType || !(mediaType in this.mediaTypePriorities || mediaType.endsWith('+json'))) {
            return (0, core_1.failTest)(`Unrecognized media type: ${mediaType}`);
        }
        return await this.testHandleChecked(action);
    }
    async runHandle(action, mediaType, actionContext) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const parser = jsonld_streaming_parser_1.JsonLdParser.fromHttpResponse(action.metadata?.baseIRI ?? '', mediaType, action.headers, {
            dataFactory,
            documentLoader: actionContext.get(context_entries_1.KeysRdfParseJsonLd.documentLoader) ??
                new DocumentLoaderMediated_1.DocumentLoaderMediated(this.mediatorHttp, actionContext),
            strictValues: actionContext.get(context_entries_1.KeysRdfParseJsonLd.strictValues),
            ...actionContext.get(context_entries_1.KeysRdfParseJsonLd.parserOptions),
        });
        const data = parser.import(action.data);
        return { data };
    }
}
exports.ActorRdfParseJsonLd = ActorRdfParseJsonLd;
//# sourceMappingURL=ActorRdfParseJsonLd.js.map