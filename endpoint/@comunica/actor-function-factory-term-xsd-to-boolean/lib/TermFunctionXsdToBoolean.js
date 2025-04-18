"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionXsdToBoolean = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class TermFunctionXsdToBoolean extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.TypeURL.XSD_BOOLEAN,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.TypeURL.XSD_BOOLEAN)
                .onNumeric1(() => (val) => (0, utils_expression_evaluator_1.bool)(val.coerceEBV()), true)
                .onUnary(utils_expression_evaluator_1.TypeURL.XSD_BOOLEAN, () => (val) => (0, utils_expression_evaluator_1.bool)(val.coerceEBV()), true)
                .onUnary(utils_expression_evaluator_1.TypeURL.XSD_STRING, () => (val) => {
                switch (val.str()) {
                    case 'true':
                        return (0, utils_expression_evaluator_1.bool)(true);
                    case 'false':
                        return (0, utils_expression_evaluator_1.bool)(false);
                    case '1':
                        return (0, utils_expression_evaluator_1.bool)(true);
                    case '0':
                        return (0, utils_expression_evaluator_1.bool)(false);
                    default:
                        throw new utils_expression_evaluator_1.CastError(val, utils_expression_evaluator_1.TypeURL.XSD_BOOLEAN);
                }
            }, false)
                .collect(),
        });
    }
}
exports.TermFunctionXsdToBoolean = TermFunctionXsdToBoolean;
//# sourceMappingURL=TermFunctionXsdToBoolean.js.map