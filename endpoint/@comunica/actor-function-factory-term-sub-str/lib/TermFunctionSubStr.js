"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionSubStr = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-substr
 */
class TermFunctionSubStr extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: [2, 3],
            operator: utils_expression_evaluator_1.SparqlOperator.SUBSTR,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.SUBSTR)
                .onBinaryTyped([utils_expression_evaluator_1.TypeURL.XSD_STRING, utils_expression_evaluator_1.TypeURL.XSD_INTEGER], () => (source, startingLoc) => (0, utils_expression_evaluator_1.string)([...source].slice(startingLoc - 1).join('')))
                .onBinary([utils_expression_evaluator_1.TypeURL.RDF_LANG_STRING, utils_expression_evaluator_1.TypeURL.XSD_INTEGER], () => (source, startingLoc) => {
                const sub = [...source.typedValue].slice(startingLoc.typedValue - 1).join('');
                return (0, utils_expression_evaluator_1.langString)(sub, source.language);
            })
                .onTernaryTyped([utils_expression_evaluator_1.TypeURL.XSD_STRING, utils_expression_evaluator_1.TypeURL.XSD_INTEGER, utils_expression_evaluator_1.TypeURL.XSD_INTEGER], () => (source, startingLoc, length) => (0, utils_expression_evaluator_1.string)([...source].slice(startingLoc - 1, length + startingLoc - 1).join('')))
                .onTernary([utils_expression_evaluator_1.TypeURL.RDF_LANG_STRING, utils_expression_evaluator_1.TypeURL.XSD_INTEGER, utils_expression_evaluator_1.TypeURL.XSD_INTEGER], () => (source, startingLoc, length) => {
                const sub = [...source.typedValue]
                    .slice(startingLoc.typedValue - 1, length.typedValue + startingLoc.typedValue - 1)
                    .join('');
                return (0, utils_expression_evaluator_1.langString)(sub, source.language);
            })
                .collect(),
        });
    }
}
exports.TermFunctionSubStr = TermFunctionSubStr;
//# sourceMappingURL=TermFunctionSubStr.js.map