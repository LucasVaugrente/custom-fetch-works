"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermTriple = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionTriple_1 = require("./TermFunctionTriple");
/**
 * A comunica TermFunctionTriple Function Factory Actor.
 */
class ActorFunctionFactoryTermTriple extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.TRIPLE],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionTriple_1.TermFunctionTriple();
    }
}
exports.ActorFunctionFactoryTermTriple = ActorFunctionFactoryTermTriple;
//# sourceMappingURL=ActorFunctionFactoryTermTriple.js.map