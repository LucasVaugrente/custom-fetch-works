"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionFunctionCoalesce = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-coalesce
 * This function doesn't require type promotion or subtype-substitution, everything works on TermExpression
 */
class ExpressionFunctionCoalesce extends bus_function_factory_1.ExpressionFunctionBase {
    constructor() {
        super({
            arity: Number.POSITIVE_INFINITY,
            operator: utils_expression_evaluator_1.SparqlOperator.COALESCE,
            apply: async ({ args, mapping, exprEval }) => {
                const errors = [];
                for (const expr of args) {
                    try {
                        return await exprEval.evaluatorExpressionEvaluation(expr, mapping);
                    }
                    catch (error) {
                        errors.push(error);
                    }
                }
                throw new utils_expression_evaluator_1.CoalesceError(errors);
            },
        });
    }
}
exports.ExpressionFunctionCoalesce = ExpressionFunctionCoalesce;
//# sourceMappingURL=ExpressionFunctionCoalesce.js.map