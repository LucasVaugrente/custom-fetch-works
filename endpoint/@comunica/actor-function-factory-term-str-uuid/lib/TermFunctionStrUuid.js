"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionStrUuid = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const uuid = require("uuid");
/**
 * https://www.w3.org/TR/sparql11-query/#func-struuid
 */
class TermFunctionStrUuid extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 0,
            operator: utils_expression_evaluator_1.SparqlOperator.STRUUID,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.STRUUID)
                .set([], () => () => (0, utils_expression_evaluator_1.string)(uuid.v4()))
                .collect(),
        });
    }
}
exports.TermFunctionStrUuid = TermFunctionStrUuid;
//# sourceMappingURL=TermFunctionStrUuid.js.map