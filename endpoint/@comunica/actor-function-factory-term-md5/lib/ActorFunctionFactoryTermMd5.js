"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermMd5 = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionMd5_1 = require("./TermFunctionMd5");
/**
 * A comunica TermFunctionMd5 Function Factory Actor.
 */
class ActorFunctionFactoryTermMd5 extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.MD5],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionMd5_1.TermFunctionMd5();
    }
}
exports.ActorFunctionFactoryTermMd5 = ActorFunctionFactoryTermMd5;
//# sourceMappingURL=ActorFunctionFactoryTermMd5.js.map