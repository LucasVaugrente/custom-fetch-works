"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionSubtraction = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const context_entries_1 = require("@comunica/context-entries");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const bignumber_js_1 = require("bignumber.js");
class TermFunctionSubtraction extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 2,
            operator: utils_expression_evaluator_1.SparqlOperator.SUBTRACTION,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.SUBTRACTION)
                .arithmetic(() => (left, right) => new bignumber_js_1.BigNumber(left).minus(right).toNumber())
                .set([utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME, utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME], exprEval => ([date1, date2]) => 
            // https://www.w3.org/TR/xpath-functions/#func-subtract-dateTimes;
            new utils_expression_evaluator_1.DayTimeDurationLiteral((0, utils_expression_evaluator_1.elapsedDuration)(date1.typedValue, date2.typedValue, exprEval.context.getSafe(context_entries_1.KeysExpressionEvaluator.defaultTimeZone))))
                .copy({ from: [utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME, utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME], to: [utils_expression_evaluator_1.TypeURL.XSD_DATE, utils_expression_evaluator_1.TypeURL.XSD_DATE] })
                .copy({ from: [utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME, utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME], to: [utils_expression_evaluator_1.TypeURL.XSD_TIME, utils_expression_evaluator_1.TypeURL.XSD_TIME] })
                .set([utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME, utils_expression_evaluator_1.TypeURL.XSD_DAY_TIME_DURATION], () => ([date, dur]) => 
            // https://www.w3.org/TR/xpath-functions/#func-subtract-dayTimeDuration-from-dateTime
            new utils_expression_evaluator_1.DateTimeLiteral((0, utils_expression_evaluator_1.addDurationToDateTime)(date.typedValue, (0, utils_expression_evaluator_1.defaultedDurationRepresentation)((0, utils_expression_evaluator_1.negateDuration)(dur.typedValue)))))
                .copy({
                from: [utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME, utils_expression_evaluator_1.TypeURL.XSD_DAY_TIME_DURATION],
                to: [utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME, utils_expression_evaluator_1.TypeURL.XSD_YEAR_MONTH_DURATION],
            })
                .set([utils_expression_evaluator_1.TypeURL.XSD_DATE, utils_expression_evaluator_1.TypeURL.XSD_DAY_TIME_DURATION], () => ([date, dur]) => 
            // https://www.w3.org/TR/xpath-functions/#func-subtract-dayTimeDuration-from-date
            new utils_expression_evaluator_1.DateLiteral((0, utils_expression_evaluator_1.addDurationToDateTime)((0, utils_expression_evaluator_1.defaultedDateTimeRepresentation)(date.typedValue), (0, utils_expression_evaluator_1.defaultedDurationRepresentation)((0, utils_expression_evaluator_1.negateDuration)(dur.typedValue)))))
                .copy({
                from: [utils_expression_evaluator_1.TypeURL.XSD_DATE, utils_expression_evaluator_1.TypeURL.XSD_DAY_TIME_DURATION],
                to: [utils_expression_evaluator_1.TypeURL.XSD_DATE, utils_expression_evaluator_1.TypeURL.XSD_YEAR_MONTH_DURATION],
            })
                .set([utils_expression_evaluator_1.TypeURL.XSD_TIME, utils_expression_evaluator_1.TypeURL.XSD_DAY_TIME_DURATION], () => ([time, dur]) => 
            // https://www.w3.org/TR/xpath-functions/#func-subtract-dayTimeDuration-from-date
            new utils_expression_evaluator_1.TimeLiteral((0, utils_expression_evaluator_1.addDurationToDateTime)((0, utils_expression_evaluator_1.defaultedDateTimeRepresentation)(time.typedValue), (0, utils_expression_evaluator_1.defaultedDurationRepresentation)((0, utils_expression_evaluator_1.negateDuration)(dur.typedValue)))))
                .collect(),
        });
    }
}
exports.TermFunctionSubtraction = TermFunctionSubtraction;
//# sourceMappingURL=TermFunctionSubtraction.js.map