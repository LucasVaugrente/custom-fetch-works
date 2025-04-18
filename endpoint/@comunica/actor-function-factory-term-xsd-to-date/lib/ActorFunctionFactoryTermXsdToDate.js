"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermXsdToDate = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionXsdToDate_1 = require("./TermFunctionXsdToDate");
/**
 * A comunica TermFunctionXsdToDate Function Factory Actor.
 */
class ActorFunctionFactoryTermXsdToDate extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.TypeURL.XSD_DATE],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionXsdToDate_1.TermFunctionXsdToDate();
    }
}
exports.ActorFunctionFactoryTermXsdToDate = ActorFunctionFactoryTermXsdToDate;
//# sourceMappingURL=ActorFunctionFactoryTermXsdToDate.js.map