"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionStrAfter = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-strafter
 */
class TermFunctionStrAfter extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 2,
            operator: utils_expression_evaluator_1.SparqlOperator.STRAFTER,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.STRAFTER)
                .onBinaryTyped([utils_expression_evaluator_1.TypeURL.XSD_STRING, utils_expression_evaluator_1.TypeURL.XSD_STRING], () => (arg1, arg2) => (0, utils_expression_evaluator_1.string)(arg1.slice(arg1.indexOf(arg2)).slice(arg2.length)))
                .onBinary([utils_expression_evaluator_1.TypeURL.RDF_LANG_STRING, utils_expression_evaluator_1.TypeURL.XSD_STRING], () => (arg1, arg2) => {
                const [a1, a2] = [arg1.typedValue, arg2.typedValue];
                const sub = a1.slice(a1.indexOf(a2)).slice(a2.length);
                return sub || !a2 ? (0, utils_expression_evaluator_1.langString)(sub, arg1.language) : (0, utils_expression_evaluator_1.string)(sub);
            })
                .onBinary([utils_expression_evaluator_1.TypeURL.RDF_LANG_STRING, utils_expression_evaluator_1.TypeURL.RDF_LANG_STRING], () => (arg1, arg2) => {
                if (arg1.language !== arg2.language) {
                    throw new utils_expression_evaluator_1.IncompatibleLanguageOperation(arg1, arg2);
                }
                const [a1, a2] = [arg1.typedValue, arg2.typedValue];
                const sub = a1.slice(a1.indexOf(a2)).slice(a2.length);
                return sub || !a2 ? (0, utils_expression_evaluator_1.langString)(sub, arg1.language) : (0, utils_expression_evaluator_1.string)(sub);
            })
                .collect(),
        });
    }
}
exports.TermFunctionStrAfter = TermFunctionStrAfter;
//# sourceMappingURL=TermFunctionStrAfter.js.map