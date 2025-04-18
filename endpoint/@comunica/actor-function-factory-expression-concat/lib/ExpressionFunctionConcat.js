"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionFunctionConcat = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const context_entries_1 = require("@comunica/context-entries");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-concat
 */
class ExpressionFunctionConcat extends bus_function_factory_1.ExpressionFunctionBase {
    constructor() {
        super({
            arity: Number.POSITIVE_INFINITY,
            operator: utils_expression_evaluator_1.SparqlOperator.CONCAT,
            apply: async (context) => {
                const { args, mapping, exprEval } = context;
                const pLits = args
                    .map(async (expr) => exprEval.evaluatorExpressionEvaluation(expr, mapping))
                    .map(async (pTerm) => {
                    const operation = ExpressionFunctionConcat.concatTree.search([await pTerm], exprEval.context.getSafe(context_entries_1.KeysExpressionEvaluator.superTypeProvider), exprEval.context.getSafe(context_entries_1.KeysInitQuery.functionArgumentsCache));
                    if (!operation) {
                        throw new utils_expression_evaluator_1.InvalidArgumentTypes(args, utils_expression_evaluator_1.SparqlOperator.CONCAT);
                    }
                    return operation(exprEval)([await pTerm]);
                });
                const lits = await Promise.all(pLits);
                const strings = lits.map(lit => lit.typedValue);
                const joined = strings.join('');
                const lang = ExpressionFunctionConcat.langAllEqual(lits) ? lits[0].language : undefined;
                return lang ? (0, utils_expression_evaluator_1.langString)(joined, lang) : (0, utils_expression_evaluator_1.string)(joined);
            },
        });
    }
    static langAllEqual(lits) {
        return lits.length > 0 && lits.every(lit => lit.language === lits[0].language);
    }
}
exports.ExpressionFunctionConcat = ExpressionFunctionConcat;
/**
 * This OverloadTree with the constant function will handle both type promotion and subtype-substitution
 */
ExpressionFunctionConcat.concatTree = (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.CONCAT).onStringly1(() => expr => expr)
    .collect();
//# sourceMappingURL=ExpressionFunctionConcat.js.map