"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionXsdToDouble = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class TermFunctionXsdToDouble extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.TypeURL.XSD_DOUBLE,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.TypeURL.XSD_DOUBLE)
                .onNumeric1(() => (val) => (0, utils_expression_evaluator_1.double)(val.typedValue))
                .onBoolean1Typed(() => val => (0, utils_expression_evaluator_1.double)(val ? 1 : 0))
                .onUnary(utils_expression_evaluator_1.TypeURL.XSD_STRING, () => (val) => {
                const result = (0, utils_expression_evaluator_1.parseXSDFloat)(val.str());
                if (result === undefined) {
                    throw new utils_expression_evaluator_1.CastError(val, utils_expression_evaluator_1.TypeURL.XSD_DOUBLE);
                }
                return (0, utils_expression_evaluator_1.double)(result);
            }, false)
                .collect(),
        });
    }
}
exports.TermFunctionXsdToDouble = TermFunctionXsdToDouble;
//# sourceMappingURL=TermFunctionXsdToDouble.js.map