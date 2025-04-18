"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermPredicate = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionPredicate_1 = require("./TermFunctionPredicate");
/**
 * A comunica TermFunctionPredicate Function Factory Actor.
 */
class ActorFunctionFactoryTermPredicate extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.PREDICATE],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionPredicate_1.TermFunctionPredicate();
    }
}
exports.ActorFunctionFactoryTermPredicate = ActorFunctionFactoryTermPredicate;
//# sourceMappingURL=ActorFunctionFactoryTermPredicate.js.map