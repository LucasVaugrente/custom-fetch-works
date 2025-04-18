"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryExpressionLogicalOr = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const ExpressionFunctionLogicalOr_1 = require("./ExpressionFunctionLogicalOr");
/**
 * A comunica ExpressionFunctionLogicalOr Function Factory Actor.
 */
class ActorFunctionFactoryExpressionLogicalOr extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.LOGICAL_OR],
            termFunction: false,
        });
    }
    async run(_) {
        return new ExpressionFunctionLogicalOr_1.ExpressionFunctionLogicalOr();
    }
}
exports.ActorFunctionFactoryExpressionLogicalOr = ActorFunctionFactoryExpressionLogicalOr;
//# sourceMappingURL=ActorFunctionFactoryExpressionLogicalOr.js.map