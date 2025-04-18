"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorDereferenceHttpBase = exports.mediaTypesToAcceptString = void 0;
const bus_dereference_1 = require("@comunica/bus-dereference");
const bus_http_1 = require("@comunica/bus-http");
const core_1 = require("@comunica/core");
const stream_to_string_1 = require("@jeswr/stream-to-string");
const relative_to_absolute_iri_1 = require("relative-to-absolute-iri");
const REGEX_MEDIATYPE = /^[^ ;]*/u;
function mediaTypesToAcceptString(mediaTypes, maxLength) {
    const wildcard = '*/*;q=0.1';
    const parts = [];
    const sortedMediaTypes = Object.entries(mediaTypes)
        .map(([mediaType, priority]) => ({ mediaType, priority }))
        .sort((left, right) => right.priority === left.priority ?
        left.mediaType.localeCompare(right.mediaType) :
        right.priority - left.priority);
    // Take into account the ',' characters joining each type
    let partsLength = sortedMediaTypes.length - 1;
    for (const { mediaType, priority } of sortedMediaTypes) {
        const part = mediaType + (priority === 1 ? '' : `;q=${priority.toFixed(3).replace(/0*$/u, '')}`);
        if (partsLength + part.length > maxLength) {
            while (partsLength + wildcard.length > maxLength) {
                const last = parts.pop() ?? '';
                // Don't forget the ','
                partsLength -= last.length + 1;
            }
            parts.push(wildcard);
            break;
        }
        parts.push(part);
        partsLength += part.length;
    }
    return parts.length === 0 ? '*/*' : parts.join(',');
}
exports.mediaTypesToAcceptString = mediaTypesToAcceptString;
/**
 * An actor that listens on the 'dereference' bus.
 *
 * It resolves the URL using the HTTP bus using an accept header compiled from the available media types.
 */
class ActorDereferenceHttpBase extends bus_dereference_1.ActorDereference {
    constructor(args) {
        super(args);
    }
    async test({ url }) {
        if (!/^https?:/u.test(url)) {
            return (0, core_1.failTest)(`Cannot retrieve ${url} because it is not an HTTP(S) URL.`);
        }
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        let exists = true;
        // Append any custom passed headers
        const headers = new Headers(action.headers);
        // Resolve HTTP URL using appropriate accept header
        headers.append('Accept', mediaTypesToAcceptString(await action.mediaTypes?.() ?? {}, this.getMaxAcceptHeaderLength()));
        let httpResponse;
        const requestTimeStart = Date.now();
        try {
            httpResponse = await this.mediatorHttp.mediate({
                context: action.context,
                init: { headers, method: action.method },
                input: action.url,
            });
        }
        catch (error) {
            return this.handleDereferenceErrors(action, error);
        }
        // The response URL can be relative to the given URL
        const url = (0, relative_to_absolute_iri_1.resolve)(httpResponse.url, action.url);
        const requestTime = Date.now() - requestTimeStart;
        // Only parse if retrieval was successful
        if (httpResponse.status !== 200) {
            exists = false;
            // Consume the body, to avoid process to hang
            const bodyString = httpResponse.body ?
                await (0, stream_to_string_1.stringify)(bus_http_1.ActorHttp.toNodeReadable(httpResponse.body)) :
                'empty response';
            if (!action.acceptErrors) {
                const error = new Error(`Could not retrieve ${action.url} (HTTP status ${httpResponse.status}):\n${bodyString}`);
                return this.handleDereferenceErrors(action, error, httpResponse.headers, requestTime);
            }
        }
        const mediaType = REGEX_MEDIATYPE.exec(httpResponse.headers.get('content-type') ?? '')?.[0];
        // Return the parsed quad stream and whether or not only triples are supported
        return {
            url,
            data: exists ? bus_http_1.ActorHttp.toNodeReadable(httpResponse.body) : (0, bus_dereference_1.emptyReadable)(),
            exists,
            requestTime,
            headers: httpResponse.headers,
            mediaType: mediaType === 'text/plain' ? undefined : mediaType,
        };
    }
}
exports.ActorDereferenceHttpBase = ActorDereferenceHttpBase;
//# sourceMappingURL=ActorDereferenceHttpBase.js.map