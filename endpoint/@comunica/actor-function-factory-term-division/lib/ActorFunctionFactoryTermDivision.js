"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermDivision = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionDivision_1 = require("./TermFunctionDivision");
/**
 * A comunica TermFunctionDivision Function Factory Actor.
 */
class ActorFunctionFactoryTermDivision extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.DIVISION],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionDivision_1.TermFunctionDivision();
    }
}
exports.ActorFunctionFactoryTermDivision = ActorFunctionFactoryTermDivision;
//# sourceMappingURL=ActorFunctionFactoryTermDivision.js.map