"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionIsLiteral = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-isLiteral
 */
class TermFunctionIsLiteral extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.IS_LITERAL,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.IS_LITERAL)
                .onTerm1(() => term => (0, utils_expression_evaluator_1.bool)(term.termType === 'literal'))
                .collect(),
        });
    }
}
exports.TermFunctionIsLiteral = TermFunctionIsLiteral;
//# sourceMappingURL=TermFunctionIsLiteral.js.map