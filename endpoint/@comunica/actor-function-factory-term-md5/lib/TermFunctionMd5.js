"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionMd5 = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const spark_md5_1 = require("spark-md5");
/**
 * https://www.w3.org/TR/sparql11-query/#func-md5
 */
class TermFunctionMd5 extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.SparqlOperator.MD5,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.MD5)
                .onString1Typed(() => str => (0, utils_expression_evaluator_1.string)((0, spark_md5_1.hash)(str)))
                .collect(),
        });
    }
}
exports.TermFunctionMd5 = TermFunctionMd5;
//# sourceMappingURL=TermFunctionMd5.js.map