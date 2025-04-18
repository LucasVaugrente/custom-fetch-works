"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorHttpRetry = void 0;
const bus_http_1 = require("@comunica/bus-http");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
class ActorHttpRetry extends bus_http_1.ActorHttp {
    constructor(args) {
        super(args);
        this.activeDelays = {};
        this.httpInvalidator = args.httpInvalidator;
        this.httpInvalidator.addInvalidateListener(action => this.handleHttpInvalidateEvent(action));
        this.mediatorHttp = args.mediatorHttp;
    }
    async test(action) {
        if (action.context.has(ActorHttpRetry.keyWrapped)) {
            return (0, core_1.failTest)(`${this.name} can only wrap a request once`);
        }
        const retryCount = action.context.get(context_entries_1.KeysHttp.httpRetryCount);
        if (!retryCount || retryCount < 1) {
            return (0, core_1.failTest)(`${this.name} requires a retry count greater than zero to function`);
        }
        return (0, core_1.passTest)({ time: 0 });
    }
    async run(action) {
        const url = bus_http_1.ActorHttp.getInputUrl(action.input);
        // Attempt once + the number of retries specified by the user
        const attemptLimit = action.context.getSafe(context_entries_1.KeysHttp.httpRetryCount) + 1;
        const retryDelayFallback = action.context.get(context_entries_1.KeysHttp.httpRetryDelayFallback) ?? 0;
        const retryDelayLimit = action.context.get(context_entries_1.KeysHttp.httpRetryDelayLimit);
        const retryStatusCodes = action.context.get(context_entries_1.KeysHttp.httpRetryStatusCodes);
        for (let attempt = 1; attempt <= attemptLimit; attempt++) {
            const retryDelay = url.host in this.activeDelays ?
                this.activeDelays[url.host].date.getTime() - Date.now() :
                retryDelayFallback;
            if (retryDelayLimit && retryDelay > retryDelayLimit) {
                this.logWarn(action.context, 'Requested delay exceeds the limit', () => ({
                    url: url.href,
                    delay: retryDelay,
                    delayDate: this.activeDelays[url.host].date.toISOString(),
                    delayLimit: retryDelayLimit,
                    currentAttempt: `${attempt} / ${attemptLimit}`,
                }));
                break;
            }
            else if (retryDelay > 0 && attempt > 1) {
                this.logDebug(action.context, 'Delaying request', () => ({
                    url: url.href,
                    delay: retryDelay,
                    currentAttempt: `${attempt} / ${attemptLimit}`,
                }));
                await ActorHttpRetry.sleep(retryDelay);
            }
            const response = await this.mediatorHttp.mediate({
                ...action,
                context: action.context.set(ActorHttpRetry.keyWrapped, true),
            });
            if (response.ok) {
                return response;
            }
            if (retryStatusCodes && retryStatusCodes.includes(response.status)) {
                this.logDebug(action.context, 'Status code in force retry list, forcing retry', () => ({
                    url: url.href,
                    status: response.status,
                    statusText: response.statusText,
                    currentAttempt: `${attempt} / ${attemptLimit}`,
                }));
                continue;
            }
            if (response.status === 504) {
                // When the server is acting as a proxy and the source times it, it makes sense to retry
                // with the hope that the source server replies within the timeout
                this.logDebug(action.context, 'Received proxy timeout', () => ({
                    url: url.href,
                    status: response.status,
                    statusText: response.statusText,
                    currentAttempt: `${attempt} / ${attemptLimit}`,
                }));
                continue;
            }
            if (response.status === 429 || response.status === 503) {
                // When the server reports temporary unavailability, it can also provide a Retry-Header value.
                const retryAfterHeader = response.headers.get('retry-after');
                if (retryAfterHeader) {
                    const retryAfter = ActorHttpRetry.parseRetryAfterHeader(retryAfterHeader);
                    if (retryAfter) {
                        // Clear any previous clean-up timers for the host
                        if (url.host in this.activeDelays) {
                            clearTimeout(this.activeDelays[url.host].timeout);
                        }
                        // Record the current host-specific active delay, and add a clean-up timer for this new delay
                        this.activeDelays[url.host] = {
                            date: retryAfter,
                            timeout: setTimeout(() => delete this.activeDelays[url.host], Date.now() - retryAfter.getTime()),
                        };
                    }
                    else {
                        this.logDebug(action.context, 'Invalid Retry-After header value from server', () => ({
                            url: url.href,
                            status: response.status,
                            statusText: response.statusText,
                            retryAfterHeader,
                            currentAttempt: `${attempt} / ${attemptLimit}`,
                        }));
                    }
                }
                this.logDebug(action.context, 'Server temporarily unavailable', () => ({
                    url: url.href,
                    status: response.status,
                    statusText: response.statusText,
                    currentAttempt: `${attempt} / ${attemptLimit}`,
                }));
                continue;
            }
            if (response.status >= 400 && response.status < 500) {
                // When the server reports a missing document, insufficient permissions, bad request or other error
                // in the 400 range except for the rate limit, it makes sense to skip further retries.
                // Sending the same, potentially invalid request for missing or inaccessible resources is unlikely to succeed.
                this.logDebug(action.context, 'Server reported client-side error', () => ({
                    url: url.href,
                    status: response.status,
                    statusText: response.statusText,
                    currentAttempt: `${attempt} / ${attemptLimit}`,
                }));
                break;
            }
            if (response.status >= 500 && response.status < 600) {
                // When a server-side error is encountered, it will likely not be fixable client-side,
                // and sending the same request again will most likely result in the same server-side failure.
                // Therefore, it makes sense not to retry on such errors at all.
                this.logDebug(action.context, 'Server-side error encountered, terminating', () => ({
                    url: url.href,
                    status: response.status,
                    statusText: response.statusText,
                    currentAttempt: `${attempt} / ${attemptLimit}`,
                }));
                break;
            }
            // Error codes not specifically handled should be logged as-is for user to notice
            this.logDebug(action.context, 'Request failed', () => ({
                url: url.href,
                status: response.status,
                statusText: response.statusText,
                currentAttempt: `${attempt} / ${attemptLimit}`,
            }));
        }
        throw new Error(`Request failed: ${url.href}`);
    }
    /**
     * Sleeps for the specified amount of time, using a timeout
     * @param {number} ms The amount of milliseconds to sleep
     */
    static async sleep(ms) {
        if (ms > 0) {
            await new Promise(resolve => setTimeout(resolve, ms));
        }
    }
    /**
     * Parses a Retry-After HTTP header value following the specification:
     * https://httpwg.org/specs/rfc9110.html#field.retry-after
     * @param {string} retryAfter The raw header value as string
     * @returns The parsed Date object, or undefined in case of invalid header value
     */
    static parseRetryAfterHeader(retryAfter) {
        if (ActorHttpRetry.numberRegex.test(retryAfter)) {
            return new Date(Date.now() + Number.parseInt(retryAfter, 10) * 1_000);
        }
        if (ActorHttpRetry.dateRegex.test(retryAfter)) {
            return new Date(retryAfter);
        }
    }
    /**
     * Handles HTTP cache invalidation events.
     * @param {IActionHttpInvalidate} action The invalidation action
     */
    handleHttpInvalidateEvent(action) {
        const invalidatedHost = action.url ? new URL(action.url).host : undefined;
        for (const host of Object.keys(this.activeDelays)) {
            if (!invalidatedHost || host === invalidatedHost) {
                clearTimeout(this.activeDelays[host].timeout);
                delete this.activeDelays[host];
            }
        }
    }
}
exports.ActorHttpRetry = ActorHttpRetry;
// Expression that matches dates expressed in the HTTP Date header format
// eslint-disable-next-line max-len
ActorHttpRetry.dateRegex = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), [0-9]{2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) [0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2} GMT$/u;
// Expression that matches numeric values of Retry-After
ActorHttpRetry.numberRegex = /^[0-9]+$/u;
// Context key to indicate that the actor has already wrapped the given request
ActorHttpRetry.keyWrapped = new core_1.ActionContextKey('urn:comunica:actor-http-retry#wrapped');
//# sourceMappingURL=ActorHttpRetry.js.map