"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentLoaderMediated = void 0;
const bus_http_1 = require("@comunica/bus-http");
const stream_to_string_1 = require("@jeswr/stream-to-string");
const jsonld_context_parser_1 = require("jsonld-context-parser");
/**
 * A JSON-LD document loader that fetches over an HTTP bus using a given mediator.
 */
class DocumentLoaderMediated extends jsonld_context_parser_1.FetchDocumentLoader {
    constructor(mediatorHttp, context) {
        super(DocumentLoaderMediated.createFetcher(mediatorHttp, context));
        this.mediatorHttp = mediatorHttp;
        this.context = context;
    }
    static createFetcher(mediatorHttp, context) {
        return async (url, init) => {
            const response = await mediatorHttp.mediate({ input: url, init, context });
            response.json = async () => JSON.parse(await (0, stream_to_string_1.stringify)(bus_http_1.ActorHttp.toNodeReadable(response.body)));
            return response;
        };
    }
}
exports.DocumentLoaderMediated = DocumentLoaderMediated;
//# sourceMappingURL=DocumentLoaderMediated.js.map