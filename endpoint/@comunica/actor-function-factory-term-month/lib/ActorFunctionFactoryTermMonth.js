"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermMonth = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionMonth_1 = require("./TermFunctionMonth");
/**
 * A comunica TermFunctionMonth Function Factory Actor.
 */
class ActorFunctionFactoryTermMonth extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.MONTH],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionMonth_1.TermFunctionMonth();
    }
}
exports.ActorFunctionFactoryTermMonth = ActorFunctionFactoryTermMonth;
//# sourceMappingURL=ActorFunctionFactoryTermMonth.js.map