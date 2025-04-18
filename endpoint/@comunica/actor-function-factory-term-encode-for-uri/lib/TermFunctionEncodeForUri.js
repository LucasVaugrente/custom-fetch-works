"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionEncodeForUri = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-encode
 */
class TermFunctionEncodeForUri extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.ENCODE_FOR_URI,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.ENCODE_FOR_URI)
                .onStringly1Typed(() => val => (0, utils_expression_evaluator_1.string)(encodeURI(val))).collect(),
        });
    }
}
exports.TermFunctionEncodeForUri = TermFunctionEncodeForUri;
//# sourceMappingURL=TermFunctionEncodeForUri.js.map