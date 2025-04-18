"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionObserverHttp = void 0;
const core_1 = require("@comunica/core");
/**
 * Observes HTTP actions, and maintains a counter of the number of requests.
 */
class ActionObserverHttp extends core_1.ActionObserver {
    /* eslint-disable max-len */
    /**
     * @param args - @defaultNested {<npmd:@comunica/bus-http/^4.0.0/components/ActorHttp.jsonld#ActorHttp_default_bus>} bus
     */
    constructor(args) {
        super(args);
        this.requests = 0;
        this.bus.subscribeObserver(this);
        this.httpInvalidator.addInvalidateListener(() => {
            this.requests = 0;
        });
    }
    /* eslint-enable max-len */
    onRun(_actor, _action, _output) {
        this.requests++;
    }
}
exports.ActionObserverHttp = ActionObserverHttp;
//# sourceMappingURL=ActionObserverHttp.js.map