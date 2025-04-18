"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermContains = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionContains_1 = require("./TermFunctionContains");
/**
 * A comunica TermFunctionContains Function Factory Actor.
 */
class ActorFunctionFactoryTermContains extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.CONTAINS],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionContains_1.TermFunctionContains();
    }
}
exports.ActorFunctionFactoryTermContains = ActorFunctionFactoryTermContains;
//# sourceMappingURL=ActorFunctionFactoryTermContains.js.map