"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermIsLiteral = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionIsLiteral_1 = require("./TermFunctionIsLiteral");
/**
 * A comunica TermFunctionIsLiteral Function Factory Actor.
 */
class ActorFunctionFactoryTermIsLiteral extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.IS_LITERAL],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionIsLiteral_1.TermFunctionIsLiteral();
    }
}
exports.ActorFunctionFactoryTermIsLiteral = ActorFunctionFactoryTermIsLiteral;
//# sourceMappingURL=ActorFunctionFactoryTermIsLiteral.js.map