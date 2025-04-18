"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionFunctionBound = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const context_entries_1 = require("@comunica/context-entries");
const types_1 = require("@comunica/types");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-bound
 * This function doesn't require type promotion or subtype-substitution, everything works on TermExpression
 */
class ExpressionFunctionBound extends bus_function_factory_1.ExpressionFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.BOUND,
            apply: async ({ args, mapping, exprEval }) => {
                const variable = args[0];
                if (variable.expressionType !== types_1.ExpressionType.Variable) {
                    throw new utils_expression_evaluator_1.InvalidArgumentTypes(args, utils_expression_evaluator_1.SparqlOperator.BOUND);
                }
                const val = mapping.has((0, utils_expression_evaluator_1.expressionToVar)(exprEval.context.getSafe(context_entries_1.KeysInitQuery.dataFactory), variable));
                return (0, utils_expression_evaluator_1.bool)(val);
            },
        });
    }
}
exports.ExpressionFunctionBound = ExpressionFunctionBound;
//# sourceMappingURL=ExpressionFunctionBound.js.map