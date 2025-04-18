"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermEquality = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionEquality_1 = require("./TermFunctionEquality");
/**
 * A comunica TermFunctionEquality Function Factory Actor.
 */
class ActorFunctionFactoryTermEquality extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.EQUAL],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionEquality_1.TermFunctionEquality();
    }
}
exports.ActorFunctionFactoryTermEquality = ActorFunctionFactoryTermEquality;
//# sourceMappingURL=ActorFunctionFactoryTermEquality.js.map