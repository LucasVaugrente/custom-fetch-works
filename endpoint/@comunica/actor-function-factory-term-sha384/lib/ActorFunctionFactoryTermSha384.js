"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermSha384 = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionSha384_1 = require("./TermFunctionSha384");
/**
 * A comunica TermFunctionSha384 Function Factory Actor.
 */
class ActorFunctionFactoryTermSha384 extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.SHA384],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionSha384_1.TermFunctionSha384();
    }
}
exports.ActorFunctionFactoryTermSha384 = ActorFunctionFactoryTermSha384;
//# sourceMappingURL=ActorFunctionFactoryTermSha384.js.map