"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorBindingsAggregatorFactoryWildcardCount = void 0;
const bus_bindings_aggregator_factory_1 = require("@comunica/bus-bindings-aggregator-factory");
const core_1 = require("@comunica/core");
const WildcardCountAggregator_1 = require("./WildcardCountAggregator");
/**
 * A comunica Wildcard Count Expression Evaluator Aggregate Actor.
 */
class ActorBindingsAggregatorFactoryWildcardCount extends bus_bindings_aggregator_factory_1.ActorBindingsAggregatorFactory {
    constructor(args) {
        super(args);
    }
    async test(action) {
        if (action.expr.aggregator !== 'count' || action.expr.expression.expressionType !== 'wildcard') {
            return (0, core_1.failTest)('This actor only supports the \'count\' aggregator with wildcard.');
        }
        return (0, core_1.passTestVoid)();
    }
    async run({ context, expr }) {
        return new WildcardCountAggregator_1.WildcardCountAggregator(await this.mediatorExpressionEvaluatorFactory.mediate({ algExpr: expr.expression, context }), expr.distinct);
    }
}
exports.ActorBindingsAggregatorFactoryWildcardCount = ActorBindingsAggregatorFactoryWildcardCount;
//# sourceMappingURL=ActorBindingsAggregatorFactoryWildcardCount.js.map