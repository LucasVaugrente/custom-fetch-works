"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermMultiplication = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionMultiplication_1 = require("./TermFunctionMultiplication");
/**
 * A comunica TermFunctionMultiplication Function Factory Actor.
 */
class ActorFunctionFactoryTermMultiplication extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.MULTIPLICATION],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionMultiplication_1.TermFunctionMultiplication();
    }
}
exports.ActorFunctionFactoryTermMultiplication = ActorFunctionFactoryTermMultiplication;
//# sourceMappingURL=ActorFunctionFactoryTermMultiplication.js.map