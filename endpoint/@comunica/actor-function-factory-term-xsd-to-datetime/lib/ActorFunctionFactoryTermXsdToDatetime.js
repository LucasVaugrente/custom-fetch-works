"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermXsdToDatetime = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionXsdToDatetime_1 = require("./TermFunctionXsdToDatetime");
/**
 * A comunica TermFunctionXsdToDatetime Function Factory Actor.
 */
class ActorFunctionFactoryTermXsdToDatetime extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.TypeURL.XSD_DATE_TIME],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionXsdToDatetime_1.TermFunctionXsdToDatetime();
    }
}
exports.ActorFunctionFactoryTermXsdToDatetime = ActorFunctionFactoryTermXsdToDatetime;
//# sourceMappingURL=ActorFunctionFactoryTermXsdToDatetime.js.map