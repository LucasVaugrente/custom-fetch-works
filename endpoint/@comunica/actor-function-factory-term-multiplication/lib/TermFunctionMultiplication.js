"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionMultiplication = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const bignumber_js_1 = require("bignumber.js");
class TermFunctionMultiplication extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 2,
            operator: utils_expression_evaluator_1.SparqlOperator.MULTIPLICATION,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.MULTIPLICATION)
                .arithmetic(() => (left, right) => new bignumber_js_1.BigNumber(left).times(right).toNumber())
                .collect(),
        });
    }
}
exports.TermFunctionMultiplication = TermFunctionMultiplication;
//# sourceMappingURL=TermFunctionMultiplication.js.map