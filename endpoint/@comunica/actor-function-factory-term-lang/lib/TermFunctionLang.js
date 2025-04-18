"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionLang = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-lang
 */
class TermFunctionLang extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.LANG,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.LANG)
                .onLiteral1(() => lit => (0, utils_expression_evaluator_1.string)(lit.language ?? ''))
                .collect(),
        });
    }
}
exports.TermFunctionLang = TermFunctionLang;
//# sourceMappingURL=TermFunctionLang.js.map