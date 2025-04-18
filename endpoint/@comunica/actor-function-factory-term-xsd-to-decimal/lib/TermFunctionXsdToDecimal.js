"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionXsdToDecimal = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class TermFunctionXsdToDecimal extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.TypeURL.XSD_DECIMAL,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.TypeURL.XSD_DECIMAL)
                .onNumeric1(() => (val) => {
                const result = (0, utils_expression_evaluator_1.parseXSDDecimal)(val.str());
                if (result === undefined) {
                    throw new utils_expression_evaluator_1.CastError(val, utils_expression_evaluator_1.TypeURL.XSD_DECIMAL);
                }
                return (0, utils_expression_evaluator_1.decimal)(result);
            })
                .onString1(() => (val) => {
                const str = val.str();
                const result = /^([+-])?(\d+(\.\d+)?)$/u.test(str) ? (0, utils_expression_evaluator_1.parseXSDDecimal)(str) : undefined;
                if (result === undefined) {
                    throw new utils_expression_evaluator_1.CastError(val, utils_expression_evaluator_1.TypeURL.XSD_DECIMAL);
                }
                return (0, utils_expression_evaluator_1.decimal)(result);
            }, false)
                .onBoolean1Typed(() => val => (0, utils_expression_evaluator_1.decimal)(val ? 1 : 0))
                .collect(),
        });
    }
}
exports.TermFunctionXsdToDecimal = TermFunctionXsdToDecimal;
//# sourceMappingURL=TermFunctionXsdToDecimal.js.map