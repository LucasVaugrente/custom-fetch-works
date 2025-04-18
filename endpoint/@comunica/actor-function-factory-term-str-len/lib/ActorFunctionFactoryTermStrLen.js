"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermStrLen = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionStrLen_1 = require("./TermFunctionStrLen");
/**
 * A comunica TermFunctionStrLen Function Factory Actor.
 */
class ActorFunctionFactoryTermStrLen extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.STRLEN],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionStrLen_1.TermFunctionStrLen();
    }
}
exports.ActorFunctionFactoryTermStrLen = ActorFunctionFactoryTermStrLen;
//# sourceMappingURL=ActorFunctionFactoryTermStrLen.js.map