"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperation = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for query-operation events.
 *
 * Actor types:
 * * Input:  IActionQueryOperation:      A SPARQL Algebra operation.
 * * Test:   <none>
 * * Output: IActorQueryOperationOutput: A bindings stream.
 *
 * @see IActionQueryOperation
 * @see IQueryOperationResult
 */
class ActorQueryOperation extends core_1.Actor {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cbqo:components/BusQueryOperation.jsonld#BusQueryOperation>} bus
     *   \ @defaultNested {Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}} busFailMessage
     */
    /* eslint-enable max-len */
    constructor(args) {
        super(args);
    }
}
exports.ActorQueryOperation = ActorQueryOperation;
//# sourceMappingURL=ActorQueryOperation.js.map