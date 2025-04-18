"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionGreaterThanEqual = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class TermFunctionGreaterThanEqual extends bus_function_factory_1.TermFunctionBase {
    constructor(lessThanEqualFunction) {
        super({
            arity: 2,
            operator: utils_expression_evaluator_1.SparqlOperator.GTE,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.GTE)
                .set(['term', 'term'], exprEval => ([first, second]) => 
            // X >= Y -> Y <= X
            this.lessThanEqualFunction.applyOnTerms([second, first], exprEval))
                .collect(),
        });
        this.lessThanEqualFunction = lessThanEqualFunction;
    }
}
exports.TermFunctionGreaterThanEqual = TermFunctionGreaterThanEqual;
//# sourceMappingURL=TermFunctionGreaterThanEqual.js.map