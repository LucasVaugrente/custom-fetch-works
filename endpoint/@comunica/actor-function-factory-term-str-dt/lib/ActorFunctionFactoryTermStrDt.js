"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermStrDt = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionStrDt_1 = require("./TermFunctionStrDt");
/**
 * A comunica TermFunctionStrDt Function Factory Actor.
 */
class ActorFunctionFactoryTermStrDt extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.STRDT],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionStrDt_1.TermFunctionStrDt();
    }
}
exports.ActorFunctionFactoryTermStrDt = ActorFunctionFactoryTermStrDt;
//# sourceMappingURL=ActorFunctionFactoryTermStrDt.js.map