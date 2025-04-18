"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermCeil = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionCeil_1 = require("./TermFunctionCeil");
/**
 * A comunica TermFunctionCeil Function Factory Actor.
 */
class ActorFunctionFactoryTermCeil extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.CEIL],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionCeil_1.TermFunctionCeil();
    }
}
exports.ActorFunctionFactoryTermCeil = ActorFunctionFactoryTermCeil;
//# sourceMappingURL=ActorFunctionFactoryTermCeil.js.map