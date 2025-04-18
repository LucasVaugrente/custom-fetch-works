"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionFunctionBnode = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const context_entries_1 = require("@comunica/context-entries");
const utils_data_factory_1 = require("@comunica/utils-data-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-bnode
 * id has to be distinct over all id's in dataset
 */
class ExpressionFunctionBnode extends bus_function_factory_1.ExpressionFunctionBase {
    constructor() {
        super({
            arity: Number.POSITIVE_INFINITY,
            operator: utils_expression_evaluator_1.SparqlOperator.BNODE,
            apply: async (context) => {
                const { args, mapping, exprEval } = context;
                const input = args.length === 1 ?
                    await exprEval.evaluatorExpressionEvaluation(args[0], mapping) :
                    undefined;
                let strInput;
                if (input) {
                    const operation = ExpressionFunctionBnode.bnodeTree.search([input], exprEval.context.getSafe(context_entries_1.KeysExpressionEvaluator.superTypeProvider), exprEval.context.getSafe(context_entries_1.KeysInitQuery.functionArgumentsCache));
                    if (!operation) {
                        throw new utils_expression_evaluator_1.InvalidArgumentTypes(args, utils_expression_evaluator_1.SparqlOperator.BNODE);
                    }
                    strInput = operation(exprEval)([input]).str();
                }
                const bnode = new utils_data_factory_1.BlankNodeBindingsScoped(strInput ?? `BNODE_${ExpressionFunctionBnode.bnodeCounter++}`);
                return new utils_expression_evaluator_1.BlankNode(bnode);
            },
        });
    }
    checkArity(args) {
        return args.length === 0 || args.length === 1;
    }
}
exports.ExpressionFunctionBnode = ExpressionFunctionBnode;
/**
 * This OverloadTree with the constant function will handle both type promotion and subtype-substitution
 */
ExpressionFunctionBnode.bnodeTree = (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.BNODE).onString1(() => arg => arg).collect();
/**
 * A counter that keeps track blank node generated through BNODE() SPARQL
 * expressions.
 */
ExpressionFunctionBnode.bnodeCounter = 0;
//# sourceMappingURL=ExpressionFunctionBnode.js.map