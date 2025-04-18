"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorBindingsAggregatorFactoryCount = void 0;
const bus_bindings_aggregator_factory_1 = require("@comunica/bus-bindings-aggregator-factory");
const core_1 = require("@comunica/core");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
const CountAggregator_1 = require("./CountAggregator");
/**
 * A comunica Count Expression Evaluator Aggregate Actor.
 */
class ActorBindingsAggregatorFactoryCount extends bus_bindings_aggregator_factory_1.ActorBindingsAggregatorFactory {
    constructor(args) {
        super(args);
    }
    async test(action) {
        if (action.expr.aggregator !== 'count' ||
            action.expr.expression.expressionType === sparqlalgebrajs_1.Algebra.expressionTypes.WILDCARD) {
            return (0, core_1.failTest)('This actor only supports the \'count\' aggregator without wildcard.');
        }
        return (0, core_1.passTestVoid)();
    }
    async run({ context, expr }) {
        return new CountAggregator_1.CountAggregator(await this.mediatorExpressionEvaluatorFactory.mediate({ algExpr: expr.expression, context }), expr.distinct);
    }
}
exports.ActorBindingsAggregatorFactoryCount = ActorBindingsAggregatorFactoryCount;
//# sourceMappingURL=ActorBindingsAggregatorFactoryCount.js.map