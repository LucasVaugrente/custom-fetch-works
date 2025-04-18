"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionAbs = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-abs
 */
class TermFunctionAbs extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.ABS,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.ABS)
                .numericConverter(() => num => Math.abs(num))
                .collect(),
        });
    }
}
exports.TermFunctionAbs = TermFunctionAbs;
//# sourceMappingURL=TermFunctionAbs.js.map