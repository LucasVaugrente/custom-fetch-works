"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermStrBefore = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionStrBefore_1 = require("./TermFunctionStrBefore");
/**
 * A comunica TermFunctionStrBefore Function Factory Actor.
 */
class ActorFunctionFactoryTermStrBefore extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.STRBEFORE],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionStrBefore_1.TermFunctionStrBefore();
    }
}
exports.ActorFunctionFactoryTermStrBefore = ActorFunctionFactoryTermStrBefore;
//# sourceMappingURL=ActorFunctionFactoryTermStrBefore.js.map