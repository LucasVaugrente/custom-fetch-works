"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryExpressionLogicalAnd = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const ExpressionFunctionLogicalAnd_1 = require("./ExpressionFunctionLogicalAnd");
/**
 * A comunica ExpressionFunctionLogicalAnd Function Factory Actor.
 */
class ActorFunctionFactoryExpressionLogicalAnd extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.LOGICAL_AND],
            termFunction: false,
        });
    }
    async run(_) {
        return new ExpressionFunctionLogicalAnd_1.ExpressionFunctionLogicalAnd();
    }
}
exports.ActorFunctionFactoryExpressionLogicalAnd = ActorFunctionFactoryExpressionLogicalAnd;
//# sourceMappingURL=ActorFunctionFactoryExpressionLogicalAnd.js.map