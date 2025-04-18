"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryResultSerializeRdf = void 0;
const bus_query_result_serialize_1 = require("@comunica/bus-query-result-serialize");
const core_1 = require("@comunica/core");
/**
 * A comunica RDF Query Result Serialize Actor.
 *
 * It serializes quad streams (for example resulting from a CONSTRUCT query)
 * to an RDF syntax.
 */
class ActorQueryResultSerializeRdf extends bus_query_result_serialize_1.ActorQueryResultSerialize {
    constructor(args) {
        super(args);
    }
    async testHandle(action, mediaType, context) {
        // Check if we are provided with a quad stream
        if (action.type !== 'quads') {
            return (0, core_1.failTest)(`Actor ${this.name} can only handle quad streams`);
        }
        // Check if the given media type can be handled
        const { mediaTypes } = await this.mediatorMediaTypeCombiner.mediate({ context, mediaTypes: true });
        if (!(mediaType in mediaTypes)) {
            return (0, core_1.failTest)(`Actor ${this.name} can not handle media type ${mediaType}. All available types: ${
            // eslint-disable-next-line ts/restrict-template-expressions
            Object.keys(mediaTypes)}`);
        }
        return (0, core_1.passTestVoid)();
    }
    async runHandle(action, mediaType, context) {
        // Delegate handling to the mediator
        return (await this.mediatorRdfSerialize.mediate({
            context,
            handle: {
                context,
                quadStream: action.quadStream,
            },
            handleMediaType: mediaType,
        })).handle;
    }
    async testMediaType(_context) {
        return (0, core_1.passTestVoid)();
    }
    async getMediaTypes(context) {
        return (await this.mediatorMediaTypeCombiner.mediate({ context, mediaTypes: true })).mediaTypes;
    }
    async testMediaTypeFormats(_context) {
        return (0, core_1.passTestVoid)();
    }
    async getMediaTypeFormats(context) {
        return (await this.mediatorMediaTypeFormatCombiner.mediate({ context, mediaTypeFormats: true })).mediaTypeFormats;
    }
}
exports.ActorQueryResultSerializeRdf = ActorQueryResultSerializeRdf;
//# sourceMappingURL=ActorQueryResultSerializeRdf.js.map