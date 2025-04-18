"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermStrStarts = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionStrStarts_1 = require("./TermFunctionStrStarts");
/**
 * A comunica TermFunctionStrStarts Function Factory Actor.
 */
class ActorFunctionFactoryTermStrStarts extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.STRSTARTS],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionStrStarts_1.TermFunctionStrStarts();
    }
}
exports.ActorFunctionFactoryTermStrStarts = ActorFunctionFactoryTermStrStarts;
//# sourceMappingURL=ActorFunctionFactoryTermStrStarts.js.map