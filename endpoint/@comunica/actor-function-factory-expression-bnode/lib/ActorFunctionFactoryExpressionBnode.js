"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryExpressionBnode = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const ExpressionFunctionBnode_1 = require("./ExpressionFunctionBnode");
/**
 * A comunica ExpressionFunctionBnode Function Factory Actor.
 */
class ActorFunctionFactoryExpressionBnode extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.BNODE],
            termFunction: false,
        });
    }
    async run(_) {
        return new ExpressionFunctionBnode_1.ExpressionFunctionBnode();
    }
}
exports.ActorFunctionFactoryExpressionBnode = ActorFunctionFactoryExpressionBnode;
//# sourceMappingURL=ActorFunctionFactoryExpressionBnode.js.map