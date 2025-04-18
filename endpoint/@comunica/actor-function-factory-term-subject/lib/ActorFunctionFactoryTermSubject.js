"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermSubject = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionSubject_1 = require("./TermFunctionSubject");
/**
 * A comunica TermFunctionSubject Function Factory Actor.
 */
class ActorFunctionFactoryTermSubject extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.SUBJECT],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionSubject_1.TermFunctionSubject();
    }
}
exports.ActorFunctionFactoryTermSubject = ActorFunctionFactoryTermSubject;
//# sourceMappingURL=ActorFunctionFactoryTermSubject.js.map