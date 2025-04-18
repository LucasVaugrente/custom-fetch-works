"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorDereference = void 0;
const ActorDereferenceBase_1 = require("./ActorDereferenceBase");
/**
 * A base actor for dereferencing URLs to (generic) streams.
 *
 * Actor types:
 * * Input:  IActionDereference:      A URL.
 * * Test:   <none>
 * * Output: IActorDereferenceOutput: A Readable stream
 *
 * @see IActionDereference
 * @see IActorDereferenceOutput
 */
class ActorDereference extends ActorDereferenceBase_1.ActorDereferenceBase {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Dereferencing failed: none of the configured actors were able to handle ${action.url}} busFailMessage
     */
    /* eslint-enable max-len */
    constructor(args) {
        super(args);
    }
    /**
     * Handle the given error as a rejection or delegate it to the logger,
     * depending on whether or not hard errors are enabled.
     * @param {IActionDereference} action A dereference action.
     * @param {Error} error An error that has occurred.
     * @param headers Optional HTTP headers to pass.
     * @param {number} requestTime The time it took to request the page in milliseconds.
     * @return {Promise<IActorDereferenceOutput>} A promise that rejects or resolves to an empty output.
     */
    async handleDereferenceErrors(action, error, headers, requestTime = 0) {
        return this.dereferenceErrorHandler(action, error, { url: action.url, exists: false, headers, requestTime });
    }
}
exports.ActorDereference = ActorDereference;
//# sourceMappingURL=ActorDereference.js.map