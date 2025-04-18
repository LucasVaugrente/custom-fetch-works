"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionStrEnds = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-strends
 */
class TermFunctionStrEnds extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 2,
            operator: utils_expression_evaluator_1.SparqlOperator.STRENDS,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.STRENDS)
                .onBinaryTyped([utils_expression_evaluator_1.TypeAlias.SPARQL_STRINGLY, utils_expression_evaluator_1.TypeURL.XSD_STRING], () => (arg1, arg2) => (0, utils_expression_evaluator_1.bool)(arg1.endsWith(arg2)))
                .onBinary([utils_expression_evaluator_1.TypeURL.RDF_LANG_STRING, utils_expression_evaluator_1.TypeURL.RDF_LANG_STRING], () => (arg1, arg2) => {
                if (arg1.language !== arg2.language) {
                    throw new utils_expression_evaluator_1.IncompatibleLanguageOperation(arg1, arg2);
                }
                return (0, utils_expression_evaluator_1.bool)(arg1.typedValue.endsWith(arg2.typedValue));
            })
                .collect(),
        });
    }
}
exports.TermFunctionStrEnds = TermFunctionStrEnds;
//# sourceMappingURL=TermFunctionStrEnds.js.map