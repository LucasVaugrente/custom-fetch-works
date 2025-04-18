"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorBindingsAggregatorFactoryMin = void 0;
const bus_bindings_aggregator_factory_1 = require("@comunica/bus-bindings-aggregator-factory");
const core_1 = require("@comunica/core");
const MinAggregator_1 = require("./MinAggregator");
/**
 * A comunica Min Expression Evaluator Aggregate Actor.
 */
class ActorBindingsAggregatorFactoryMin extends bus_bindings_aggregator_factory_1.ActorBindingsAggregatorFactory {
    constructor(args) {
        super(args);
        this.mediatorTermComparatorFactory = args.mediatorTermComparatorFactory;
    }
    async test(action) {
        if (action.expr.aggregator !== 'min') {
            return (0, core_1.failTest)('This actor only supports the \'min\' aggregator.');
        }
        return (0, core_1.passTestVoid)();
    }
    async run({ context, expr }) {
        return new MinAggregator_1.MinAggregator(await this.mediatorExpressionEvaluatorFactory.mediate({ algExpr: expr.expression, context }), expr.distinct, await this.mediatorTermComparatorFactory.mediate({ context }));
    }
}
exports.ActorBindingsAggregatorFactoryMin = ActorBindingsAggregatorFactoryMin;
//# sourceMappingURL=ActorBindingsAggregatorFactoryMin.js.map