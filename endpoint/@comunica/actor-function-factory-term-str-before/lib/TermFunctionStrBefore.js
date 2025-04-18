"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionStrBefore = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-strbefore
 */
class TermFunctionStrBefore extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 2,
            operator: utils_expression_evaluator_1.SparqlOperator.STRBEFORE,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.STRBEFORE)
                .onBinaryTyped([utils_expression_evaluator_1.TypeURL.XSD_STRING, utils_expression_evaluator_1.TypeURL.XSD_STRING], () => (arg1, arg2) => (0, utils_expression_evaluator_1.string)(arg1.slice(0, Math.max(0, arg1.indexOf(arg2)))))
                .onBinary([utils_expression_evaluator_1.TypeURL.RDF_LANG_STRING, utils_expression_evaluator_1.TypeURL.XSD_STRING], () => (arg1, arg2) => {
                const [a1, a2] = [arg1.typedValue, arg2.typedValue];
                const sub = arg1.typedValue.slice(0, Math.max(0, a1.indexOf(a2)));
                return sub || !a2 ? (0, utils_expression_evaluator_1.langString)(sub, arg1.language) : (0, utils_expression_evaluator_1.string)(sub);
            })
                .onBinary([utils_expression_evaluator_1.TypeURL.RDF_LANG_STRING, utils_expression_evaluator_1.TypeURL.RDF_LANG_STRING], () => (arg1, arg2) => {
                if (arg1.language !== arg2.language) {
                    throw new utils_expression_evaluator_1.IncompatibleLanguageOperation(arg1, arg2);
                }
                const [a1, a2] = [arg1.typedValue, arg2.typedValue];
                const sub = arg1.typedValue.slice(0, Math.max(0, a1.indexOf(a2)));
                return sub || !a2 ? (0, utils_expression_evaluator_1.langString)(sub, arg1.language) : (0, utils_expression_evaluator_1.string)(sub);
            })
                .collect(),
        });
    }
}
exports.TermFunctionStrBefore = TermFunctionStrBefore;
//# sourceMappingURL=TermFunctionStrBefore.js.map