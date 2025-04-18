"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionEquality = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const context_entries_1 = require("@comunica/context-entries");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-RDFterm-equal
 */
class TermFunctionEquality extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 2,
            operator: utils_expression_evaluator_1.SparqlOperator.EQUAL,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.EQUAL)
                .numberTest(() => (left, right) => left === right)
                .stringTest(() => (left, right) => left.localeCompare(right) === 0)
                .set([utils_expression_evaluator_1.TypeURL.RDF_LANG_STRING, utils_expression_evaluator_1.TypeURL.RDF_LANG_STRING], () => ([left, right]) => (0, utils_expression_evaluator_1.bool)(left.str() === right.str() &&
                left.language === right.language))
                // Fall through: a TypeURL.XSD_STRING is never equal to a TypeURL.RDF_LANG_STRING.
                .set([utils_expression_evaluator_1.TypeAlias.SPARQL_STRINGLY, utils_expression_evaluator_1.TypeAlias.SPARQL_STRINGLY], () => () => (0, utils_expression_evaluator_1.bool)(false))
                .booleanTest(() => (left, right) => left === right)
                .dateTimeTest(exprEval => (left, right) => (0, utils_expression_evaluator_1.toUTCDate)(left, exprEval.context.getSafe(context_entries_1.KeysExpressionEvaluator.defaultTimeZone)).getTime() === (0, utils_expression_evaluator_1.toUTCDate)(right, exprEval.context.getSafe(context_entries_1.KeysExpressionEvaluator.defaultTimeZone)).getTime())
                .copy({
                // https://www.w3.org/TR/xpath-functions/#func-date-equal
                from: [utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME, utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME],
                to: [utils_expression_evaluator_1.TypeURL.XSD_DATE, utils_expression_evaluator_1.TypeURL.XSD_DATE],
            })
                .set(['quad', 'quad'], exprEval => ([left, right]) => (0, utils_expression_evaluator_1.bool)(this.applyOnTerms([left.subject, right.subject], exprEval)
                .coerceEBV() &&
                this.applyOnTerms([left.predicate, right.predicate], exprEval)
                    .coerceEBV() &&
                this.applyOnTerms([left.object, right.object], exprEval)
                    .coerceEBV() &&
                this.applyOnTerms([left.graph, right.graph], exprEval)
                    .coerceEBV()), false)
                .set(['term', 'term'], exprEval => ([_left, _right]) => {
                const left = _left.toRDF(exprEval.context.getSafe(context_entries_1.KeysInitQuery.dataFactory));
                const right = _right.toRDF(exprEval.context.getSafe(context_entries_1.KeysInitQuery.dataFactory));
                const val = left.equals(right);
                if (!val && (left.termType === 'Literal') && (right.termType === 'Literal')) {
                    throw new utils_expression_evaluator_1.RDFEqualTypeError([_left, _right]);
                }
                return (0, utils_expression_evaluator_1.bool)(val);
            }, false)
                .set([utils_expression_evaluator_1.TypeURL.XSD_DURATION, utils_expression_evaluator_1.TypeURL.XSD_DURATION], () => ([dur1, dur2]) => (0, utils_expression_evaluator_1.bool)((0, utils_expression_evaluator_1.yearMonthDurationsToMonths)((0, utils_expression_evaluator_1.defaultedYearMonthDurationRepresentation)(dur1.typedValue)) ===
                (0, utils_expression_evaluator_1.yearMonthDurationsToMonths)((0, utils_expression_evaluator_1.defaultedYearMonthDurationRepresentation)(dur2.typedValue)) &&
                (0, utils_expression_evaluator_1.dayTimeDurationsToSeconds)((0, utils_expression_evaluator_1.defaultedDayTimeDurationRepresentation)(dur1.typedValue)) ===
                    (0, utils_expression_evaluator_1.dayTimeDurationsToSeconds)((0, utils_expression_evaluator_1.defaultedDayTimeDurationRepresentation)(dur2.typedValue))))
                .set([utils_expression_evaluator_1.TypeURL.XSD_TIME, utils_expression_evaluator_1.TypeURL.XSD_TIME], exprEval => ([time1, time2]) => 
            // https://www.w3.org/TR/xpath-functions/#func-time-equal
            (0, utils_expression_evaluator_1.bool)((0, utils_expression_evaluator_1.toUTCDate)((0, utils_expression_evaluator_1.defaultedDateTimeRepresentation)(time1.typedValue), exprEval.context.getSafe(context_entries_1.KeysExpressionEvaluator.defaultTimeZone)).getTime() ===
                (0, utils_expression_evaluator_1.toUTCDate)((0, utils_expression_evaluator_1.defaultedDateTimeRepresentation)(time2.typedValue), exprEval.context.getSafe(context_entries_1.KeysExpressionEvaluator.defaultTimeZone)).getTime()))
                .collect(),
        });
    }
}
exports.TermFunctionEquality = TermFunctionEquality;
//# sourceMappingURL=TermFunctionEquality.js.map