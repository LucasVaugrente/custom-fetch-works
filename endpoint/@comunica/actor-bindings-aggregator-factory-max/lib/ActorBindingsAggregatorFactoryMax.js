"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorBindingsAggregatorFactoryMax = void 0;
const bus_bindings_aggregator_factory_1 = require("@comunica/bus-bindings-aggregator-factory");
const core_1 = require("@comunica/core");
const MaxAggregator_1 = require("./MaxAggregator");
/**
 * A comunica Max Expression Evaluator Aggregate Actor.
 */
class ActorBindingsAggregatorFactoryMax extends bus_bindings_aggregator_factory_1.ActorBindingsAggregatorFactory {
    constructor(args) {
        super(args);
        this.mediatorTermComparatorFactory = args.mediatorTermComparatorFactory;
    }
    async test(action) {
        if (action.expr.aggregator !== 'max') {
            return (0, core_1.failTest)('This actor only supports the \'max\' aggregator.');
        }
        return (0, core_1.passTestVoid)();
    }
    async run({ expr, context }) {
        return new MaxAggregator_1.MaxAggregator(await this.mediatorExpressionEvaluatorFactory.mediate({ algExpr: expr.expression, context }), expr.distinct, await this.mediatorTermComparatorFactory.mediate({ context }));
    }
}
exports.ActorBindingsAggregatorFactoryMax = ActorBindingsAggregatorFactoryMax;
//# sourceMappingURL=ActorBindingsAggregatorFactoryMax.js.map