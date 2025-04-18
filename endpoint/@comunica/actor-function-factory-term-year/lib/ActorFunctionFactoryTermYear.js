"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermYear = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionYear_1 = require("./TermFunctionYear");
/**
 * A comunica TermFunctionYear Function Factory Actor.
 */
class ActorFunctionFactoryTermYear extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.YEAR],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionYear_1.TermFunctionYear();
    }
}
exports.ActorFunctionFactoryTermYear = ActorFunctionFactoryTermYear;
//# sourceMappingURL=ActorFunctionFactoryTermYear.js.map