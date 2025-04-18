"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermLangmatches = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionLangmatches_1 = require("./TermFunctionLangmatches");
/**
 * A comunica TermFunctionLangmatches Function Factory Actor.
 */
class ActorFunctionFactoryTermLangmatches extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.LANG_MATCHES],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionLangmatches_1.TermFunctionLangmatches();
    }
}
exports.ActorFunctionFactoryTermLangmatches = ActorFunctionFactoryTermLangmatches;
//# sourceMappingURL=ActorFunctionFactoryTermLangmatches.js.map