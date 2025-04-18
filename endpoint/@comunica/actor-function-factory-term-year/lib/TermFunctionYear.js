"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionYear = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-year
 */
class TermFunctionYear extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.YEAR,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.YEAR)
                .onDateTime1(() => date => (0, utils_expression_evaluator_1.integer)(date.typedValue.year))
                .set([utils_expression_evaluator_1.TypeURL.XSD_DATE], () => ([date]) => (0, utils_expression_evaluator_1.integer)(date.typedValue.year))
                .collect(),
        });
    }
}
exports.TermFunctionYear = TermFunctionYear;
//# sourceMappingURL=TermFunctionYear.js.map