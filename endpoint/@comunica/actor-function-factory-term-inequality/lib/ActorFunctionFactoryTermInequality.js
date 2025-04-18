"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermInequality = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionInequality_1 = require("./TermFunctionInequality");
/**
 * A comunica TermFunctionInequality Function Factory Actor.
 */
class ActorFunctionFactoryTermInequality extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.NOT_EQUAL],
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
        return new TermFunctionInequality_1.TermFunctionInequality(equalityFunction);
    }
}
exports.ActorFunctionFactoryTermInequality = ActorFunctionFactoryTermInequality;
//# sourceMappingURL=ActorFunctionFactoryTermInequality.js.map