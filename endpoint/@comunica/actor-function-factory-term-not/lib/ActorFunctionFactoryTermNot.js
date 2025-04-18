"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermNot = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionNot_1 = require("./TermFunctionNot");
/**
 * A comunica TermFunctionNot Function Factory Actor.
 */
class ActorFunctionFactoryTermNot extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.NOT],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionNot_1.TermFunctionNot();
    }
}
exports.ActorFunctionFactoryTermNot = ActorFunctionFactoryTermNot;
//# sourceMappingURL=ActorFunctionFactoryTermNot.js.map