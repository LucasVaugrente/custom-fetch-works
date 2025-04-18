"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermRegex = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionRegex_1 = require("./TermFunctionRegex");
/**
 * A comunica TermFunctionRegex Function Factory Actor.
 */
class ActorFunctionFactoryTermRegex extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.REGEX],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionRegex_1.TermFunctionRegex();
    }
}
exports.ActorFunctionFactoryTermRegex = ActorFunctionFactoryTermRegex;
//# sourceMappingURL=ActorFunctionFactoryTermRegex.js.map