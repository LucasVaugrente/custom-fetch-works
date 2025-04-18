"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorTermComparatorFactoryExpressionEvaluator = void 0;
const InternalEvaluator_1 = require("@comunica/actor-expression-evaluator-factory-default/lib/InternalEvaluator");
const bus_term_comparator_factory_1 = require("@comunica/bus-term-comparator-factory");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const Eval = require("@comunica/utils-expression-evaluator");
const TermComparatorExpressionEvaluator_1 = require("./TermComparatorExpressionEvaluator");
/**
 * A comunica Expression Evaluator Based Term Comparator Factory Actor.
 */
class ActorTermComparatorFactoryExpressionEvaluator extends bus_term_comparator_factory_1.ActorTermComparatorFactory {
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    /**
     * Context item superTypeProvider can be expected here
     * @param context IActionTermComparatorFactory
     * @param context.context IActionContext
     */
    async run({ context }) {
        context = Eval.prepareEvaluatorActionContext(context);
        return new TermComparatorExpressionEvaluator_1.TermComparatorExpressionEvaluator(new InternalEvaluator_1.InternalEvaluator(context, this.mediatorFunctionFactory, this.mediatorQueryOperation, await utils_bindings_factory_1.BindingsFactory.create(this.mediatorMergeBindingsContext, context, context.getSafe(context_entries_1.KeysInitQuery.dataFactory))), await this.mediatorFunctionFactory
            .mediate({ functionName: Eval.SparqlOperator.EQUAL, context, requireTermExpression: true }), await this.mediatorFunctionFactory
            .mediate({ functionName: Eval.SparqlOperator.LT, context, requireTermExpression: true }));
    }
}
exports.ActorTermComparatorFactoryExpressionEvaluator = ActorTermComparatorFactoryExpressionEvaluator;
//# sourceMappingURL=ActorTermComparatorFactoryExpressionEvaluator.js.map