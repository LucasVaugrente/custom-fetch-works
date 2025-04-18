"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalEvaluator = void 0;
const context_entries_1 = require("@comunica/context-entries");
const types_1 = require("@comunica/types");
const Eval = require("@comunica/utils-expression-evaluator");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
const AlgebraTransformer_1 = require("./AlgebraTransformer");
/**
 * This class provides evaluation functionality to already transformed expressions.
 */
class InternalEvaluator {
    constructor(context, mediatorFunctionFactory, mediatorQueryOperation, bindingsFactory) {
        this.context = context;
        this.mediatorQueryOperation = mediatorQueryOperation;
        this.bindingsFactory = bindingsFactory;
        this.subEvaluators = {
            [types_1.ExpressionType.Term]: (expr, _mapping) => this.term(expr),
            [types_1.ExpressionType.Variable]: (expr, mapping) => this.variable(expr, mapping),
            [types_1.ExpressionType.Operator]: (expr, mapping) => this.evalFunction(expr, mapping),
            [types_1.ExpressionType.Existence]: (expr, mapping) => this.evalExistence(expr, mapping),
            [types_1.ExpressionType.Aggregate]: (_expr, _mapping) => this.evalAggregate(),
        };
        this.transformer = new AlgebraTransformer_1.AlgebraTransformer(context, mediatorFunctionFactory);
    }
    async evaluatorExpressionEvaluation(expr, mapping) {
        const evaluator = this.subEvaluators[expr.expressionType];
        return evaluator.bind(this)(expr, mapping);
    }
    term(expr) {
        return expr;
    }
    variable(expr, mapping) {
        const term = mapping.get(Eval.expressionToVar(this.context.getSafe(context_entries_1.KeysInitQuery.dataFactory), expr));
        if (!term) {
            throw new Eval.UnboundVariableError(expr.name, mapping);
        }
        return this.transformer.transformRDFTermUnsafe(term);
    }
    async evalFunction(expr, mapping) {
        return expr.apply({
            args: expr.args,
            mapping,
            exprEval: this,
        });
    }
    async evalExistence(expr, mapping) {
        const dataFactory = this.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const operation = (0, utils_query_operation_1.materializeOperation)(expr.expression.input, mapping, algebraFactory, this.bindingsFactory);
        const outputRaw = await this.mediatorQueryOperation.mediate({ operation, context: this.context });
        const output = (0, utils_query_operation_1.getSafeBindings)(outputRaw);
        return await new Promise((resolve, reject) => {
            output.bindingsStream.on('end', () => {
                resolve(false);
            });
            output.bindingsStream.on('error', reject);
            output.bindingsStream.on('data', () => {
                output.bindingsStream.close();
                resolve(true);
            });
        })
            .then((exists) => expr.expression.not ? !exists : exists)
            .then((exists) => new Eval.BooleanLiteral(exists));
    }
    evalAggregate() {
        throw new Eval.NoAggregator();
    }
}
exports.InternalEvaluator = InternalEvaluator;
//# sourceMappingURL=InternalEvaluator.js.map