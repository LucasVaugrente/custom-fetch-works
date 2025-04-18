"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermUuid = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionUuid_1 = require("./TermFunctionUuid");
/**
 * A comunica TermFunctionUuid Function Factory Actor.
 */
class ActorFunctionFactoryTermUuid extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.UUID],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionUuid_1.TermFunctionUuid();
    }
}
exports.ActorFunctionFactoryTermUuid = ActorFunctionFactoryTermUuid;
//# sourceMappingURL=ActorFunctionFactoryTermUuid.js.map