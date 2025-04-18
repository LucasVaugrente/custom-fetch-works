"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfParseHtmlMicrodata = void 0;
const bus_rdf_parse_html_1 = require("@comunica/bus-rdf-parse-html");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const microdata_rdf_streaming_parser_1 = require("microdata-rdf-streaming-parser");
/**
 * A comunica Microdata RDF Parse Html Actor.
 */
class ActorRdfParseHtmlMicrodata extends bus_rdf_parse_html_1.ActorRdfParseHtml {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const mediaType = action.headers ? action.headers.get('content-type') : null;
        const xmlMode = mediaType?.includes('xml');
        const htmlParseListener = new microdata_rdf_streaming_parser_1.MicrodataRdfParser({ dataFactory, baseIRI: action.baseIRI, xmlMode });
        htmlParseListener.on('error', action.error);
        htmlParseListener.on('data', action.emit);
        // eslint-disable-next-line ts/unbound-method
        const onTagEndOld = htmlParseListener.onEnd;
        htmlParseListener.onEnd = () => {
            onTagEndOld.call(htmlParseListener);
            action.end();
        };
        return { htmlParseListener };
    }
}
exports.ActorRdfParseHtmlMicrodata = ActorRdfParseHtmlMicrodata;
//# sourceMappingURL=ActorRdfParseHtmlMicrodata.js.map