"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionFunctionIf = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-if
 * This function doesn't require type promotion or subtype-substitution, everything works on TermExpression
 */
class ExpressionFunctionIf extends bus_function_factory_1.ExpressionFunctionBase {
    constructor() {
        super({
            arity: 3,
            operator: utils_expression_evaluator_1.SparqlOperator.IF,
            apply: async ({ args, mapping, exprEval }) => {
                const valFirst = await exprEval.evaluatorExpressionEvaluation(args[0], mapping);
                const ebv = valFirst.coerceEBV();
                return ebv ?
                    exprEval.evaluatorExpressionEvaluation(args[1], mapping) :
                    exprEval.evaluatorExpressionEvaluation(args[2], mapping);
            },
        });
    }
}
exports.ExpressionFunctionIf = ExpressionFunctionIf;
//# sourceMappingURL=ExpressionFunctionIf.js.map