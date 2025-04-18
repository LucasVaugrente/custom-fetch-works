"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryExpressionIf = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const ExpressionFunctionIf_1 = require("./ExpressionFunctionIf");
/**
 * A comunica ExpressionFunctionIf Function Factory Actor.
 */
class ActorFunctionFactoryExpressionIf extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.IF],
            termFunction: false,
        });
    }
    async run(_) {
        return new ExpressionFunctionIf_1.ExpressionFunctionIf();
    }
}
exports.ActorFunctionFactoryExpressionIf = ActorFunctionFactoryExpressionIf;
//# sourceMappingURL=ActorFunctionFactoryExpressionIf.js.map