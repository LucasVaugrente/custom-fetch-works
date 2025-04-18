"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionXsdToFloat = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class TermFunctionXsdToFloat extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.TypeURL.XSD_FLOAT,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.TypeURL.XSD_FLOAT)
                .onNumeric1(() => (val) => (0, utils_expression_evaluator_1.float)(val.typedValue))
                .onBoolean1Typed(() => val => (0, utils_expression_evaluator_1.float)(val ? 1 : 0))
                .onUnary(utils_expression_evaluator_1.TypeURL.XSD_STRING, () => (val) => {
                const result = (0, utils_expression_evaluator_1.parseXSDFloat)(val.str());
                if (result === undefined) {
                    throw new utils_expression_evaluator_1.CastError(val, utils_expression_evaluator_1.TypeURL.XSD_FLOAT);
                }
                return (0, utils_expression_evaluator_1.float)(result);
            }, false)
                .collect(),
        });
    }
}
exports.TermFunctionXsdToFloat = TermFunctionXsdToFloat;
//# sourceMappingURL=TermFunctionXsdToFloat.js.map