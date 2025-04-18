"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermXsdToString = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionXsdToString_1 = require("./TermFunctionXsdToString");
/**
 * A comunica TermFunctionXsdToString Function Factory Actor.
 */
class ActorFunctionFactoryTermXsdToString extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.TypeURL.XSD_STRING],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionXsdToString_1.TermFunctionXsdToString();
    }
}
exports.ActorFunctionFactoryTermXsdToString = ActorFunctionFactoryTermXsdToString;
//# sourceMappingURL=ActorFunctionFactoryTermXsdToString.js.map