"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermTz = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionTz_1 = require("./TermFunctionTz");
/**
 * A comunica TermFunctionTz Function Factory Actor.
 */
class ActorFunctionFactoryTermTz extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.TZ],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionTz_1.TermFunctionTz();
    }
}
exports.ActorFunctionFactoryTermTz = ActorFunctionFactoryTermTz;
//# sourceMappingURL=ActorFunctionFactoryTermTz.js.map