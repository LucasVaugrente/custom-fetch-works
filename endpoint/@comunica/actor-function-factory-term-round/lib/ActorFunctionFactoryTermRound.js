"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermRound = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionRound_1 = require("./TermFunctionRound");
/**
 * A comunica TermFunctionRound Function Factory Actor.
 */
class ActorFunctionFactoryTermRound extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.ROUND],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionRound_1.TermFunctionRound();
    }
}
exports.ActorFunctionFactoryTermRound = ActorFunctionFactoryTermRound;
//# sourceMappingURL=ActorFunctionFactoryTermRound.js.map