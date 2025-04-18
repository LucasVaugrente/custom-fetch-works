"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionTimezone = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-timezone
 */
class TermFunctionTimezone extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.TIMEZONE,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.TIMEZONE)
                .onDateTime1(() => (date) => {
                const duration = {
                    hours: date.typedValue.zoneHours,
                    minutes: date.typedValue.zoneMinutes,
                };
                if (duration.hours === undefined && duration.minutes === undefined) {
                    throw new utils_expression_evaluator_1.InvalidTimezoneCall(date.str());
                }
                return new utils_expression_evaluator_1.DayTimeDurationLiteral(duration);
            })
                .copy({ from: [utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME], to: [utils_expression_evaluator_1.TypeURL.XSD_DATE] })
                .copy({ from: [utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME], to: [utils_expression_evaluator_1.TypeURL.XSD_TIME] })
                .collect(),
        });
    }
}
exports.TermFunctionTimezone = TermFunctionTimezone;
//# sourceMappingURL=TermFunctionTimezone.js.map