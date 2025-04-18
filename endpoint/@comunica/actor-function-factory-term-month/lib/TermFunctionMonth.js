"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionMonth = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-month
 */
class TermFunctionMonth extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.MONTH,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.MONTH)
                .onDateTime1(() => date => (0, utils_expression_evaluator_1.integer)(date.typedValue.month))
                .set([utils_expression_evaluator_1.TypeURL.XSD_DATE], () => ([date]) => (0, utils_expression_evaluator_1.integer)(date.typedValue.month))
                .collect(),
        });
    }
}
exports.TermFunctionMonth = TermFunctionMonth;
//# sourceMappingURL=TermFunctionMonth.js.map