"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionLesserThan = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const context_entries_1 = require("@comunica/context-entries");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class TermFunctionLesserThan extends bus_function_factory_1.TermFunctionBase {
    constructor(equalityFunction) {
        super({
            arity: 2,
            operator: utils_expression_evaluator_1.SparqlOperator.LT,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.LT)
                .numberTest(() => (left, right) => left < right)
                .stringTest(() => (left, right) => left.localeCompare(right) === -1)
                .booleanTest(() => (left, right) => left < right)
                .dateTimeTest(exprEval => (left, right) => (0, utils_expression_evaluator_1.toUTCDate)(left, exprEval.context.getSafe(context_entries_1.KeysExpressionEvaluator.defaultTimeZone)).getTime() <
                (0, utils_expression_evaluator_1.toUTCDate)(right, exprEval.context.getSafe(context_entries_1.KeysExpressionEvaluator.defaultTimeZone)).getTime())
                .copy({
                // https://www.w3.org/TR/xpath-functions/#func-date-less-than
                from: [utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME, utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME],
                to: [utils_expression_evaluator_1.TypeURL.XSD_DATE, utils_expression_evaluator_1.TypeURL.XSD_DATE],
            })
                .set([utils_expression_evaluator_1.TypeURL.XSD_YEAR_MONTH_DURATION, utils_expression_evaluator_1.TypeURL.XSD_YEAR_MONTH_DURATION], () => ([dur1L, dur2L]) => 
            // https://www.w3.org/TR/xpath-functions/#func-yearMonthDuration-less-than
            (0, utils_expression_evaluator_1.bool)((0, utils_expression_evaluator_1.yearMonthDurationsToMonths)((0, utils_expression_evaluator_1.defaultedYearMonthDurationRepresentation)(dur1L.typedValue)) <
                (0, utils_expression_evaluator_1.yearMonthDurationsToMonths)((0, utils_expression_evaluator_1.defaultedYearMonthDurationRepresentation)(dur2L.typedValue))))
                .set([utils_expression_evaluator_1.TypeURL.XSD_DAY_TIME_DURATION, utils_expression_evaluator_1.TypeURL.XSD_DAY_TIME_DURATION], () => ([dur1, dur2]) => 
            // https://www.w3.org/TR/xpath-functions/#func-dayTimeDuration-greater-than
            (0, utils_expression_evaluator_1.bool)((0, utils_expression_evaluator_1.dayTimeDurationsToSeconds)((0, utils_expression_evaluator_1.defaultedDayTimeDurationRepresentation)(dur1.typedValue)) <
                (0, utils_expression_evaluator_1.dayTimeDurationsToSeconds)((0, utils_expression_evaluator_1.defaultedDayTimeDurationRepresentation)(dur2.typedValue))))
                .set([utils_expression_evaluator_1.TypeURL.XSD_TIME, utils_expression_evaluator_1.TypeURL.XSD_TIME], exprEval => ([time1, time2]) => 
            // https://www.w3.org/TR/xpath-functions/#func-time-less-than
            (0, utils_expression_evaluator_1.bool)((0, utils_expression_evaluator_1.toUTCDate)((0, utils_expression_evaluator_1.defaultedDateTimeRepresentation)(time1.typedValue), exprEval.context.getSafe(context_entries_1.KeysExpressionEvaluator.defaultTimeZone)).getTime() <
                (0, utils_expression_evaluator_1.toUTCDate)((0, utils_expression_evaluator_1.defaultedDateTimeRepresentation)(time2.typedValue), exprEval.context.getSafe(context_entries_1.KeysExpressionEvaluator.defaultTimeZone)).getTime()))
                .set(['quad', 'quad'], exprEval => ([left, right]) => {
                const subjectTest = this.quadComponentTest(left.subject, right.subject, exprEval);
                if (subjectTest !== undefined) {
                    return (0, utils_expression_evaluator_1.bool)(subjectTest);
                }
                const predicateTest = this.quadComponentTest(left.predicate, right.predicate, exprEval);
                if (predicateTest !== undefined) {
                    return (0, utils_expression_evaluator_1.bool)(predicateTest);
                }
                const objectTest = this.quadComponentTest(left.object, right.object, exprEval);
                if (objectTest !== undefined) {
                    return (0, utils_expression_evaluator_1.bool)(objectTest);
                }
                return (0, utils_expression_evaluator_1.bool)(this.quadComponentTest(left.graph, right.graph, exprEval) ?? false);
            }, false)
                .collect(),
        });
        this.equalityFunction = equalityFunction;
    }
    quadComponentTest(left, right, exprEval) {
        // If components are equal, we don't have an answer
        const componentEqual = this.equalityFunction.applyOnTerms([left, right], exprEval);
        if (componentEqual.typedValue) {
            return undefined;
        }
        const componentLess = this.applyOnTerms([left, right], exprEval);
        return componentLess.typedValue;
    }
}
exports.TermFunctionLesserThan = TermFunctionLesserThan;
//# sourceMappingURL=TermFunctionLesserThan.js.map