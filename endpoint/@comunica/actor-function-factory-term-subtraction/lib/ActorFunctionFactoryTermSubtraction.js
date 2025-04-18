"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermSubtraction = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionSubtraction_1 = require("./TermFunctionSubtraction");
/**
 * A comunica TermFunctionSubtraction Function Factory Actor.
 */
class ActorFunctionFactoryTermSubtraction extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.SUBTRACTION],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionSubtraction_1.TermFunctionSubtraction();
    }
}
exports.ActorFunctionFactoryTermSubtraction = ActorFunctionFactoryTermSubtraction;
//# sourceMappingURL=ActorFunctionFactoryTermSubtraction.js.map