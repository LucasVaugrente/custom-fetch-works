"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermAbs = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionAbs_1 = require("./TermFunctionAbs");
/**
 * A comunica TermFunctionAbs Function Factory Actor.
 */
class ActorFunctionFactoryTermAbs extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.ABS],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionAbs_1.TermFunctionAbs();
    }
}
exports.ActorFunctionFactoryTermAbs = ActorFunctionFactoryTermAbs;
//# sourceMappingURL=ActorFunctionFactoryTermAbs.js.map