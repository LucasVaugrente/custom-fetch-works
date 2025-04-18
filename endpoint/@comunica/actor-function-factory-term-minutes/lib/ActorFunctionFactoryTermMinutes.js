"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermMinutes = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionMinutes_1 = require("./TermFunctionMinutes");
/**
 * A comunica TermFunctionMinutes Function Factory Actor.
 */
class ActorFunctionFactoryTermMinutes extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.MINUTES],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionMinutes_1.TermFunctionMinutes();
    }
}
exports.ActorFunctionFactoryTermMinutes = ActorFunctionFactoryTermMinutes;
//# sourceMappingURL=ActorFunctionFactoryTermMinutes.js.map