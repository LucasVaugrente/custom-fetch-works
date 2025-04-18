"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermIsTriple = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionIsTriple_1 = require("./TermFunctionIsTriple");
/**
 * A comunica TermFunctionIsTriple Function Factory Actor.
 */
class ActorFunctionFactoryTermIsTriple extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.IS_TRIPLE],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionIsTriple_1.TermFunctionIsTriple();
    }
}
exports.ActorFunctionFactoryTermIsTriple = ActorFunctionFactoryTermIsTriple;
//# sourceMappingURL=ActorFunctionFactoryTermIsTriple.js.map