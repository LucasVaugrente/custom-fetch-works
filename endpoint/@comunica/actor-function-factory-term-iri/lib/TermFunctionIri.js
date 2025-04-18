"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionIri = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const context_entries_1 = require("@comunica/context-entries");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const relative_to_absolute_iri_1 = require("relative-to-absolute-iri");
/**
 * https://www.w3.org/TR/sparql11-query/#func-iri
 */
class TermFunctionIri extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.IRI,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.IRI)
                .set(['namedNode'], exprEval => (args) => {
                const lit = args[0];
                const iri = (0, relative_to_absolute_iri_1.resolve)(lit.str(), exprEval.context.get(context_entries_1.KeysInitQuery.baseIRI) ?? '');
                return new utils_expression_evaluator_1.NamedNode(iri);
            })
                .onString1(exprEval => (lit) => {
                const iri = (0, relative_to_absolute_iri_1.resolve)(lit.str(), exprEval.context.get(context_entries_1.KeysInitQuery.baseIRI) ?? '');
                return new utils_expression_evaluator_1.NamedNode(iri);
            })
                .collect(),
        });
    }
}
exports.TermFunctionIri = TermFunctionIri;
//# sourceMappingURL=TermFunctionIri.js.map