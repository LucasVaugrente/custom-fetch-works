"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermStrAfter = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionStrAfter_1 = require("./TermFunctionStrAfter");
/**
 * A comunica TermFunctionStrAfter Function Factory Actor.
 */
class ActorFunctionFactoryTermStrAfter extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.STRAFTER],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionStrAfter_1.TermFunctionStrAfter();
    }
}
exports.ActorFunctionFactoryTermStrAfter = ActorFunctionFactoryTermStrAfter;
//# sourceMappingURL=ActorFunctionFactoryTermStrAfter.js.map