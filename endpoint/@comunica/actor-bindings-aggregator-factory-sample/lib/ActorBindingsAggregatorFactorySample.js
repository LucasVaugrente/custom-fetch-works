"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorBindingsAggregatorFactorySample = void 0;
const bus_bindings_aggregator_factory_1 = require("@comunica/bus-bindings-aggregator-factory");
const core_1 = require("@comunica/core");
const SampleAggregator_1 = require("./SampleAggregator");
/**
 * A comunica Sample Expression Evaluator Aggregate Actor.
 */
class ActorBindingsAggregatorFactorySample extends bus_bindings_aggregator_factory_1.ActorBindingsAggregatorFactory {
    constructor(args) {
        super(args);
    }
    async test(action) {
        if (action.expr.aggregator !== 'sample') {
            return (0, core_1.failTest)('This actor only supports the \'sample\' aggregator.');
        }
        return (0, core_1.passTestVoid)();
    }
    async run({ context, expr }) {
        return new SampleAggregator_1.SampleAggregator(await this.mediatorExpressionEvaluatorFactory.mediate({ algExpr: expr.expression, context }), expr.distinct);
    }
}
exports.ActorBindingsAggregatorFactorySample = ActorBindingsAggregatorFactorySample;
//# sourceMappingURL=ActorBindingsAggregatorFactorySample.js.map