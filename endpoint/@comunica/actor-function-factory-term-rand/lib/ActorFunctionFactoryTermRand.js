"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermRand = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionRand_1 = require("./TermFunctionRand");
/**
 * A comunica TermFunctionRand Function Factory Actor.
 */
class ActorFunctionFactoryTermRand extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.RAND],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionRand_1.TermFunctionRand();
    }
}
exports.ActorFunctionFactoryTermRand = ActorFunctionFactoryTermRand;
//# sourceMappingURL=ActorFunctionFactoryTermRand.js.map