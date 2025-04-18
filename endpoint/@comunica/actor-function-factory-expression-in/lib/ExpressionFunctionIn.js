"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionFunctionIn = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-in
 * This function doesn't require type promotion or subtype-substitution, everything works on TermExpression
 */
class ExpressionFunctionIn extends bus_function_factory_1.ExpressionFunctionBase {
    constructor(equalityFunction) {
        super({
            arity: Number.POSITIVE_INFINITY,
            operator: utils_expression_evaluator_1.SparqlOperator.IN,
            apply: async (context) => {
                const { args, mapping, exprEval } = context;
                const [leftExpr, ...remaining] = args;
                const left = await exprEval.evaluatorExpressionEvaluation(leftExpr, mapping);
                return await this.inRecursive(left, { ...context, args: remaining }, []);
            },
        });
        this.equalityFunction = equalityFunction;
    }
    checkArity(args) {
        return args.length > 0;
    }
    async inRecursive(needle, context, results) {
        const { args, mapping, exprEval } = context;
        if (args.length === 0) {
            const noErrors = results.every(val => !val);
            return noErrors ? (0, utils_expression_evaluator_1.bool)(false) : Promise.reject(new utils_expression_evaluator_1.InError(results));
        }
        try {
            // We know this will not be undefined because we check args.length === 0
            const nextExpression = args.shift();
            const next = await exprEval.evaluatorExpressionEvaluation(nextExpression, mapping);
            if (this.equalityFunction.applyOnTerms([needle, next], exprEval).typedValue) {
                return (0, utils_expression_evaluator_1.bool)(true);
            }
            return this.inRecursive(needle, context, [...results, false]);
        }
        catch (error) {
            return this.inRecursive(needle, context, [...results, error]);
        }
    }
}
exports.ExpressionFunctionIn = ExpressionFunctionIn;
//# sourceMappingURL=ExpressionFunctionIn.js.map