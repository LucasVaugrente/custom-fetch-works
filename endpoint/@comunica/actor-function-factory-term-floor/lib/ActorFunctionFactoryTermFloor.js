"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermFloor = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionFloor_1 = require("./TermFunctionFloor");
/**
 * A comunica TermFunctionFloor Function Factory Actor.
 */
class ActorFunctionFactoryTermFloor extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.FLOOR],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionFloor_1.TermFunctionFloor();
    }
}
exports.ActorFunctionFactoryTermFloor = ActorFunctionFactoryTermFloor;
//# sourceMappingURL=ActorFunctionFactoryTermFloor.js.map