"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermDatatype = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionDatatype_1 = require("./TermFunctionDatatype");
/**
 * A comunica TermFunctionDatatype Function Factory Actor.
 */
class ActorFunctionFactoryTermDatatype extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.DATATYPE],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionDatatype_1.TermFunctionDatatype();
    }
}
exports.ActorFunctionFactoryTermDatatype = ActorFunctionFactoryTermDatatype;
//# sourceMappingURL=ActorFunctionFactoryTermDatatype.js.map