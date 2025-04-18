"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermLcase = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionLcase_1 = require("./TermFunctionLcase");
/**
 * A comunica TermFunctionLcase Function Factory Actor.
 */
class ActorFunctionFactoryTermLcase extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.LCASE],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionLcase_1.TermFunctionLcase();
    }
}
exports.ActorFunctionFactoryTermLcase = ActorFunctionFactoryTermLcase;
//# sourceMappingURL=ActorFunctionFactoryTermLcase.js.map