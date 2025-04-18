"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermIri = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionIri_1 = require("./TermFunctionIri");
/**
 * A comunica TermFunctionIri Function Factory Actor.
 */
class ActorFunctionFactoryTermIri extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.IRI, utils_expression_evaluator_1.SparqlOperator.URI],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionIri_1.TermFunctionIri();
    }
}
exports.ActorFunctionFactoryTermIri = ActorFunctionFactoryTermIri;
//# sourceMappingURL=ActorFunctionFactoryTermIri.js.map