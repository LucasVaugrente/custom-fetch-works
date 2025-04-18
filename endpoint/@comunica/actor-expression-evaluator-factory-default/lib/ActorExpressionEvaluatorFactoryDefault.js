"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorExpressionEvaluatorFactoryDefault = void 0;
const bus_expression_evaluator_factory_1 = require("@comunica/bus-expression-evaluator-factory");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const AlgebraTransformer_1 = require("./AlgebraTransformer");
const ExpressionEvaluator_1 = require("./ExpressionEvaluator");
/**
 * A comunica Default Expression Evaluator Factory Actor.
 */
class ActorExpressionEvaluatorFactoryDefault extends bus_expression_evaluator_factory_1.ActorExpressionEvaluatorFactory {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const fullContext = (0, utils_expression_evaluator_1.prepareEvaluatorActionContext)(action.context);
        return new ExpressionEvaluator_1.ExpressionEvaluator(fullContext, await new AlgebraTransformer_1.AlgebraTransformer(fullContext, this.mediatorFunctionFactory).transformAlgebra(action.algExpr), this.mediatorFunctionFactory, this.mediatorQueryOperation, await utils_bindings_factory_1.BindingsFactory.create(this.mediatorMergeBindingsContext, action.context, action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory)));
    }
}
exports.ActorExpressionEvaluatorFactoryDefault = ActorExpressionEvaluatorFactoryDefault;
//# sourceMappingURL=ActorExpressionEvaluatorFactoryDefault.js.map