"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryExpressionBound = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const ExpressionFunctionBound_1 = require("./ExpressionFunctionBound");
/**
 * A comunica ExpressionFunctionBound Function Factory Actor.
 */
class ActorFunctionFactoryExpressionBound extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.BOUND],
            termFunction: false,
        });
    }
    async run(_) {
        return new ExpressionFunctionBound_1.ExpressionFunctionBound();
    }
}
exports.ActorFunctionFactoryExpressionBound = ActorFunctionFactoryExpressionBound;
//# sourceMappingURL=ActorFunctionFactoryExpressionBound.js.map