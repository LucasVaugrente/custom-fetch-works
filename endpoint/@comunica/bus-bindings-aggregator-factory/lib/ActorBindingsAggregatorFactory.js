"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorBindingsAggregatorFactory = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for creating Binding-Aggregator-factories.
 *
 * Actor types:
 * * Input:  IActionBindingsAggregatorFactory:      A SPARQL expression and a factory for an expression evaluator.
 * * Test:   <none>
 * * Output: IActorBindingsAggregatorFactoryOutput: An aggregator of RDF bindings.
 *
 * @see IActionBindingsAggregatorFactory
 * @see IActorBindingsAggregatorFactoryOutput
 */
class ActorBindingsAggregatorFactory extends core_1.Actor {
    /* eslint-disable max-len */
    /**
     * @param args -
     *  \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *  \ @defaultNested {Creation of Aggregator failed: none of the configured actors were able to handle ${action.expr.aggregator}} busFailMessage
     */
    /* eslint-enable max-len */
    constructor(args) {
        super(args);
        this.mediatorExpressionEvaluatorFactory = args.mediatorExpressionEvaluatorFactory;
    }
}
exports.ActorBindingsAggregatorFactory = ActorBindingsAggregatorFactory;
//# sourceMappingURL=ActorBindingsAggregatorFactory.js.map