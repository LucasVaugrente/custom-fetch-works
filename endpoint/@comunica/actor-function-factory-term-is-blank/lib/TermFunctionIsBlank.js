"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionIsBlank = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-isBlank
 */
class TermFunctionIsBlank extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.IS_BLANK,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.IS_BLANK)
                .onTerm1(() => term => (0, utils_expression_evaluator_1.bool)(term.termType === 'blankNode'))
                .collect(),
        });
    }
}
exports.TermFunctionIsBlank = TermFunctionIsBlank;
//# sourceMappingURL=TermFunctionIsBlank.js.map