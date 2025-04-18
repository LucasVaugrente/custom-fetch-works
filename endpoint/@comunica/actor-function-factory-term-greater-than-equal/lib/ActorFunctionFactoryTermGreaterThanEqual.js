"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermGreaterThanEqual = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionGreaterThanEqual_1 = require("./TermFunctionGreaterThanEqual");
/**
 * A comunica TermFunctionGreaterThanEqual Function Factory Actor.
 */
class ActorFunctionFactoryTermGreaterThanEqual extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.GTE],
            termFunction: true,
        });
        this.mediatorFunctionFactory = args.mediatorFunctionFactory;
    }
    async run(args) {
        const lessThanEqualFunction = await this.mediatorFunctionFactory.mediate({
            functionName: utils_expression_evaluator_1.SparqlOperator.LTE,
            requireTermExpression: true,
            context: args.context,
            arguments: args.arguments,
        });
        return new TermFunctionGreaterThanEqual_1.TermFunctionGreaterThanEqual(lessThanEqualFunction);
    }
}
exports.ActorFunctionFactoryTermGreaterThanEqual = ActorFunctionFactoryTermGreaterThanEqual;
//# sourceMappingURL=ActorFunctionFactoryTermGreaterThanEqual.js.map