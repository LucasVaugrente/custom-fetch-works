"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionUnaryPlus = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class TermFunctionUnaryPlus extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.UPLUS,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.UPLUS)
                .numericConverter(() => val => val)
                .collect(),
        });
    }
}
exports.TermFunctionUnaryPlus = TermFunctionUnaryPlus;
//# sourceMappingURL=TermFunctionUnaryPlus.js.map