"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionFunctionSameTerm = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const context_entries_1 = require("@comunica/context-entries");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-sameTerm
 * This function doesn't require type promotion or subtype-substitution, everything works on TermExpression
 */
class ExpressionFunctionSameTerm extends bus_function_factory_1.ExpressionFunctionBase {
    constructor() {
        super({
            arity: 2,
            operator: utils_expression_evaluator_1.SparqlOperator.SAME_TERM,
            apply: async ({ args, mapping, exprEval }) => {
                const dataFactory = exprEval.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
                const [leftExpr, rightExpr] = args.map(arg => exprEval.evaluatorExpressionEvaluation(arg, mapping));
                const [left, right] = await Promise.all([leftExpr, rightExpr]);
                return (0, utils_expression_evaluator_1.bool)(left.toRDF(dataFactory).equals(right.toRDF(dataFactory)));
            },
        });
    }
}
exports.ExpressionFunctionSameTerm = ExpressionFunctionSameTerm;
//# sourceMappingURL=ExpressionFunctionSameTerm.js.map