"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermObject = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionObject_1 = require("./TermFunctionObject");
/**
 * A comunica TermFunctionObject Function Factory Actor.
 */
class ActorFunctionFactoryTermObject extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.OBJECT],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionObject_1.TermFunctionObject();
    }
}
exports.ActorFunctionFactoryTermObject = ActorFunctionFactoryTermObject;
//# sourceMappingURL=ActorFunctionFactoryTermObject.js.map