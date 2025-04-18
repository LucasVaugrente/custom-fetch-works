"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionAddition = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const bignumber_js_1 = require("bignumber.js");
class TermFunctionAddition extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 2,
            operator: utils_expression_evaluator_1.SparqlOperator.ADDITION,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.ADDITION)
                .arithmetic(() => (left, right) => new bignumber_js_1.BigNumber(left).plus(right).toNumber())
                .set([utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME, utils_expression_evaluator_1.TypeURL.XSD_DAY_TIME_DURATION], () => ([date, dur]) => 
            // https://www.w3.org/TR/xpath-functions/#func-add-dayTimeDuration-to-dateTime
            new utils_expression_evaluator_1.DateTimeLiteral((0, utils_expression_evaluator_1.addDurationToDateTime)(date.typedValue, (0, utils_expression_evaluator_1.defaultedDurationRepresentation)(dur.typedValue))))
                .copy({
                from: [utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME, utils_expression_evaluator_1.TypeURL.XSD_DAY_TIME_DURATION],
                to: [utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME, utils_expression_evaluator_1.TypeURL.XSD_YEAR_MONTH_DURATION],
            })
                .set([utils_expression_evaluator_1.TypeURL.XSD_DATE, utils_expression_evaluator_1.TypeURL.XSD_DAY_TIME_DURATION], () => ([date, dur]) => 
            // https://www.w3.org/TR/xpath-functions/#func-add-dayTimeDuration-to-date
            new utils_expression_evaluator_1.DateLiteral((0, utils_expression_evaluator_1.addDurationToDateTime)((0, utils_expression_evaluator_1.defaultedDateTimeRepresentation)(date.typedValue), (0, utils_expression_evaluator_1.defaultedDurationRepresentation)(dur.typedValue))))
                .copy({
                from: [utils_expression_evaluator_1.TypeURL.XSD_DATE, utils_expression_evaluator_1.TypeURL.XSD_DAY_TIME_DURATION],
                to: [utils_expression_evaluator_1.TypeURL.XSD_DATE, utils_expression_evaluator_1.TypeURL.XSD_YEAR_MONTH_DURATION],
            })
                .set([utils_expression_evaluator_1.TypeURL.XSD_TIME, utils_expression_evaluator_1.TypeURL.XSD_DAY_TIME_DURATION], () => ([time, dur]) => 
            // https://www.w3.org/TR/xpath-functions/#func-add-dayTimeDuration-to-time
            new utils_expression_evaluator_1.TimeLiteral((0, utils_expression_evaluator_1.addDurationToDateTime)((0, utils_expression_evaluator_1.defaultedDateTimeRepresentation)(time.typedValue), (0, utils_expression_evaluator_1.defaultedDurationRepresentation)(dur.typedValue))))
                .copy({
                from: [utils_expression_evaluator_1.TypeURL.XSD_TIME, utils_expression_evaluator_1.TypeURL.XSD_DAY_TIME_DURATION],
                to: [utils_expression_evaluator_1.TypeURL.XSD_TIME, utils_expression_evaluator_1.TypeURL.XSD_YEAR_MONTH_DURATION],
            })
                .collect(),
        });
    }
}
exports.TermFunctionAddition = TermFunctionAddition;
//# sourceMappingURL=TermFunctionAddition.js.map