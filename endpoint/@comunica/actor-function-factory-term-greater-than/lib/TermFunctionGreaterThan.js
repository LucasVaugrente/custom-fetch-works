"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionGreaterThan = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class TermFunctionGreaterThan extends bus_function_factory_1.TermFunctionBase {
    constructor(lessThanFunction) {
        super({
            arity: 2,
            operator: utils_expression_evaluator_1.SparqlOperator.GT,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.GT)
                .set(['term', 'term'], expressionEvaluator => ([first, second]) => 
            // X < Y -> Y > X
            this.lessThanFunction.applyOnTerms([second, first], expressionEvaluator))
                .collect(),
        });
        this.lessThanFunction = lessThanFunction;
    }
}
exports.TermFunctionGreaterThan = TermFunctionGreaterThan;
//# sourceMappingURL=TermFunctionGreaterThan.js.map