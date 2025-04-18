"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorBindingsAggregatorFactoryAverage = void 0;
const bus_bindings_aggregator_factory_1 = require("@comunica/bus-bindings-aggregator-factory");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const AverageAggregator_1 = require("./AverageAggregator");
/**
 * A comunica Average Expression Evaluator Aggregate Actor.
 */
class ActorBindingsAggregatorFactoryAverage extends bus_bindings_aggregator_factory_1.ActorBindingsAggregatorFactory {
    constructor(args) {
        super(args);
        this.mediatorFunctionFactory = args.mediatorFunctionFactory;
    }
    async test(action) {
        if (action.expr.aggregator !== 'avg') {
            return (0, core_1.failTest)('This actor only supports the \'avg\' aggregator.');
        }
        return (0, core_1.passTestVoid)();
    }
    async run({ context, expr }) {
        return new AverageAggregator_1.AverageAggregator(await this.mediatorExpressionEvaluatorFactory.mediate({ algExpr: expr.expression, context }), expr.distinct, context.getSafe(context_entries_1.KeysInitQuery.dataFactory), await this.mediatorFunctionFactory.mediate({
            functionName: utils_expression_evaluator_1.SparqlOperator.ADDITION,
            context,
            requireTermExpression: true,
        }), await this.mediatorFunctionFactory.mediate({
            functionName: utils_expression_evaluator_1.SparqlOperator.DIVISION,
            context,
            requireTermExpression: true,
        }));
    }
}
exports.ActorBindingsAggregatorFactoryAverage = ActorBindingsAggregatorFactoryAverage;
//# sourceMappingURL=ActorBindingsAggregatorFactoryAverage.js.map