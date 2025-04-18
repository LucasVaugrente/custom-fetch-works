"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionXsdToDayTimeDuration = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class TermFunctionXsdToDayTimeDuration extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.TypeURL.XSD_DAY_TIME_DURATION,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.TypeURL.XSD_DAY_TIME_DURATION)
                // https://www.w3.org/TR/xpath-functions/#casting-to-durations
                .onUnary(utils_expression_evaluator_1.TypeURL.XSD_DURATION, () => (val) => 
            // Copy is needed to make sure the dataType is changed, even when the provided type was a subtype
            new utils_expression_evaluator_1.DayTimeDurationLiteral((0, utils_expression_evaluator_1.trimToDayTimeDuration)(val.typedValue)))
                .onStringly1(() => (val) => new utils_expression_evaluator_1.DayTimeDurationLiteral((0, utils_expression_evaluator_1.parseDayTimeDuration)(val.str())))
                .collect(),
        });
    }
}
exports.TermFunctionXsdToDayTimeDuration = TermFunctionXsdToDayTimeDuration;
//# sourceMappingURL=TermFunctionXsdToDayTimeDuration.js.map