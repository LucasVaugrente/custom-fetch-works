"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermXsdToDecimal = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionXsdToDecimal_1 = require("./TermFunctionXsdToDecimal");
/**
 * A comunica TermFunctionXsdToDecimal Function Factory Actor.
 */
class ActorFunctionFactoryTermXsdToDecimal extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.TypeURL.XSD_DECIMAL],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionXsdToDecimal_1.TermFunctionXsdToDecimal();
    }
}
exports.ActorFunctionFactoryTermXsdToDecimal = ActorFunctionFactoryTermXsdToDecimal;
//# sourceMappingURL=ActorFunctionFactoryTermXsdToDecimal.js.map