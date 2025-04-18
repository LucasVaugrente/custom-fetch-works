"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryProcess = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for query-process events.
 *
 * Actor types:
 * * Input:  IActionQueryProcess:      The input query to process.
 * * Test:   <none>
 * * Output: IActorQueryProcessOutput: Output of the query processing.
 *
 * @see IActionQueryProcess
 * @see IActorQueryProcessOutput
 */
class ActorQueryProcess extends core_1.Actor {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Query processing failed: none of the configured actor were process to the query "${action.query}"} busFailMessage
     */
    /* eslint-enable max-len */
    constructor(args) {
        super(args);
    }
}
exports.ActorQueryProcess = ActorQueryProcess;
//# sourceMappingURL=ActorQueryProcess.js.map