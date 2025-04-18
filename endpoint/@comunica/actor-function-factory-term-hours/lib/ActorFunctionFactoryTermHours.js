"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermHours = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionHours_1 = require("./TermFunctionHours");
/**
 * A comunica TermFunctionHours Function Factory Actor.
 */
class ActorFunctionFactoryTermHours extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.HOURS],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionHours_1.TermFunctionHours();
    }
}
exports.ActorFunctionFactoryTermHours = ActorFunctionFactoryTermHours;
//# sourceMappingURL=ActorFunctionFactoryTermHours.js.map