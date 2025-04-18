"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionHours = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-hours
 */
class TermFunctionHours extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.HOURS,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.HOURS)
                .onDateTime1(() => date => (0, utils_expression_evaluator_1.integer)(date.typedValue.hours))
                .set([utils_expression_evaluator_1.TypeURL.XSD_TIME], () => ([time]) => (0, utils_expression_evaluator_1.integer)(time.typedValue.hours))
                .collect(),
        });
    }
}
exports.TermFunctionHours = TermFunctionHours;
//# sourceMappingURL=TermFunctionHours.js.map