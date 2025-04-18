"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryExpressionNotIn = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const ExpressionFunctionNotIn_1 = require("./ExpressionFunctionNotIn");
/**
 * A comunica ExpressionFunctionNotIn Function Factory Actor.
 */
class ActorFunctionFactoryExpressionNotIn extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.NOT_IN],
            termFunction: false,
        });
        this.mediatorFunctionFactory = args.mediatorFunctionFactory;
    }
    async run(args) {
        const inFunction = await this.mediatorFunctionFactory.mediate({
            functionName: utils_expression_evaluator_1.SparqlOperator.IN,
            context: args.context,
            arguments: args.arguments,
        });
        return new ExpressionFunctionNotIn_1.ExpressionFunctionNotIn(inFunction);
    }
}
exports.ActorFunctionFactoryExpressionNotIn = ActorFunctionFactoryExpressionNotIn;
//# sourceMappingURL=ActorFunctionFactoryExpressionNotIn.js.map