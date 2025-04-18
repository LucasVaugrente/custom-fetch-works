"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAndCloseHttpResponse = void 0;
const stream_to_string_1 = require("@jeswr/stream-to-string");
const ActorHttp_1 = require("./ActorHttp");
/**
 * Check if the http response is valid, and throw an error if not.
 * @param url The original URL that was to be updated.
 * @param httpResponse The update response.
 */
async function validateAndCloseHttpResponse(url, httpResponse) {
    // Check if update was successful
    if (httpResponse.status >= 400) {
        // Consume the body, to avoid process to hang
        let bodyString = 'empty response';
        if (httpResponse.body) {
            const responseStream = ActorHttp_1.ActorHttp.toNodeReadable(httpResponse.body);
            bodyString = await (0, stream_to_string_1.stringify)(responseStream);
        }
        throw new Error(`Could not update ${url} (HTTP status ${httpResponse.status}):\n${bodyString}`);
    }
    // Close response body, as we don't need it
    await httpResponse.body?.cancel();
}
exports.validateAndCloseHttpResponse = validateAndCloseHttpResponse;
//# sourceMappingURL=utils.js.map