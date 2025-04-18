"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionNow = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const context_entries_1 = require("@comunica/context-entries");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-now
 */
class TermFunctionNow extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 0,
            operator: utils_expression_evaluator_1.SparqlOperator.NOW,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.NOW).set([], exprEval => () => new utils_expression_evaluator_1.DateTimeLiteral((0, utils_expression_evaluator_1.toDateTimeRepresentation)({
                date: exprEval.context.getSafe(context_entries_1.KeysInitQuery.queryTimestamp),
                timeZone: exprEval.context.getSafe(context_entries_1.KeysExpressionEvaluator.defaultTimeZone),
            }))).collect(),
        });
    }
}
exports.TermFunctionNow = TermFunctionNow;
//# sourceMappingURL=TermFunctionNow.js.map