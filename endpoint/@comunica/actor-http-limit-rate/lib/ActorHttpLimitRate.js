"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorHttpLimitRate = void 0;
const bus_http_1 = require("@comunica/bus-http");
const core_1 = require("@comunica/core");
class ActorHttpLimitRate extends bus_http_1.ActorHttp {
    constructor(args) {
        super(args);
        this.mediatorHttp = args.mediatorHttp;
        this.httpInvalidator = args.httpInvalidator;
        this.httpInvalidator.addInvalidateListener(action => this.handleHttpInvalidateEvent(action));
        this.correctionMultiplier = args.correctionMultiplier;
        this.failureMultiplier = args.failureMultiplier;
        this.limitByDefault = args.limitByDefault;
        this.allowOverlap = args.allowOverlap;
        this.hostData = new Map();
    }
    async test(action) {
        if (action.context.has(ActorHttpLimitRate.keyWrapped)) {
            return (0, core_1.failTest)(`${this.name} can only wrap a request once`);
        }
        return (0, core_1.passTest)({ time: 0 });
    }
    async run(action) {
        const requestUrl = bus_http_1.ActorHttp.getInputUrl(action.input);
        let requestHostData = this.hostData.get(requestUrl.host);
        if (!requestHostData) {
            requestHostData = {
                latestRequestTimestamp: 0,
                rateLimited: this.limitByDefault,
                requestInterval: Number.NEGATIVE_INFINITY,
            };
            this.hostData.set(requestUrl.host, requestHostData);
        }
        const currentTimestamp = Date.now();
        let currentRequestDelay = 0;
        if (requestHostData.rateLimited) {
            currentRequestDelay = Math.max(0, requestHostData.latestRequestTimestamp + requestHostData.requestInterval - currentTimestamp);
        }
        // Update the latest request timestamp before waiting, so that further requests will be delayed correctly.
        // When overlap is disallowed, the timestamp is set to the expected despatch time of the current request,
        // which will help smooth out request bursts by spacing them out evently. With overlap allowed, however,
        // the timestamp is set to current time, which will result in overlapping requests and prevent smoothing.
        requestHostData.latestRequestTimestamp = currentTimestamp + (this.allowOverlap ? 0 : 1) * currentRequestDelay;
        if (currentRequestDelay > 0) {
            this.logDebug(action.context, 'Delaying request to match host response intervals', () => ({
                url: requestUrl.href,
                host: requestUrl.host,
                hostIntervalMilliseconds: requestHostData.requestInterval,
                requestDelayMilliseconds: currentRequestDelay,
            }));
            await new Promise(resolve => setTimeout(resolve, currentRequestDelay));
        }
        const registerCompletedRequest = (success) => {
            const requestDuration = (success ? 1 : this.failureMultiplier) *
                (Date.now() - currentTimestamp - currentRequestDelay);
            if (!success && !requestHostData.rateLimited) {
                requestHostData.rateLimited = true;
            }
            if (requestHostData.requestInterval < 0) {
                requestHostData.requestInterval = requestDuration * this.correctionMultiplier;
            }
            else {
                requestHostData.requestInterval += Math.round(this.correctionMultiplier * (requestDuration - requestHostData.requestInterval));
            }
        };
        try {
            const response = await this.mediatorHttp.mediate({
                ...action,
                context: action.context.set(ActorHttpLimitRate.keyWrapped, true),
            });
            registerCompletedRequest(response.ok);
            return response;
        }
        catch (error) {
            registerCompletedRequest(false);
            throw error;
        }
    }
    /**
     * Handles HTTP cache invalidation events.
     * @param {IActionHttpInvalidate} action The invalidation action
     */
    handleHttpInvalidateEvent(action) {
        if (action.url) {
            const invalidatedHost = new URL(action.url).host;
            this.hostData.delete(invalidatedHost);
        }
        else {
            this.hostData.clear();
        }
    }
}
exports.ActorHttpLimitRate = ActorHttpLimitRate;
// Context key to indicate that the actor has already wrapped the given request
ActorHttpLimitRate.keyWrapped = new core_1.ActionContextKey('urn:comunica:actor-http-limit-rate#wrapped');
//# sourceMappingURL=ActorHttpLimitRate.js.map