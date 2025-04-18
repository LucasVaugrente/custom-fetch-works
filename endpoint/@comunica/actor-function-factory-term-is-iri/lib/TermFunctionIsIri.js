"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionIsIri = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-isIRI
 */
class TermFunctionIsIri extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.IS_IRI,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.IS_IRI)
                .onTerm1(() => term => (0, utils_expression_evaluator_1.bool)(term.termType === 'namedNode'))
                .collect(),
        });
    }
}
exports.TermFunctionIsIri = TermFunctionIsIri;
//# sourceMappingURL=TermFunctionIsIri.js.map