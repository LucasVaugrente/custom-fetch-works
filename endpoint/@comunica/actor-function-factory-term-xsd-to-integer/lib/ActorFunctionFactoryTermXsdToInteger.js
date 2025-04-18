"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermXsdToInteger = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionXsdToInteger_1 = require("./TermFunctionXsdToInteger");
/**
 * A comunica TermFunctionXsdToInteger Function Factory Actor.
 */
class ActorFunctionFactoryTermXsdToInteger extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.TypeURL.XSD_INTEGER],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionXsdToInteger_1.TermFunctionXsdToInteger();
    }
}
exports.ActorFunctionFactoryTermXsdToInteger = ActorFunctionFactoryTermXsdToInteger;
//# sourceMappingURL=ActorFunctionFactoryTermXsdToInteger.js.map