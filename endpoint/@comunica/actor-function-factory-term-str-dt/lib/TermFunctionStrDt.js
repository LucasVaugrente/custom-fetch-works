"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionStrDt = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const context_entries_1 = require("@comunica/context-entries");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-strdt
 */
class TermFunctionStrDt extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 2,
            operator: utils_expression_evaluator_1.SparqlOperator.STRDT,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.STRDT).set([utils_expression_evaluator_1.TypeURL.XSD_STRING, 'namedNode'], exprEval => ([str, iri]) => {
                const dataFactory = exprEval.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
                const lit = dataFactory.literal(str.typedValue, dataFactory.namedNode(iri.value));
                return new utils_expression_evaluator_1.TermTransformer(exprEval.context.getSafe(context_entries_1.KeysExpressionEvaluator.superTypeProvider))
                    .transformLiteral(lit);
            }).collect(),
        });
    }
}
exports.TermFunctionStrDt = TermFunctionStrDt;
//# sourceMappingURL=TermFunctionStrDt.js.map