"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionXsdToString = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/xpath-functions/#casting-to-string
 */
class TermFunctionXsdToString extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.TypeURL.XSD_STRING,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.TypeURL.XSD_STRING)
                .onNumeric1(() => (val) => (0, utils_expression_evaluator_1.string)((0, utils_expression_evaluator_1.float)(val.typedValue).str()))
                .onBoolean1Typed(() => val => (0, utils_expression_evaluator_1.string)((0, utils_expression_evaluator_1.bool)(val).str()))
                .onTerm1(() => (val) => (0, utils_expression_evaluator_1.string)(val.str()))
                .collect(),
        });
    }
}
exports.TermFunctionXsdToString = TermFunctionXsdToString;
//# sourceMappingURL=TermFunctionXsdToString.js.map