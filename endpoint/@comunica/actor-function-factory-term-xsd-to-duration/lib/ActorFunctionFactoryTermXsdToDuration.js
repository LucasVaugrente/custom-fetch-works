"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermXsdToDuration = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionXsdToDuration_1 = require("./TermFunctionXsdToDuration");
/**
 * A comunica TermFunctionXsdToDuration Function Factory Actor.
 */
class ActorFunctionFactoryTermXsdToDuration extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.TypeURL.XSD_DURATION],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionXsdToDuration_1.TermFunctionXsdToDuration();
    }
}
exports.ActorFunctionFactoryTermXsdToDuration = ActorFunctionFactoryTermXsdToDuration;
//# sourceMappingURL=ActorFunctionFactoryTermXsdToDuration.js.map