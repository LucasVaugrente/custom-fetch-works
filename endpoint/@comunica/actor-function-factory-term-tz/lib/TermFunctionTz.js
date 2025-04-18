"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionTz = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-tz
 */
class TermFunctionTz extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.TZ,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.TZ)
                .onDateTime1(() => date => (0, utils_expression_evaluator_1.string)((0, utils_expression_evaluator_1.extractRawTimeZone)(date.str())))
                .copy({ from: [utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME], to: [utils_expression_evaluator_1.TypeURL.XSD_DATE] })
                .copy({ from: [utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME], to: [utils_expression_evaluator_1.TypeURL.XSD_TIME] })
                .collect(),
        });
    }
}
exports.TermFunctionTz = TermFunctionTz;
//# sourceMappingURL=TermFunctionTz.js.map