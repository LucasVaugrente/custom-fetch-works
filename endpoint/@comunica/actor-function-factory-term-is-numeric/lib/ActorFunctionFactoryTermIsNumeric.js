"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermIsNumeric = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionIsNumeric_1 = require("./TermFunctionIsNumeric");
/**
 * A comunica TermFunctionIsNumeric Function Factory Actor.
 */
class ActorFunctionFactoryTermIsNumeric extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.IS_NUMERIC],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionIsNumeric_1.TermFunctionIsNumeric();
    }
}
exports.ActorFunctionFactoryTermIsNumeric = ActorFunctionFactoryTermIsNumeric;
//# sourceMappingURL=ActorFunctionFactoryTermIsNumeric.js.map