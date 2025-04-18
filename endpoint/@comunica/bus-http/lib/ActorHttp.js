"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorHttp = void 0;
const core_1 = require("@comunica/core");
const readable_from_web_1 = require("readable-from-web");
const isStream = require('is-stream');
const toWebReadableStream = require('readable-stream-node-to-web');
/**
 * A base actor for listening to HTTP events.
 *
 * Actor types:
 * * Input:  IActionHttp:      The HTTP request.
 * * Test:   IActorHttpTest:   An estimate for the response time.
 * * Output: IActorHttpOutput: The HTTP response.
 *
 * @see IActionHttp
 * @see IActorHttpTest
 * @see IActorHttpOutput
 */
class ActorHttp extends core_1.Actor {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {HTTP request failed: none of the configured actors were able to handle ${action.input}} busFailMessage
     */
    /* eslint-enable max-len */
    constructor(args) {
        super(args);
    }
    /**
     * Converts WhatWG streams to Node streams if required.
     * Returns the input in case the stream already is a Node stream.
     * @param {ReadableStream} body
     * @returns {NodeJS.ReadableStream} A node stream.
     */
    static toNodeReadable(body) {
        return isStream(body) || body === null ?
            body :
            (0, readable_from_web_1.readableFromWeb)(body);
    }
    /**
     * Converts Node streams to WhatWG streams.
     * @param {NodeJS.ReadableStream} body
     * @returns {ReadableStream} A web stream.
     */
    static toWebReadableStream(body) {
        return toWebReadableStream(body);
    }
    /**
     * Convert the given headers object into a raw hash.
     * @param headers A headers object.
     */
    static headersToHash(headers) {
        const hash = {};
        // eslint-disable-next-line unicorn/no-array-for-each
        headers.forEach((value, key) => {
            hash[key] = value;
        });
        return hash;
    }
    /**
     * Extract the requested URL from the action input.
     * @param {RequestInfo | URL} input The request input.
     * @returns {URL} The extracted URL.
     */
    static getInputUrl(input) {
        return new URL(input instanceof Request ? input.url : input);
    }
    /**
     * Creates an appropriate User-Agent header string for Node.js or other environments.
     * Within browsers, returns undefined, because the value should not be overridden due to potential CORS issues.
     */
    static createUserAgent(actorName, actorVersion) {
        if (!ActorHttp.isBrowser()) {
            const versions = [
                `Comunica/${actorVersion.split('.')[0]}.0`,
                `${actorName}/${actorVersion}`,
            ];
            if (typeof globalThis.navigator === 'object' && typeof globalThis.navigator.userAgent === 'string') {
                // Most runtimes like Node.js 21+, Deno and Bun implement navigator.userAgent
                versions.push(globalThis.navigator.userAgent);
            }
            else if (typeof globalThis.process === 'object' &&
                typeof globalThis.process.versions === 'object' &&
                typeof globalThis.process.versions.node === 'string') {
                // TODO: remove this entire 'else if' when support for Node.js 20 is dropped, this only exists for that one
                versions.push(`Node.js/${globalThis.process.versions.node.split('.')[0]}`);
            }
            if (typeof globalThis.process === 'object' &&
                typeof globalThis.process.platform === 'string' &&
                typeof globalThis.process.arch === 'string') {
                versions.splice(1, 0, `(${globalThis.process.platform}; ${globalThis.process.arch})`);
            }
            return versions.join(' ');
        }
    }
    /**
     * Attempts to determine whether the current environment is a browser or not.
     * @returns {boolean} True for browsers and web workers, false for other runtimes.
     */
    static isBrowser() {
        return (
        // The window global and the document are available in browsers, but not in web workers
        // https://developer.mozilla.org/en-US/docs/Glossary/Global_object
        (typeof globalThis.window === 'object' && typeof globalThis.window.document === 'object') ||
            // The importScripts function is only available in Web Workers
            // https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts
            (typeof globalThis.importScripts === 'function'));
    }
}
exports.ActorHttp = ActorHttp;
//# sourceMappingURL=ActorHttp.js.map