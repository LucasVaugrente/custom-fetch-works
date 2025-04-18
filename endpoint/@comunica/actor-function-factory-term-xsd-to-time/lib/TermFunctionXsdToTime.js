"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionXsdToTime = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class TermFunctionXsdToTime extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.TypeURL.XSD_TIME,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.TypeURL.XSD_TIME)
                .onUnary(utils_expression_evaluator_1.TypeURL.XSD_TIME, () => (val) => new utils_expression_evaluator_1.TimeLiteral(val.typedValue, val.strValue))
                .onUnary(utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME, () => (val) => new utils_expression_evaluator_1.TimeLiteral(val.typedValue))
                .onStringly1(() => (val) => new utils_expression_evaluator_1.TimeLiteral((0, utils_expression_evaluator_1.parseTime)(val.str())))
                .collect(),
        });
    }
}
exports.TermFunctionXsdToTime = TermFunctionXsdToTime;
//# sourceMappingURL=TermFunctionXsdToTime.js.map