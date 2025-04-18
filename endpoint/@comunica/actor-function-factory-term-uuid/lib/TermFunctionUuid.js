"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionUuid = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const uuid = require("uuid");
/**
 * https://www.w3.org/TR/sparql11-query/#func-uuid
 */
class TermFunctionUuid extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 0,
            operator: utils_expression_evaluator_1.SparqlOperator.UUID,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.UUID)
                .set([], () => () => new utils_expression_evaluator_1.NamedNode(`urn:uuid:${uuid.v4()}`))
                .collect(),
        });
    }
}
exports.TermFunctionUuid = TermFunctionUuid;
//# sourceMappingURL=TermFunctionUuid.js.map