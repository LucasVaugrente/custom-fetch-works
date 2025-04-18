"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchInitPreprocessor = void 0;
/* eslint-disable import/no-nodejs-modules */
const node_http_1 = require("node:http");
const node_https_1 = require("node:https");
/**
 * Overrides the HTTP agent to perform better in Node.js.
 */
class FetchInitPreprocessor {
    constructor(agentOptions) {
        const httpAgent = new node_http_1.Agent(agentOptions);
        const httpsAgent = new node_https_1.Agent(agentOptions);
        this.agent = (_parsedURL) => _parsedURL.protocol === 'http:' ? httpAgent : httpsAgent;
    }
    async handle(init) {
        // Add 'Accept-Encoding' headers
        const headers = new Headers(init.headers);
        if (!headers.has('Accept-Encoding')) {
            headers.set('Accept-Encoding', 'br,gzip,deflate');
            init = { ...init, headers };
        }
        // The Fetch API requires specific options to be set when sending body streams:
        // - 'keepalive' can not be true
        // - 'duplex' must be set to 'half'
        return {
            ...init,
            ...init.body ? { keepalive: false, duplex: 'half' } : { keepalive: true },
            agent: this.agent,
        };
    }
}
exports.FetchInitPreprocessor = FetchInitPreprocessor;
//# sourceMappingURL=FetchInitPreprocessor.js.map