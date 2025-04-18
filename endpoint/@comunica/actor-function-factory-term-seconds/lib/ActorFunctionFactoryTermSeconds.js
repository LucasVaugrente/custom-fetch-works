"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermSeconds = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionSeconds_1 = require("./TermFunctionSeconds");
/**
 * A comunica TermFunctionSeconds Function Factory Actor.
 */
class ActorFunctionFactoryTermSeconds extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.SECONDS],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionSeconds_1.TermFunctionSeconds();
    }
}
exports.ActorFunctionFactoryTermSeconds = ActorFunctionFactoryTermSeconds;
//# sourceMappingURL=ActorFunctionFactoryTermSeconds.js.map