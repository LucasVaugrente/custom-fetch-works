"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediatorFunctionFactory = exports.ActorFunctionFactory = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for function factory events.
 *
 * Actor types:
 * * Input:  IActionFunctions: A request to receive a function implementation for a given function name
 * and potentially the function arguments.
 * * Test:   <none>
 * * Output: IActorFunctionsOutput: A function implementation.
 *
 * @see IActionFunctionFactory
 * @see IActorFunctionFactoryOutput
 */
class ActorFunctionFactory extends core_1.Actor {
    /* eslint-disable max-len */
    /**
     * @param args -
     * \ @defaultNested {<default_bus> a <cbff:components/BusFunctionFactory.jsonld#BusFunctionFactory>} bus
     * \ @defaultNested {Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}} busFailMessage
     */
    /* eslint-enable max-len */
    constructor(args) {
        super(args);
    }
}
exports.ActorFunctionFactory = ActorFunctionFactory;
class MediatorFunctionFactory extends core_1.Mediator {
}
exports.MediatorFunctionFactory = MediatorFunctionFactory;
//# sourceMappingURL=ActorFunctionFactory.js.map