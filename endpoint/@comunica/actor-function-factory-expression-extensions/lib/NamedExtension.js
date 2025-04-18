"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamedExtension = void 0;
const Core_1 = require("@comunica/bus-function-factory/lib/implementation/Core");
const context_entries_1 = require("@comunica/context-entries");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class NamedExtension extends Core_1.ExpressionFunctionBase {
    constructor({ operator, functionDefinition }) {
        super({
            arity: Number.POSITIVE_INFINITY,
            operator,
            apply: async ({ args, exprEval, mapping }) => {
                const evaluatedArgs = await Promise.all(args.map(arg => exprEval.evaluatorExpressionEvaluation(arg, mapping)));
                try {
                    return new utils_expression_evaluator_1.TermTransformer(exprEval.context.getSafe(context_entries_1.KeysExpressionEvaluator.superTypeProvider))
                        .transformRDFTermUnsafe(await functionDefinition(evaluatedArgs.map(term => term.toRDF(exprEval.context.getSafe(context_entries_1.KeysInitQuery.dataFactory)))));
                }
                catch (error) {
                    throw new utils_expression_evaluator_1.ExtensionFunctionError(this.operator, error);
                }
            },
        });
    }
}
exports.NamedExtension = NamedExtension;
//# sourceMappingURL=NamedExtension.js.map