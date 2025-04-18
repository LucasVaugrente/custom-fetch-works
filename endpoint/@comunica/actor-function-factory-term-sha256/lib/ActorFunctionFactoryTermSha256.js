"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermSha256 = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionSha256_1 = require("./TermFunctionSha256");
/**
 * A comunica TermFunctionSha256 Function Factory Actor.
 */
class ActorFunctionFactoryTermSha256 extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.SHA256],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionSha256_1.TermFunctionSha256();
    }
}
exports.ActorFunctionFactoryTermSha256 = ActorFunctionFactoryTermSha256;
//# sourceMappingURL=ActorFunctionFactoryTermSha256.js.map