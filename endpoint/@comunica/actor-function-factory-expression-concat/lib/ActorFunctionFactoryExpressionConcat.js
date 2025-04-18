"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorFunctionFactoryExpressionConcat = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const ExpressionFunctionConcat_1 = require("./ExpressionFunctionConcat");
/**
 * A comunica ExpressionFunctionConcat Function Factory Actor.
 */
class ActorFunctionFactoryExpressionConcat extends bus_function_factory_1.ActorFunctionFactoryDedicated {
    constructor(args) {
        super({
            ...args,
            functionNames: [utils_expression_evaluator_1.SparqlOperator.CONCAT],
            termFunction: false,
        });
    }
    async run(_) {
        return new ExpressionFunctionConcat_1.ExpressionFunctionConcat();
    }
}
exports.ActorFunctionFactoryExpressionConcat = ActorFunctionFactoryExpressionConcat;
//# sourceMappingURL=ActorFunctionFactoryExpressionConcat.js.map