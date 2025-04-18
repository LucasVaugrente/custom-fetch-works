"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionReplace = void 0;
const actor_function_factory_term_regex_1 = require("@comunica/actor-function-factory-term-regex");
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-replace
 */
class TermFunctionReplace extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: [3, 4],
            operator: utils_expression_evaluator_1.SparqlOperator.REPLACE,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.REPLACE)
                .onTernaryTyped([utils_expression_evaluator_1.TypeURL.XSD_STRING, utils_expression_evaluator_1.TypeURL.XSD_STRING, utils_expression_evaluator_1.TypeURL.XSD_STRING], () => (arg, pattern, replacement) => (0, utils_expression_evaluator_1.string)(TermFunctionReplace.replace(arg, pattern, replacement)))
                .set([utils_expression_evaluator_1.TypeURL.RDF_LANG_STRING, utils_expression_evaluator_1.TypeURL.XSD_STRING, utils_expression_evaluator_1.TypeURL.XSD_STRING], () => ([arg, pattern, replacement]) => {
                const result = TermFunctionReplace.replace(arg.typedValue, pattern.typedValue, replacement.typedValue);
                return (0, utils_expression_evaluator_1.langString)(result, arg.language);
            })
                .onQuaternaryTyped([utils_expression_evaluator_1.TypeURL.XSD_STRING, utils_expression_evaluator_1.TypeURL.XSD_STRING, utils_expression_evaluator_1.TypeURL.XSD_STRING, utils_expression_evaluator_1.TypeURL.XSD_STRING], () => (arg, pattern, replacement, flags) => (0, utils_expression_evaluator_1.string)(TermFunctionReplace.replace(arg, pattern, replacement, flags)))
                .set([utils_expression_evaluator_1.TypeURL.RDF_LANG_STRING, utils_expression_evaluator_1.TypeURL.XSD_STRING, utils_expression_evaluator_1.TypeURL.XSD_STRING, utils_expression_evaluator_1.TypeURL.XSD_STRING], () => ([arg, pattern, replacement, flags]) => {
                const result = TermFunctionReplace.replace(arg.typedValue, pattern.typedValue, replacement.typedValue, flags.typedValue);
                return (0, utils_expression_evaluator_1.langString)(result, arg.language);
            })
                .collect(),
        });
    }
    // https://www.w3.org/TR/xpath-functions/#func-replace
    static replace(arg, pattern, replacement, flags = '') {
        flags = actor_function_factory_term_regex_1.TermFunctionRegex.cleanFlags(flags);
        if (flags.includes('x')) {
            pattern = actor_function_factory_term_regex_1.TermFunctionRegex.flagX(pattern);
        }
        if (flags.includes('q')) {
            pattern = actor_function_factory_term_regex_1.TermFunctionRegex.flagQ(pattern);
        }
        else {
            replacement = replacement.replaceAll('$0', () => '$&');
        }
        flags = `${flags.replaceAll(/[qx]/gu, '')}g`;
        return arg.replaceAll(new RegExp(pattern, flags), replacement);
    }
}
exports.TermFunctionReplace = TermFunctionReplace;
//# sourceMappingURL=TermFunctionReplace.js.map