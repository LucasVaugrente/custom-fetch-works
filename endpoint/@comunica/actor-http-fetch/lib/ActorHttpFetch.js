"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorHttpFetch = void 0;
const bus_http_1 = require("@comunica/bus-http");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
// eslint-disable-next-line import/extensions
const package_json_1 = require("../package.json");
const FetchInitPreprocessor_1 = require("./FetchInitPreprocessor");
class ActorHttpFetch extends bus_http_1.ActorHttp {
    constructor(args) {
        super(args);
        this.fetchInitPreprocessor = new FetchInitPreprocessor_1.FetchInitPreprocessor(args.agentOptions);
    }
    async test(_action) {
        return (0, core_1.passTest)({ time: Number.POSITIVE_INFINITY });
    }
    async run(action) {
        const headers = this.prepareRequestHeaders(action);
        const init = { method: 'GET', ...action.init, headers };
        this.logInfo(action.context, `Requesting ${bus_http_1.ActorHttp.getInputUrl(action.input).href}`, () => ({
            headers: bus_http_1.ActorHttp.headersToHash(headers),
            method: init.method,
        }));
        // TODO: remove this workaround once this has a fix: https://github.com/inrupt/solid-client-authn-js/issues/1708
        if (action.context.has(context_entries_1.KeysHttp.fetch)) {
            init.headers = bus_http_1.ActorHttp.headersToHash(headers);
        }
        if (action.context.get(context_entries_1.KeysHttp.includeCredentials)) {
            init.credentials = 'include';
        }
        const httpTimeout = action.context.get(context_entries_1.KeysHttp.httpTimeout);
        const httpBodyTimeout = action.context.get(context_entries_1.KeysHttp.httpBodyTimeout);
        const fetchFunction = action.context.get(context_entries_1.KeysHttp.fetch) ?? fetch;
        const requestInit = await this.fetchInitPreprocessor.handle(init);
        let timeoutCallback;
        let timeoutHandle;
        if (httpTimeout) {
            const abortController = new AbortController();
            requestInit.signal = abortController.signal;
            timeoutCallback = () => abortController.abort(new Error(`Fetch timed out for ${bus_http_1.ActorHttp.getInputUrl(action.input).href} after ${httpTimeout} ms`));
            timeoutHandle = setTimeout(() => timeoutCallback(), httpTimeout);
        }
        const response = await fetchFunction(action.input, requestInit);
        if (httpTimeout && (!httpBodyTimeout || !response.body)) {
            clearTimeout(timeoutHandle);
        }
        return response;
    }
    /**
     * Prepares the request headers, taking into account the environment.
     * @param {IActionHttp} action The HTTP action
     * @returns {Headers} Headers
     */
    prepareRequestHeaders(action) {
        const headers = new Headers(action.init?.headers);
        if (bus_http_1.ActorHttp.isBrowser()) {
            // When running in a browser, the User-Agent header should never be set
            headers.delete('user-agent');
        }
        else if (!headers.has('user-agent')) {
            // Otherwise, if no header value is provided, use the actor one
            headers.set('user-agent', ActorHttpFetch.userAgent);
        }
        const authString = action.context.get(context_entries_1.KeysHttp.auth);
        if (authString) {
            headers.set('Authorization', `Basic ${ActorHttpFetch.stringToBase64(authString)}`);
        }
        return headers;
    }
    /**
     * Converts a string, including ones with Unicode symbols, to Base64 encoding.
     * This function was adapted from the MDN example function here:
     * https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
     * @param {string} value The string value to encode
     * @returns {string} The Base64-encoded value
     */
    static stringToBase64(value) {
        const bytes = new TextEncoder().encode(value);
        const binString = Array.from(bytes, byte => String.fromCodePoint(byte)).join('');
        return btoa(binString);
    }
}
exports.ActorHttpFetch = ActorHttpFetch;
ActorHttpFetch.userAgent = bus_http_1.ActorHttp.createUserAgent('ActorHttpFetch', package_json_1.version);
//# sourceMappingURL=ActorHttpFetch.js.map