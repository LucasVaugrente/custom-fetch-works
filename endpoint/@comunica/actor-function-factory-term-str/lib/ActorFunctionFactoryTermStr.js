"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermStr = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionStr_1 = require("./TermFunctionStr");
/**
 * A comunica TermFunctionStr Function Factory Actor.
 */
class ActorFunctionFactoryTermStr extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.STR],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionStr_1.TermFunctionStr();
    }
}
exports.ActorFunctionFactoryTermStr = ActorFunctionFactoryTermStr;
//# sourceMappingURL=ActorFunctionFactoryTermStr.js.map