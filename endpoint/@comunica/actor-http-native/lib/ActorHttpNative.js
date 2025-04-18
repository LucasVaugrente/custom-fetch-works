"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorHttpNative = void 0;
const bus_http_1 = require("@comunica/bus-http");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
// eslint-disable-next-line import/extensions
const package_json_1 = require("../package.json");
const Requester_1 = require("./Requester");
/**
 * A comunica Follow Redirects Http Actor.
 */
class ActorHttpNative extends bus_http_1.ActorHttp {
    constructor(args) {
        super(args);
        this.requester = new Requester_1.default(args.agentOptions);
    }
    async test(_action) {
        return (0, core_1.passTest)({ time: Number.POSITIVE_INFINITY });
    }
    async run(action) {
        const options = {};
        // Input can be a Request object or a string
        // if it is a Request object it can contain the same settings as the init object
        if (action.input.url) {
            options.url = action.input.url;
            Object.assign(options, action.input);
        }
        else {
            options.url = action.input;
        }
        if (action.init) {
            Object.assign(options, action.init);
            options.headers = new Headers(action.init.headers);
            options.body = action.init.body;
        }
        else {
            options.headers = action.input.headers;
            if (action.input.body) {
                throw new Error(`ActorHttpNative does not support passing body via input, use init instead.`);
            }
        }
        if (!options.headers) {
            options.headers = new Headers();
        }
        if (!options.headers.has('user-agent')) {
            options.headers.append('user-agent', ActorHttpNative.userAgent);
        }
        options.method = options.method || 'GET';
        if (action.context.get(context_entries_1.KeysHttp.includeCredentials)) {
            options.withCredentials = true;
        }
        if (action.context.get(context_entries_1.KeysHttp.auth)) {
            options.auth = action.context.get(context_entries_1.KeysHttp.auth);
        }
        this.logInfo(action.context, `Requesting ${options.url}`, () => ({
            headers: bus_http_1.ActorHttp.headersToHash(options.headers),
            method: options.method,
        }));
        // Not all options are supported
        return new Promise((resolve, reject) => {
            const req = this.requester.createRequest(options);
            req.on('error', reject);
            req.on('response', (httpResponse) => {
                httpResponse.on('error', (error) => {
                    httpResponse = null;
                    reject(error);
                });
                // Avoid memory leak on HEAD requests
                if (options.method === 'HEAD') {
                    httpResponse.destroy();
                }
                // Using setImmediate so error can be caught should it be thrown
                setTimeout(() => {
                    if (httpResponse) {
                        // Expose fetch cancel promise
                        httpResponse.cancel = () => {
                            httpResponse.destroy();
                            return Promise.resolve();
                        };
                        // Support abort controller
                        if (action.init?.signal) {
                            if (action.init.signal.aborted) {
                                httpResponse.destroy();
                            }
                            else {
                                action.init.signal.addEventListener('abort', () => httpResponse.destroy());
                            }
                        }
                        // Missing several of the required fetch fields
                        const headers = httpResponse.headers;
                        const result = {
                            body: httpResponse,
                            headers,
                            ok: httpResponse.statusCode < 300,
                            redirected: options.url !== httpResponse.responseUrl,
                            status: httpResponse.statusCode,
                            // When the content came from another resource because of conneg, let Content-Location deliver the url
                            url: headers.has('content-location') ? headers.get('content-location') : httpResponse.responseUrl,
                        };
                        resolve(result);
                    }
                });
            });
        });
    }
}
exports.ActorHttpNative = ActorHttpNative;
ActorHttpNative.userAgent = bus_http_1.ActorHttp.createUserAgent('ActorHttpNative', package_json_1.version);
//# sourceMappingURL=ActorHttpNative.js.map