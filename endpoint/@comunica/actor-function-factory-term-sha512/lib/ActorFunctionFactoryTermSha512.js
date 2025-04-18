"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermSha512 = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionSha512_1 = require("./TermFunctionSha512");
/**
 * A comunica TermFunctionSha512 Function Factory Actor.
 */
class ActorFunctionFactoryTermSha512 extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.SHA512],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionSha512_1.TermFunctionSha512();
    }
}
exports.ActorFunctionFactoryTermSha512 = ActorFunctionFactoryTermSha512;
//# sourceMappingURL=ActorFunctionFactoryTermSha512.js.map