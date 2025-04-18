"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermLang = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionLang_1 = require("./TermFunctionLang");
/**
 * A comunica TermFunctionLang Function Factory Actor.
 */
class ActorFunctionFactoryTermLang extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.LANG],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionLang_1.TermFunctionLang();
    }
}
exports.ActorFunctionFactoryTermLang = ActorFunctionFactoryTermLang;
//# sourceMappingURL=ActorFunctionFactoryTermLang.js.map