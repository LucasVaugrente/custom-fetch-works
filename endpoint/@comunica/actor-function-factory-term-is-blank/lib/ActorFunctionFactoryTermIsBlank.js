"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermIsBlank = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionIsBlank_1 = require("./TermFunctionIsBlank");
/**
 * A comunica TermFunctionIsBlank Function Factory Actor.
 */
class ActorFunctionFactoryTermIsBlank extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.IS_BLANK],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionIsBlank_1.TermFunctionIsBlank();
    }
}
exports.ActorFunctionFactoryTermIsBlank = ActorFunctionFactoryTermIsBlank;
//# sourceMappingURL=ActorFunctionFactoryTermIsBlank.js.map