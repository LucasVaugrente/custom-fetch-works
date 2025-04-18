"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermLesserThan = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionLesserThan_1 = require("./TermFunctionLesserThan");
/**
 * A comunica TermFunctionLesserThan Function Factory Actor.
 */
class ActorFunctionFactoryTermLesserThan extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.LT],
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
        return new TermFunctionLesserThan_1.TermFunctionLesserThan(equalityFunction);
    }
}
exports.ActorFunctionFactoryTermLesserThan = ActorFunctionFactoryTermLesserThan;
//# sourceMappingURL=ActorFunctionFactoryTermLesserThan.js.map