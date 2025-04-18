"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorHttpProxy = void 0;
const bus_http_1 = require("@comunica/bus-http");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
/**
 * A comunica Proxy Http Actor.
 */
class ActorHttpProxy extends bus_http_1.ActorHttp {
    constructor(args) {
        super(args);
    }
    async test(action) {
        const proxyHandler = action.context.get(context_entries_1.KeysHttpProxy.httpProxyHandler);
        if (!proxyHandler) {
            return (0, core_1.failTest)(`Actor ${this.name} could not find a proxy handler in the context.`);
        }
        if (!await proxyHandler.getProxy(action)) {
            return (0, core_1.failTest)(`Actor ${this.name} could not determine a proxy for the given request.`);
        }
        return (0, core_1.passTest)({ time: Number.POSITIVE_INFINITY });
    }
    async run(action) {
        const requestedUrl = typeof action.input === 'string' ? action.input : action.input.url;
        const proxyHandler = action.context.get(context_entries_1.KeysHttpProxy.httpProxyHandler);
        // Send a request for the modified request
        const output = await this.mediatorHttp.mediate({
            ...await proxyHandler.getProxy(action),
            context: action.context.delete(context_entries_1.KeysHttpProxy.httpProxyHandler),
        });
        // Modify the response URL
        // use defineProperty to allow modification of unmodifiable objects
        Object.defineProperty(output, 'url', {
            configurable: true,
            enumerable: true,
            get: () => output.headers.get('x-final-url') ?? requestedUrl,
        });
        return output;
    }
}
exports.ActorHttpProxy = ActorHttpProxy;
//# sourceMappingURL=ActorHttpProxy.js.map