"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionDivision = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const bignumber_js_1 = require("bignumber.js");
class TermFunctionDivision extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 2,
            operator: utils_expression_evaluator_1.SparqlOperator.DIVISION,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.DIVISION)
                .arithmetic(() => (left, right) => new bignumber_js_1.BigNumber(left).div(right).toNumber())
                .onBinaryTyped([utils_expression_evaluator_1.TypeURL.XSD_INTEGER, utils_expression_evaluator_1.TypeURL.XSD_INTEGER], () => (left, right) => {
                if (right === 0) {
                    throw new utils_expression_evaluator_1.ExpressionError('Integer division by 0');
                }
                return (0, utils_expression_evaluator_1.decimal)(new bignumber_js_1.BigNumber(left).div(right).toNumber());
            })
                .collect(),
        });
    }
}
exports.TermFunctionDivision = TermFunctionDivision;
//# sourceMappingURL=TermFunctionDivision.js.map