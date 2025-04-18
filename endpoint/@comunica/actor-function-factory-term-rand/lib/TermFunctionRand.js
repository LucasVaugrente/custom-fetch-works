"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionRand = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#idp2130040
 */
class TermFunctionRand extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 0,
            operator: utils_expression_evaluator_1.SparqlOperator.RAND,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.RAND)
                .set([], () => () => (0, utils_expression_evaluator_1.double)(Math.random()))
                .collect(),
        });
    }
}
exports.TermFunctionRand = TermFunctionRand;
//# sourceMappingURL=TermFunctionRand.js.map