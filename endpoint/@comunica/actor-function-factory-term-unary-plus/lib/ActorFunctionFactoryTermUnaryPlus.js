"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermUnaryPlus = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionUnaryPlus_1 = require("./TermFunctionUnaryPlus");
/**
 * A comunica TermFunctionUnaryPlus Function Factory Actor.
 */
class ActorFunctionFactoryTermUnaryPlus extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.UPLUS],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionUnaryPlus_1.TermFunctionUnaryPlus();
    }
}
exports.ActorFunctionFactoryTermUnaryPlus = ActorFunctionFactoryTermUnaryPlus;
//# sourceMappingURL=ActorFunctionFactoryTermUnaryPlus.js.map