"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermXsdToBoolean = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionXsdToBoolean_1 = require("./TermFunctionXsdToBoolean");
/**
 * A comunica TermFunctionXsdToBoolean Function Factory Actor.
 */
class ActorFunctionFactoryTermXsdToBoolean extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.TypeURL.XSD_BOOLEAN],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionXsdToBoolean_1.TermFunctionXsdToBoolean();
    }
}
exports.ActorFunctionFactoryTermXsdToBoolean = ActorFunctionFactoryTermXsdToBoolean;
//# sourceMappingURL=ActorFunctionFactoryTermXsdToBoolean.js.map