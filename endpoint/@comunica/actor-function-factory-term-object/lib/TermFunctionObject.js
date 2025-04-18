"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionObject = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://w3c.github.io/rdf-star/cg-spec/editors_draft.html#object
 */
class TermFunctionObject extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.OBJECT,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.OBJECT)
                .onQuad1(() => quad => quad.object)
                .collect(),
        });
    }
}
exports.TermFunctionObject = TermFunctionObject;
//# sourceMappingURL=TermFunctionObject.js.map