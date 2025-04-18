"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionFunctionLogicalAnd = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-logical-and
 * This function doesn't require type promotion or subtype-substitution, everything works on TermExpression
 */
class ExpressionFunctionLogicalAnd extends bus_function_factory_1.ExpressionFunctionBase {
    constructor() {
        super({
            arity: 2,
            operator: utils_expression_evaluator_1.SparqlOperator.LOGICAL_AND,
            apply: async ({ args, mapping, exprEval }) => {
                const [leftExpr, rightExpr] = args;
                try {
                    const leftTerm = await exprEval.evaluatorExpressionEvaluation(leftExpr, mapping);
                    const left = leftTerm.coerceEBV();
                    if (!left) {
                        return (0, utils_expression_evaluator_1.bool)(false);
                    }
                    const rightTerm = await exprEval.evaluatorExpressionEvaluation(rightExpr, mapping);
                    const right = rightTerm.coerceEBV();
                    return (0, utils_expression_evaluator_1.bool)(right);
                }
                catch (error) {
                    const rightErrorTerm = await exprEval.evaluatorExpressionEvaluation(rightExpr, mapping);
                    const rightError = rightErrorTerm.coerceEBV();
                    if (rightError) {
                        throw error;
                    }
                    return (0, utils_expression_evaluator_1.bool)(false);
                }
            },
        });
    }
}
exports.ExpressionFunctionLogicalAnd = ExpressionFunctionLogicalAnd;
//# sourceMappingURL=ExpressionFunctionLogicalAnd.js.map