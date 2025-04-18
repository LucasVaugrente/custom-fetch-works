"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfParseHtmlRdfa = void 0;
const bus_rdf_parse_html_1 = require("@comunica/bus-rdf-parse-html");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const rdfa_streaming_parser_1 = require("rdfa-streaming-parser");
/**
 * A comunica RDFa RDF Parse Html Actor.
 */
class ActorRdfParseHtmlRdfa extends bus_rdf_parse_html_1.ActorRdfParseHtml {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const mediaType = action.headers ? action.headers.get('content-type') : null;
        const language = (action.headers && action.headers.get('content-language')) ?? undefined;
        const profile = mediaType && mediaType.includes('xml') ? 'xhtml' : 'html';
        const htmlParseListener = new rdfa_streaming_parser_1.RdfaParser({ dataFactory, baseIRI: action.baseIRI, profile, language });
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
exports.ActorRdfParseHtmlRdfa = ActorRdfParseHtmlRdfa;
//# sourceMappingURL=ActorRdfParseHtmlRdfa.js.map