"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermXsdToYearMonthDuration = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionXsdToYearMonthDuration_1 = require("./TermFunctionXsdToYearMonthDuration");
/**
 * A comunica TermFunctionXsdToYearMonthDuration Function Factory Actor.
 */
class ActorFunctionFactoryTermXsdToYearMonthDuration extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.TypeURL.XSD_YEAR_MONTH_DURATION],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionXsdToYearMonthDuration_1.TermFunctionXsdToYearMonthDuration();
    }
}
exports.ActorFunctionFactoryTermXsdToYearMonthDuration = ActorFunctionFactoryTermXsdToYearMonthDuration;
//# sourceMappingURL=ActorFunctionFactoryTermXsdToYearMonthDuration.js.map