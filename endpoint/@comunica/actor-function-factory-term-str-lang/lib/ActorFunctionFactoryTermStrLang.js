"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermStrLang = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionStrLang_1 = require("./TermFunctionStrLang");
/**
 * A comunica TermFunctionStrLang Function Factory Actor.
 */
class ActorFunctionFactoryTermStrLang extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.STRLANG],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionStrLang_1.TermFunctionStrLang();
    }
}
exports.ActorFunctionFactoryTermStrLang = ActorFunctionFactoryTermStrLang;
//# sourceMappingURL=ActorFunctionFactoryTermStrLang.js.map