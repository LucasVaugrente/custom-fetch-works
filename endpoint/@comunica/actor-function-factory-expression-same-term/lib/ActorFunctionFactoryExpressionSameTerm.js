"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryExpressionSameTerm = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const ExpressionFunctionSameTerm_1 = require("./ExpressionFunctionSameTerm");
/**
 * A comunica ExpressionFunctionSameTerm Function Factory Actor.
 */
class ActorFunctionFactoryExpressionSameTerm extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.SAME_TERM],
            termFunction: false,
        });
    }
    async run(_) {
        return new ExpressionFunctionSameTerm_1.ExpressionFunctionSameTerm();
    }
}
exports.ActorFunctionFactoryExpressionSameTerm = ActorFunctionFactoryExpressionSameTerm;
//# sourceMappingURL=ActorFunctionFactoryExpressionSameTerm.js.map