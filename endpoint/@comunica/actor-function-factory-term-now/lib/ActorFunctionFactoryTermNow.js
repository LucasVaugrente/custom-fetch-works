"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermNow = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionNow_1 = require("./TermFunctionNow");
/**
 * A comunica TermFunctionNow Function Factory Actor.
 */
class ActorFunctionFactoryTermNow extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.NOW],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionNow_1.TermFunctionNow();
    }
}
exports.ActorFunctionFactoryTermNow = ActorFunctionFactoryTermNow;
//# sourceMappingURL=ActorFunctionFactoryTermNow.js.map