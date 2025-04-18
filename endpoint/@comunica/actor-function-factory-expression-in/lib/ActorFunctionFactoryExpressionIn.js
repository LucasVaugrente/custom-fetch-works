"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryExpressionIn = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const ExpressionFunctionIn_1 = require("./ExpressionFunctionIn");
/**
 * A comunica ExpressionFunctionIn Function Factory Actor.
 */
class ActorFunctionFactoryExpressionIn extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.IN],
            termFunction: false,
        });
        this.mediatorFunctionFactory = args.mediatorFunctionFactory;
    }
    async run(args) {
        const equalityFunction = await this.mediatorFunctionFactory.mediate({
            functionName: utils_expression_evaluator_1.SparqlOperator.EQUAL,
            requireTermExpression: true,
            context: args.context,
            arguments: args.arguments,
        });
        return new ExpressionFunctionIn_1.ExpressionFunctionIn(equalityFunction);
    }
}
exports.ActorFunctionFactoryExpressionIn = ActorFunctionFactoryExpressionIn;
//# sourceMappingURL=ActorFunctionFactoryExpressionIn.js.map