"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionXsdToDatetime = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class TermFunctionXsdToDatetime extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME)
                .onUnary(utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME, () => (val) => val)
                .onUnary(utils_expression_evaluator_1.TypeURL.XSD_STRING, () => (val) => (0, utils_expression_evaluator_1.dateTime)((0, utils_expression_evaluator_1.parseDateTime)(val.str()), val.str()), false)
                .onUnary(utils_expression_evaluator_1.TypeURL.XSD_DATE, () => (val) => new utils_expression_evaluator_1.DateTimeLiteral({ ...val.typedValue, hours: 0, minutes: 0, seconds: 0 }))
                .collect(),
        });
    }
}
exports.TermFunctionXsdToDatetime = TermFunctionXsdToDatetime;
//# sourceMappingURL=TermFunctionXsdToDatetime.js.map