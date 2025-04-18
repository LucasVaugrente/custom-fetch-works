"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorHttpWayback = void 0;
const bus_http_1 = require("@comunica/bus-http");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const stream_to_string_1 = require("@jeswr/stream-to-string");
const WAYBACK_URL = 'http://wayback.archive-it.org/';
function addWayback(action) {
    const request = new Request(action.input, action.init);
    return {
        input: new Request(new URL(`/${request.url}`, WAYBACK_URL), request),
    };
}
function getProxyHandler(context) {
    const handler = context.get(context_entries_1.KeysHttpProxy.httpProxyHandler);
    if (handler) {
        return (action) => handler.getProxy(addWayback(action));
    }
    return (action) => Promise.resolve(addWayback(action));
}
/**
 * A Comunica actor to intercept HTTP requests to recover broken links using the WayBack Machine
 */
class ActorHttpWayback extends bus_http_1.ActorHttp {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        let result = await this.mediatorHttp.mediate(action);
        if (result.status === 404 && action.context.get(context_entries_1.KeysHttpWayback.recoverBrokenLinks)) {
            let fallbackResult = await this.mediatorHttp.mediate({
                ...action,
                context: action.context
                    .set(context_entries_1.KeysHttpWayback.recoverBrokenLinks, false)
                    .set(context_entries_1.KeysHttpProxy.httpProxyHandler, { getProxy: getProxyHandler(action.context) }),
            });
            // If the wayback machine returns a 200 status then use that result
            if (fallbackResult.status === 200) {
                [result, fallbackResult] = [fallbackResult, result];
            }
            // Consume stream to avoid process
            const { body } = fallbackResult;
            if (body) {
                if ('cancel' in body && typeof body.cancel === 'function') {
                    await body.cancel();
                }
                else if ('destroy' in body && typeof body.destroy === 'function') {
                    body.destroy();
                }
                else {
                    await (0, stream_to_string_1.stringify)(bus_http_1.ActorHttp.toNodeReadable(body));
                }
            }
        }
        return result;
    }
}
exports.ActorHttpWayback = ActorHttpWayback;
//# sourceMappingURL=ActorHttpWayback.js.map