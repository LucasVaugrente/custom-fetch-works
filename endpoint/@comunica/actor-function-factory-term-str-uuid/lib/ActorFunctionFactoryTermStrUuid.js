"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermStrUuid = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionStrUuid_1 = require("./TermFunctionStrUuid");
/**
 * A comunica TermFunctionStrUuid Function Factory Actor.
 */
class ActorFunctionFactoryTermStrUuid extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.STRUUID],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionStrUuid_1.TermFunctionStrUuid();
    }
}
exports.ActorFunctionFactoryTermStrUuid = ActorFunctionFactoryTermStrUuid;
//# sourceMappingURL=ActorFunctionFactoryTermStrUuid.js.map