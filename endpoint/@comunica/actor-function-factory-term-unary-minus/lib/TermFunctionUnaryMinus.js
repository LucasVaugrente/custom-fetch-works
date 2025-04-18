"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionUnaryMinus = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class TermFunctionUnaryMinus extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.UMINUS,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.UMINUS)
                .numericConverter(() => val => -val)
                .collect(),
        });
    }
}
exports.TermFunctionUnaryMinus = TermFunctionUnaryMinus;
//# sourceMappingURL=TermFunctionUnaryMinus.js.map