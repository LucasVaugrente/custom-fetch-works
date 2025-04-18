"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionXsdToInteger = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class TermFunctionXsdToInteger extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 1,
            operator: utils_expression_evaluator_1.TypeURL.XSD_INTEGER,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.TypeURL.XSD_INTEGER)
                .onBoolean1Typed(() => val => (0, utils_expression_evaluator_1.integer)(val ? 1 : 0))
                .onNumeric1(() => (val) => {
                if (!Number.isFinite(val.typedValue)) {
                    throw new utils_expression_evaluator_1.CastError(val, utils_expression_evaluator_1.TypeURL.XSD_INTEGER);
                }
                return (0, utils_expression_evaluator_1.integer)(Math.trunc(val.typedValue));
            })
                .onString1(() => (val) => {
                const str = val.str();
                const result = /^\d+$/u.test(str) ? Number.parseInt(str, 10) : undefined;
                if (result === undefined) {
                    throw new utils_expression_evaluator_1.CastError(val, utils_expression_evaluator_1.TypeURL.XSD_INTEGER);
                }
                return (0, utils_expression_evaluator_1.integer)(result);
            })
                .collect(),
        });
    }
}
exports.TermFunctionXsdToInteger = TermFunctionXsdToInteger;
//# sourceMappingURL=TermFunctionXsdToInteger.js.map