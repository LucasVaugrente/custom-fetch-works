"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionLesserThanEqual = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class TermFunctionLesserThanEqual extends bus_function_factory_1.TermFunctionBase {
    constructor(equalityFunction, lessThanFunction) {
        super({
            arity: 2,
            operator: utils_expression_evaluator_1.SparqlOperator.LTE,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.LTE)
                .set(['term', 'term'], exprEval => ([first, second]) => 
            // X <= Y -> X < Y || X = Y
            // First check if the first is lesser than the second, then check if they are equal.
            // Doing this, the correct error will be thrown,
            // each type that has a lesserThanEqual has a matching lesserThan.
            (0, utils_expression_evaluator_1.bool)(this.lessThanFunction.applyOnTerms([first, second], exprEval)
                .typedValue ||
                this.equalityFunction.applyOnTerms([first, second], exprEval)
                    .typedValue))
                .collect(),
        });
        this.equalityFunction = equalityFunction;
        this.lessThanFunction = lessThanFunction;
    }
}
exports.TermFunctionLesserThanEqual = TermFunctionLesserThanEqual;
//# sourceMappingURL=TermFunctionLesserThanEqual.js.map