"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionPredicate = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://w3c.github.io/rdf-star/cg-spec/editors_draft.html#predicate
 */
class TermFunctionPredicate extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.PREDICATE,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.PREDICATE)
                .onQuad1(() => quad => quad.predicate)
                .collect(),
        });
    }
}
exports.TermFunctionPredicate = TermFunctionPredicate;
//# sourceMappingURL=TermFunctionPredicate.js.map