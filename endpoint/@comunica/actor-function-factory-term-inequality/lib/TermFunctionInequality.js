"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionInequality = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class TermFunctionInequality extends bus_function_factory_1.TermFunctionBase {
    constructor(equalityFunction) {
        super({
            arity: 2,
            operator: utils_expression_evaluator_1.SparqlOperator.NOT_EQUAL,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.NOT_EQUAL)
                .set(['term', 'term'], expressionEvaluator => ([first, second]) => (0, utils_expression_evaluator_1.bool)(!this.equalityFunction
                .applyOnTerms([first, second], expressionEvaluator).typedValue))
                .collect(),
        });
        this.equalityFunction = equalityFunction;
    }
}
exports.TermFunctionInequality = TermFunctionInequality;
//# sourceMappingURL=TermFunctionInequality.js.map