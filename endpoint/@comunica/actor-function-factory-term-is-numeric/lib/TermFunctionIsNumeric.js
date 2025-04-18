"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionIsNumeric = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-isNumeric
 */
class TermFunctionIsNumeric extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.IS_NUMERIC,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.IS_NUMERIC)
                .onNumeric1(() => () => (0, utils_expression_evaluator_1.bool)(true))
                .onTerm1(() => () => (0, utils_expression_evaluator_1.bool)(false))
                .collect(),
        });
    }
}
exports.TermFunctionIsNumeric = TermFunctionIsNumeric;
//# sourceMappingURL=TermFunctionIsNumeric.js.map