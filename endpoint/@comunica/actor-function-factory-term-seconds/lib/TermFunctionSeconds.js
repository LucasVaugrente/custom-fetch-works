"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionSeconds = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-seconds
 */
class TermFunctionSeconds extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.SECONDS,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.SECONDS)
                .onDateTime1(() => date => (0, utils_expression_evaluator_1.decimal)(date.typedValue.seconds))
                .set([utils_expression_evaluator_1.TypeURL.XSD_TIME], () => ([time]) => (0, utils_expression_evaluator_1.integer)(time.typedValue.seconds))
                .collect(),
        });
    }
}
exports.TermFunctionSeconds = TermFunctionSeconds;
//# sourceMappingURL=TermFunctionSeconds.js.map