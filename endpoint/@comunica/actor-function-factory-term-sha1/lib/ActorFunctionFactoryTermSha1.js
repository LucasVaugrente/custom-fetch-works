"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermSha1 = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionSha1_1 = require("./TermFunctionSha1");
/**
 * A comunica TermFunctionSha1 Function Factory Actor.
 */
class ActorFunctionFactoryTermSha1 extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.SHA1],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionSha1_1.TermFunctionSha1();
    }
}
exports.ActorFunctionFactoryTermSha1 = ActorFunctionFactoryTermSha1;
//# sourceMappingURL=ActorFunctionFactoryTermSha1.js.map