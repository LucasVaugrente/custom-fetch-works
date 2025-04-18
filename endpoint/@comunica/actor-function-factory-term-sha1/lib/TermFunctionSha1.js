"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionSha1 = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const hash_js_1 = require("hash.js");
/**
 * https://www.w3.org/TR/sparql11-query/#func-sha1
 */
class TermFunctionSha1 extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.SHA1,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.SHA1)
                .onString1Typed(() => str => (0, utils_expression_evaluator_1.string)((0, hash_js_1.sha1)().update(str).digest('hex')))
                .collect(),
        });
    }
}
exports.TermFunctionSha1 = TermFunctionSha1;
//# sourceMappingURL=TermFunctionSha1.js.map