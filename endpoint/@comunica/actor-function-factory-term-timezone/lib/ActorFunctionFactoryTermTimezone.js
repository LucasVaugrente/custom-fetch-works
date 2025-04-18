"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermTimezone = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionTimezone_1 = require("./TermFunctionTimezone");
/**
 * A comunica TermFunctionTimezone Function Factory Actor.
 */
class ActorFunctionFactoryTermTimezone extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.TIMEZONE],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionTimezone_1.TermFunctionTimezone();
    }
}
exports.ActorFunctionFactoryTermTimezone = ActorFunctionFactoryTermTimezone;
//# sourceMappingURL=ActorFunctionFactoryTermTimezone.js.map