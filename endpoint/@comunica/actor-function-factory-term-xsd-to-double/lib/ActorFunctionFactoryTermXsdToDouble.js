"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermXsdToDouble = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionXsdToDouble_1 = require("./TermFunctionXsdToDouble");
/**
 * A comunica TermFunctionXsdToDouble Function Factory Actor.
 */
class ActorFunctionFactoryTermXsdToDouble extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.TypeURL.XSD_DOUBLE],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionXsdToDouble_1.TermFunctionXsdToDouble();
    }
}
exports.ActorFunctionFactoryTermXsdToDouble = ActorFunctionFactoryTermXsdToDouble;
//# sourceMappingURL=ActorFunctionFactoryTermXsdToDouble.js.map