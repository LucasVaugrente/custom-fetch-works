"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionStrLen = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-strlen
 */
class TermFunctionStrLen extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.STRLEN,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.STRLEN)
                .onStringly1(() => str => (0, utils_expression_evaluator_1.integer)([...str.typedValue].length))
                .collect(),
        });
    }
}
exports.TermFunctionStrLen = TermFunctionStrLen;
//# sourceMappingURL=TermFunctionStrLen.js.map