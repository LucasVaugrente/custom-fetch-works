"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionNot = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class TermFunctionNot extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.NOT,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.NOT)
                .onTerm1(() => val => (0, utils_expression_evaluator_1.bool)(!val.coerceEBV()))
                .collect(),
        });
    }
}
exports.TermFunctionNot = TermFunctionNot;
//# sourceMappingURL=TermFunctionNot.js.map