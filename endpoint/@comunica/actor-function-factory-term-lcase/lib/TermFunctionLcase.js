"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionLcase = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-lcase
 */
class TermFunctionLcase extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.LCASE,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.LCASE)
                .onString1Typed(() => lit => (0, utils_expression_evaluator_1.string)(lit.toLowerCase()))
                .onLangString1(() => lit => (0, utils_expression_evaluator_1.langString)(lit.typedValue.toLowerCase(), lit.language))
                .collect(),
        });
    }
}
exports.TermFunctionLcase = TermFunctionLcase;
//# sourceMappingURL=TermFunctionLcase.js.map