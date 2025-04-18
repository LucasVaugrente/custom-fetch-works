"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermUnaryMinus = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionUnaryMinus_1 = require("./TermFunctionUnaryMinus");
/**
 * A comunica TermFunctionUnaryMinus Function Factory Actor.
 */
class ActorFunctionFactoryTermUnaryMinus extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.UMINUS],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionUnaryMinus_1.TermFunctionUnaryMinus();
    }
}
exports.ActorFunctionFactoryTermUnaryMinus = ActorFunctionFactoryTermUnaryMinus;
//# sourceMappingURL=ActorFunctionFactoryTermUnaryMinus.js.map