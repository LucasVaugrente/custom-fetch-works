"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermIsIri = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionIsIri_1 = require("./TermFunctionIsIri");
/**
 * A comunica TermFunctionIsIri Function Factory Actor.
 */
class ActorFunctionFactoryTermIsIri extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.IS_IRI, utils_expression_evaluator_1.SparqlOperator.IS_URI],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionIsIri_1.TermFunctionIsIri();
    }
}
exports.ActorFunctionFactoryTermIsIri = ActorFunctionFactoryTermIsIri;
//# sourceMappingURL=ActorFunctionFactoryTermIsIri.js.map