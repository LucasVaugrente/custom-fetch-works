"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermReplace = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionReplace_1 = require("./TermFunctionReplace");
/**
 * A comunica TermFunctionReplace Function Factory Actor.
 */
class ActorFunctionFactoryTermReplace extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.REPLACE],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionReplace_1.TermFunctionReplace();
    }
}
exports.ActorFunctionFactoryTermReplace = ActorFunctionFactoryTermReplace;
//# sourceMappingURL=ActorFunctionFactoryTermReplace.js.map