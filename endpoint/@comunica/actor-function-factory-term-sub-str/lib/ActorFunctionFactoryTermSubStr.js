"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermSubStr = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionSubStr_1 = require("./TermFunctionSubStr");
/**
 * A comunica TermFunctionSubStr Function Factory Actor.
 */
class ActorFunctionFactoryTermSubStr extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.SUBSTR],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionSubStr_1.TermFunctionSubStr();
    }
}
exports.ActorFunctionFactoryTermSubStr = ActorFunctionFactoryTermSubStr;
//# sourceMappingURL=ActorFunctionFactoryTermSubStr.js.map