"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionStrLang = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-strlang
 */
class TermFunctionStrLang extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 2,
            operator: utils_expression_evaluator_1.SparqlOperator.STRLANG,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.STRLANG)
                .onBinaryTyped([utils_expression_evaluator_1.TypeURL.XSD_STRING, utils_expression_evaluator_1.TypeURL.XSD_STRING], () => (val, language) => new utils_expression_evaluator_1.LangStringLiteral(val, language.toLowerCase()))
                .collect(),
        });
    }
}
exports.TermFunctionStrLang = TermFunctionStrLang;
//# sourceMappingURL=TermFunctionStrLang.js.map