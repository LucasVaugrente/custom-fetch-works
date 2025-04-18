"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermStrEnds = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionStrEnds_1 = require("./TermFunctionStrEnds");
/**
 * A comunica TermFunctionStrEnds Function Factory Actor.
 */
class ActorFunctionFactoryTermStrEnds extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.STRENDS],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionStrEnds_1.TermFunctionStrEnds();
    }
}
exports.ActorFunctionFactoryTermStrEnds = ActorFunctionFactoryTermStrEnds;
//# sourceMappingURL=ActorFunctionFactoryTermStrEnds.js.map