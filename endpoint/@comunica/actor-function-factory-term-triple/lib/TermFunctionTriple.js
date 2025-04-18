"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionTriple = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://w3c.github.io/rdf-star/cg-spec/editors_draft.html#triple-function
 */
class TermFunctionTriple extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 3,
            operator: utils_expression_evaluator_1.SparqlOperator.TRIPLE,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.TRIPLE)
                .onTerm3(_ => (...args) => new utils_expression_evaluator_1.Quad(args[0], args[1], args[2], new utils_expression_evaluator_1.DefaultGraph()))
                .collect(),
        });
    }
}
exports.TermFunctionTriple = TermFunctionTriple;
//# sourceMappingURL=TermFunctionTriple.js.map