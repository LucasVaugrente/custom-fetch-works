"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorBindingsAggregatorFactorySum = void 0;
const bus_bindings_aggregator_factory_1 = require("@comunica/bus-bindings-aggregator-factory");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const SumAggregator_1 = require("./SumAggregator");
/**
 * A comunica Sum Expression Evaluator Aggregate Actor.
 */
class ActorBindingsAggregatorFactorySum extends bus_bindings_aggregator_factory_1.ActorBindingsAggregatorFactory {
    constructor(args) {
        super(args);
        this.mediatorFunctionFactory = args.mediatorFunctionFactory;
    }
    async test(action) {
        if (action.expr.aggregator !== 'sum') {
            return (0, core_1.failTest)('This actor only supports the \'sum\' aggregator.');
        }
        return (0, core_1.passTestVoid)();
    }
    async run({ expr, context }) {
        return new SumAggregator_1.SumAggregator(await this.mediatorExpressionEvaluatorFactory.mediate({ algExpr: expr.expression, context }), expr.distinct, context.getSafe(context_entries_1.KeysInitQuery.dataFactory), await this.mediatorFunctionFactory.mediate({
            functionName: utils_expression_evaluator_1.SparqlOperator.ADDITION,
            context,
            requireTermExpression: true,
        }));
    }
}
exports.ActorBindingsAggregatorFactorySum = ActorBindingsAggregatorFactorySum;
//# sourceMappingURL=ActorBindingsAggregatorFactorySum.js.map