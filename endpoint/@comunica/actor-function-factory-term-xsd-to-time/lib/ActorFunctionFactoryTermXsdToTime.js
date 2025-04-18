"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermXsdToTime = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionXsdToTime_1 = require("./TermFunctionXsdToTime");
/**
 * A comunica TermFunctionXsdToTime Function Factory Actor.
 */
class ActorFunctionFactoryTermXsdToTime extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.TypeURL.XSD_TIME],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionXsdToTime_1.TermFunctionXsdToTime();
    }
}
exports.ActorFunctionFactoryTermXsdToTime = ActorFunctionFactoryTermXsdToTime;
//# sourceMappingURL=ActorFunctionFactoryTermXsdToTime.js.map