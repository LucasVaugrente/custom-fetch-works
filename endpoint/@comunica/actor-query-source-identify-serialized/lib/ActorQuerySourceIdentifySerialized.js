"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQuerySourceIdentifySerialized = void 0;
const bus_query_source_identify_1 = require("@comunica/bus-query-source-identify");
const core_1 = require("@comunica/core");
const rdf_store_stream_1 = require("rdf-store-stream");
const readable_stream_1 = require("readable-stream");
/**
 * A comunica Serialized Query Source Identify Actor.
 */
class ActorQuerySourceIdentifySerialized extends bus_query_source_identify_1.ActorQuerySourceIdentify {
    constructor(args) {
        super(args);
    }
    async test(action) {
        if (!this.isStringSource(action.querySourceUnidentified)) {
            return (0, core_1.failTest)(`${this.name} requires a single query source with serialized type to be present in the context.`);
        }
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        // Delegate source identification to the same bus again, by converting the string into an RDF/JS source
        return await this.mediatorQuerySourceIdentify.mediate({
            querySourceUnidentified: {
                type: 'rdfjs',
                value: await this.getRdfSource(action.context, action.querySourceUnidentified),
                context: action.querySourceUnidentified.context,
            },
            context: action.context,
        });
    }
    /**
     * Parses the string data source through the RDF parse bus, returning the RDF source.
     * @param context The run action context
     * @param source The source from the run action context
     * @returns Parsed RDF source that can be passed to quad pattern resolve mediator as an RDF/JS source
     */
    async getRdfSource(context, source) {
        const textStream = new readable_stream_1.Readable({ objectMode: true });
        /* istanbul ignore next */
        textStream._read = () => {
            // Do nothing
        };
        textStream.push(source.value);
        textStream.push(null);
        const parseAction = {
            context,
            handle: {
                metadata: { baseIRI: source.baseIRI },
                data: textStream,
                context,
            },
            handleMediaType: source.mediaType,
        };
        const parseResult = await this.mediatorRdfParse.mediate(parseAction);
        return await (0, rdf_store_stream_1.storeStream)(parseResult.handle.data);
    }
    isStringSource(source) {
        if (!('type' in source)) {
            if (!(typeof source.value === 'string')) {
                return false;
            }
            return 'mediaType' in source;
        }
        return source.type === 'serialized';
    }
}
exports.ActorQuerySourceIdentifySerialized = ActorQuerySourceIdentifySerialized;
//# sourceMappingURL=ActorQuerySourceIdentifySerialized.js.map