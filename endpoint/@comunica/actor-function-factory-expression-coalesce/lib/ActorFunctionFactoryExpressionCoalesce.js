"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryExpressionCoalesce = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const ExpressionFunctionCoalesce_1 = require("./ExpressionFunctionCoalesce");
/**
 * A comunica ExpressionFunctionCoalesce Function Factory Actor.
 */
class ActorFunctionFactoryExpressionCoalesce extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.COALESCE],
            termFunction: false,
        });
    }
    async run(_) {
        return new ExpressionFunctionCoalesce_1.ExpressionFunctionCoalesce();
    }
}
exports.ActorFunctionFactoryExpressionCoalesce = ActorFunctionFactoryExpressionCoalesce;
//# sourceMappingURL=ActorFunctionFactoryExpressionCoalesce.js.map