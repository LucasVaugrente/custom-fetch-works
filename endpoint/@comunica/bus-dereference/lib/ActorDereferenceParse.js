"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorDereferenceParse = exports.getMediaTypeFromExtension = void 0;
const core_1 = require("@comunica/core");
const readable_stream_1 = require("readable-stream");
const ActorDereferenceBase_1 = require("./ActorDereferenceBase");
/**
 * Get the media type based on the extension of the given path,
 * which can be an URL or file path.
 * @param {string} path A path.
 * @param {Record<string, string>} mediaMappings A collection of mappings,
 * mapping file extensions to their corresponding media type.
 * @return {string} A media type or the empty string.
 */
function getMediaTypeFromExtension(path, mediaMappings) {
    const dotIndex = path.lastIndexOf('.');
    // Get extension after last dot and map to media
    // eslint-disable-next-line ts/prefer-nullish-coalescing
    return (dotIndex >= 0 && mediaMappings?.[path.slice(dotIndex + 1)]) || '';
}
exports.getMediaTypeFromExtension = getMediaTypeFromExtension;
/**
 * An abstract actor that handles dereference and parse actions.
 *
 * Actor types:
 * Input:  IActionDereferenceParse:      A URL.
 * Test:   <none>
 * Output: IActorDereferenceParseOutput: A data stream of type output by the Parser.
 *
 */
class ActorDereferenceParse extends ActorDereferenceBase_1.ActorDereferenceBase {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    /**
     * If hard errors are disabled, modify the given stream so that errors are delegated to the logger.
     * @param {IActionDereferenceParse} action A dereference action.
     * @param {Readable} data A data stream.
     * @return {Readable} The resulting data stream.
     */
    handleDereferenceStreamErrors(action, data) {
        // If we don't emit hard errors, make parsing error events log instead, and silence them downstream.
        if (!(0, ActorDereferenceBase_1.isHardError)(action.context)) {
            data.on('error', (error) => {
                this.logWarn(action.context, error.message, () => ({ url: action.url }));
                // Make sure the errored stream is ended.
                data.push(null);
            });
            data = data.pipe(new readable_stream_1.PassThrough({ objectMode: true }));
        }
        return data;
    }
    async run(action) {
        const { context } = action;
        const dereference = await this.mediatorDereference.mediate({
            ...action,
            mediaTypes: async () => (await this.mediatorParseMediatypes?.mediate({ context, mediaTypes: true }))?.mediaTypes,
        });
        let result;
        try {
            result = (await this.mediatorParse.mediate({
                context,
                handle: { context, ...dereference, metadata: await this.getMetadata(dereference) },
                // eslint-disable-next-line ts/prefer-nullish-coalescing
                handleMediaType: (dereference.mediaType ||
                    getMediaTypeFromExtension(dereference.url, this.mediaMappings)) ||
                    action.mediaType,
            })).handle;
            result.data = this.handleDereferenceStreamErrors(action, result.data);
        }
        catch (error) {
            // Close the body, to avoid process to hang
            await dereference.data.close?.();
            result = await this.dereferenceErrorHandler(action, error, {});
        }
        // Return the parsed stream and any metadata
        return { ...dereference, ...result };
    }
}
exports.ActorDereferenceParse = ActorDereferenceParse;
//# sourceMappingURL=ActorDereferenceParse.js.map