"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermDay = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionDay_1 = require("./TermFunctionDay");
/**
 * A comunica TermFunctionDay Function Factory Actor.
 */
class ActorFunctionFactoryTermDay extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.DAY],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionDay_1.TermFunctionDay();
    }
}
exports.ActorFunctionFactoryTermDay = ActorFunctionFactoryTermDay;
//# sourceMappingURL=ActorFunctionFactoryTermDay.js.map