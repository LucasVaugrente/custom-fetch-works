"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionCeil = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-ceil
 */
class TermFunctionCeil extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.CEIL,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.CEIL)
                .numericConverter(() => num => Math.ceil(num))
                .collect(),
        });
    }
}
exports.TermFunctionCeil = TermFunctionCeil;
//# sourceMappingURL=TermFunctionCeil.js.map