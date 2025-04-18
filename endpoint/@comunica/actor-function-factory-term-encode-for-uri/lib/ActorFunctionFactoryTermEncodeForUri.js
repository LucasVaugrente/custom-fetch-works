"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryTermEncodeForUri = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const TermFunctionEncodeForUri_1 = require("./TermFunctionEncodeForUri");
/**
 * A comunica TermFunctionEncodeForUri Function Factory Actor.
 */
class ActorFunctionFactoryTermEncodeForUri extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.ENCODE_FOR_URI],
            termFunction: true,
        });
    }
    async run(_) {
        return new TermFunctionEncodeForUri_1.TermFunctionEncodeForUri();
    }
}
exports.ActorFunctionFactoryTermEncodeForUri = ActorFunctionFactoryTermEncodeForUri;
//# sourceMappingURL=ActorFunctionFactoryTermEncodeForUri.js.map