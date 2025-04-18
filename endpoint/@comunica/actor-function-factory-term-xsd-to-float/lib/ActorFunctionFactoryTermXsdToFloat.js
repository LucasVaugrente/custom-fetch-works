"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermXsdToFloat = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionXsdToFloat_1 = require("./TermFunctionXsdToFloat");
/**
 * A comunica TermFunctionXsdToFloat Function Factory Actor.
 */
class ActorFunctionFactoryTermXsdToFloat extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.TypeURL.XSD_FLOAT],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionXsdToFloat_1.TermFunctionXsdToFloat();
    }
}
exports.ActorFunctionFactoryTermXsdToFloat = ActorFunctionFactoryTermXsdToFloat;
//# sourceMappingURL=ActorFunctionFactoryTermXsdToFloat.js.map