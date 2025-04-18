"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorDereferenceBase = exports.isHardError = exports.emptyReadable = void 0;
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const readable_stream_1 = require("readable-stream");
function emptyReadable() {
    const data = new readable_stream_1.Readable();
    data.push(null);
    return data;
}
exports.emptyReadable = emptyReadable;
/**
 * Check if hard errors should occur on HTTP or parse errors.
 * @param {IActionContext} context An action context.
 * @return {boolean} If hard errors are enabled.
 */
function isHardError(context) {
    return !context.get(context_entries_1.KeysInitQuery.lenient);
}
exports.isHardError = isHardError;
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
class ActorDereferenceBase extends core_1.Actor {
    constructor(args) {
        super(args);
    }
    /**
     * Handle the given error as a rejection or delegate it to the logger,
     * depending on whether or not hard errors are enabled.
     * @param {I} action An action.
     * @param {Error} error An error that has occurred.
     * @param {N} output Data to add to the output
     */
    async dereferenceErrorHandler(action, error, output) {
        if (isHardError(action.context)) {
            throw error;
        }
        this.logWarn(action.context, error.message);
        return { ...output, data: emptyReadable() };
    }
}
exports.ActorDereferenceBase = ActorDereferenceBase;
//# sourceMappingURL=ActorDereferenceBase.js.map