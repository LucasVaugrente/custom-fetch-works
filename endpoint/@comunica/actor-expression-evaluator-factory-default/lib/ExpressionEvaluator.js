"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionEvaluator = void 0;
const context_entries_1 = require("@comunica/context-entries");
const InternalEvaluator_1 = require("./InternalEvaluator");
class ExpressionEvaluator {
    constructor(context, expr, mediatorFunctionFactory, mediatorQueryOperation, bindingsFactory) {
        this.context = context;
        this.expr = expr;
        this.mediatorFunctionFactory = mediatorFunctionFactory;
        this.mediatorQueryOperation = mediatorQueryOperation;
        this.bindingsFactory = bindingsFactory;
        this.internalEvaluator =
            new InternalEvaluator_1.InternalEvaluator(context, mediatorFunctionFactory, mediatorQueryOperation, bindingsFactory);
    }
    async evaluate(mapping) {
        const result = await this.internalEvaluator.evaluatorExpressionEvaluation(this.expr, mapping);
        return result.toRDF(this.context.getSafe(context_entries_1.KeysInitQuery.dataFactory));
    }
    async evaluateAsEBV(mapping) {
        const result = await this.internalEvaluator.evaluatorExpressionEvaluation(this.expr, mapping);
        return result.coerceEBV();
    }
    evaluateAsEvaluatorExpression(mapping) {
        return this.evaluatorExpressionEvaluation(this.expr, mapping);
    }
    evaluatorExpressionEvaluation(expr, mapping) {
        return this.internalEvaluator.evaluatorExpressionEvaluation(expr, mapping);
    }
}
exports.ExpressionEvaluator = ExpressionEvaluator;
//# sourceMappingURL=ExpressionEvaluator.js.map