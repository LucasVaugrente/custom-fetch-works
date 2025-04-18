"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionXsdToDate = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class TermFunctionXsdToDate extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.TypeURL.XSD_DATE,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.TypeURL.XSD_DATE)
                .onUnary(utils_expression_evaluator_1.TypeURL.XSD_DATE, () => (val) => new utils_expression_evaluator_1.DateLiteral(val.typedValue, val.strValue))
                .onUnary(utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME, () => (val) => new utils_expression_evaluator_1.DateLiteral(val.typedValue))
                .onStringly1(() => (val) => new utils_expression_evaluator_1.DateLiteral((0, utils_expression_evaluator_1.parseDate)(val.str())))
                .collect(),
        });
    }
}
exports.TermFunctionXsdToDate = TermFunctionXsdToDate;
//# sourceMappingURL=TermFunctionXsdToDate.js.map