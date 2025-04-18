"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermAddition = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionAddition_1 = require("./TermFunctionAddition");
/**
 * A comunica TermFunctionAddition Function Factory Actor.
 */
class ActorFunctionFactoryTermAddition extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.ADDITION],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionAddition_1.TermFunctionAddition();
    }
}
exports.ActorFunctionFactoryTermAddition = ActorFunctionFactoryTermAddition;
//# sourceMappingURL=ActorFunctionFactoryTermAddition.js.map