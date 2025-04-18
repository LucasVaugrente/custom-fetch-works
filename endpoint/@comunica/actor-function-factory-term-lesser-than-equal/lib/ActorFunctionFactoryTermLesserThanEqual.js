"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermLesserThanEqual = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionLesserThanEqual_1 = require("./TermFunctionLesserThanEqual");
/**
 * A comunica TermFunctionLesserThanEqual Function Factory Actor.
 */
class ActorFunctionFactoryTermLesserThanEqual extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.LTE],
            termFunction: true,
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
        const lessThanFunction = await this.mediatorFunctionFactory.mediate({
            functionName: utils_expression_evaluator_1.SparqlOperator.LT,
            requireTermExpression: true,
            context: args.context,
            arguments: args.arguments,
        });
        return new TermFunctionLesserThanEqual_1.TermFunctionLesserThanEqual(equalityFunction, lessThanFunction);
    }
}
exports.ActorFunctionFactoryTermLesserThanEqual = ActorFunctionFactoryTermLesserThanEqual;
//# sourceMappingURL=ActorFunctionFactoryTermLesserThanEqual.js.map