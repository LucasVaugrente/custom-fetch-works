"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorHttpMemento = void 0;
const bus_http_1 = require("@comunica/bus-http");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const http_link_header_1 = require("http-link-header");
/**
 * A comunica Memento Http Actor.
 */
class ActorHttpMemento extends bus_http_1.ActorHttp {
    constructor(args) {
        super(args);
    }
    async test(action) {
        if (!(action.context.has(context_entries_1.KeysHttpMemento.datetime) &&
            action.context.get(context_entries_1.KeysHttpMemento.datetime) instanceof Date)) {
            return (0, core_1.failTest)('This actor only handles request with a set valid datetime.');
        }
        if (action.init && new Headers(action.init.headers).has('accept-datetime')) {
            return (0, core_1.failTest)('The request already has a set datetime.');
        }
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        // Duplicate the ActionHttp to append a datetime header to the request.
        const init = action.init ? { ...action.init } : {};
        const headers = init.headers = new Headers(init.headers ?? {});
        const dateTime = action.context.get(context_entries_1.KeysHttpMemento.datetime);
        if (dateTime) {
            headers.append('accept-datetime', dateTime.toUTCString());
        }
        const httpAction = { context: action.context, input: action.input, init };
        // Execute the request and follow the timegate in the response (if any).
        const result = await this.mediatorHttp.mediate(httpAction);
        // Did we ask for a time-negotiated response, but haven't received one?
        if (headers.has('accept-datetime') && result.headers && !result.headers.has('memento-datetime')) {
            // The links might have a timegate that can help us
            const header = result.headers.get('link');
            const timegate = header && (0, http_link_header_1.parse)(header)?.get('rel', 'timegate');
            if (timegate && timegate.length > 0) {
                await result.body?.cancel();
                // Respond with a time-negotiated response from the timegate instead
                const followLink = { context: action.context, input: timegate[0].uri, init };
                return this.mediatorHttp.mediate(followLink);
            }
        }
        return result;
    }
}
exports.ActorHttpMemento = ActorHttpMemento;
//# sourceMappingURL=ActorHttpMemento.js.map