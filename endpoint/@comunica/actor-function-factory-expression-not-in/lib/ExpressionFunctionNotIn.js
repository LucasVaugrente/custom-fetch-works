"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionFunctionNotIn = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-not-in
 * This function doesn't require type promotion or subtype-substitution, everything works on TermExpression
 */
class ExpressionFunctionNotIn extends bus_function_factory_1.ExpressionFunctionBase {
    constructor(inFunction) {
        super({
            arity: Number.POSITIVE_INFINITY,
            operator: utils_expression_evaluator_1.SparqlOperator.NOT_IN,
            apply: async (context) => {
                const isIn = await this.inFunction.apply(context);
                return (0, utils_expression_evaluator_1.bool)(!isIn.typedValue);
            },
        });
        this.inFunction = inFunction;
    }
    checkArity(args) {
        return args.length > 0;
    }
}
exports.ExpressionFunctionNotIn = ExpressionFunctionNotIn;
//# sourceMappingURL=ExpressionFunctionNotIn.js.map