"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionUcase = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-ucase
 */
class TermFunctionUcase extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.UCASE,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.UCASE)
                .onString1Typed(() => lit => (0, utils_expression_evaluator_1.string)(lit.toUpperCase()))
                .onLangString1(() => lit => (0, utils_expression_evaluator_1.langString)(lit.typedValue.toUpperCase(), lit.language))
                .collect(),
        });
    }
}
exports.TermFunctionUcase = TermFunctionUcase;
//# sourceMappingURL=TermFunctionUcase.js.map