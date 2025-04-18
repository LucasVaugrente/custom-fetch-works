"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermUcase = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionUcase_1 = require("./TermFunctionUcase");
/**
 * A comunica TermFunctionUcase Function Factory Actor.
 */
class ActorFunctionFactoryTermUcase extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.UCASE],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionUcase_1.TermFunctionUcase();
    }
}
exports.ActorFunctionFactoryTermUcase = ActorFunctionFactoryTermUcase;
//# sourceMappingURL=ActorFunctionFactoryTermUcase.js.map