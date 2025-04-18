"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionRound = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-round
 */
class TermFunctionRound extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.ROUND,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.ROUND)
                .numericConverter(() => num => Math.round(num))
                .collect(),
        });
    }
}
exports.TermFunctionRound = TermFunctionRound;
//# sourceMappingURL=TermFunctionRound.js.map