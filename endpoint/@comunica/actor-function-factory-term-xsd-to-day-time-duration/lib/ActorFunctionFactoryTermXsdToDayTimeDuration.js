"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermXsdToDayTimeDuration = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionXsdToDayTimeDuration_1 = require("./TermFunctionXsdToDayTimeDuration");
/**
 * A comunica TermFunctionXsdToDayTimeDuration Function Factory Actor.
 */
class ActorFunctionFactoryTermXsdToDayTimeDuration extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.TypeURL.XSD_DAY_TIME_DURATION],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionXsdToDayTimeDuration_1.TermFunctionXsdToDayTimeDuration();
    }
}
exports.ActorFunctionFactoryTermXsdToDayTimeDuration = ActorFunctionFactoryTermXsdToDayTimeDuration;
//# sourceMappingURL=ActorFunctionFactoryTermXsdToDayTimeDuration.js.map