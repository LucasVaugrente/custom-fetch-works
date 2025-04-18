"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionIsTriple = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://w3c.github.io/rdf-star/cg-spec/editors_draft.html#istriple
 */
class TermFunctionIsTriple extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.IS_TRIPLE,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.IS_TRIPLE)
                .onTerm1(() => term => (0, utils_expression_evaluator_1.bool)(term.termType === 'quad'))
                .collect(),
        });
    }
}
exports.TermFunctionIsTriple = TermFunctionIsTriple;
//# sourceMappingURL=TermFunctionIsTriple.js.map