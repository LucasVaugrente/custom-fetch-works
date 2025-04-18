"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorExpressionEvaluatorFactory = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for utils-expression-evaluator-factory events.
 *
 * Actor types:
 * * Input:  IActionExpressionEvaluatorFactory: The Query Operation and Function factory mediators.
 * * Test:   <none>
 * * Output: IActorExpressionEvaluatorFactoryOutput: TODO: fill in.
 *
 * @see IActionExpressionEvaluatorFactory
 * @see IActorExpressionEvaluatorFactoryOutput
 */
class ActorExpressionEvaluatorFactory extends core_1.Actor {
    /**
     * @param args -
     * \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     * \ @defaultNested {Creation of Expression Evaluator failed} busFailMessage
     */
    constructor(args) {
        super(args);
        this.mediatorQueryOperation = args.mediatorQueryOperation;
        this.mediatorFunctionFactory = args.mediatorFunctionFactory;
        this.mediatorMergeBindingsContext = args.mediatorMergeBindingsContext;
    }
}
exports.ActorExpressionEvaluatorFactory = ActorExpressionEvaluatorFactory;
//# sourceMappingURL=ActorExpressionEvaluatorFactory.js.map