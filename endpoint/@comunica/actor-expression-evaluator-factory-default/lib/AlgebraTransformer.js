"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgebraTransformer = void 0;
const context_entries_1 = require("@comunica/context-entries");
const ExprEval = require("@comunica/utils-expression-evaluator");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
class AlgebraTransformer extends ExprEval.TermTransformer {
    constructor(context, mediatorFunctionFactory) {
        super(context.getSafe(context_entries_1.KeysExpressionEvaluator.superTypeProvider));
        this.context = context;
        this.mediatorFunctionFactory = mediatorFunctionFactory;
    }
    async transformAlgebra(expr) {
        const types = sparqlalgebrajs_1.Algebra.expressionTypes;
        switch (expr.expressionType) {
            case types.TERM:
                return this.transformTerm(expr);
            case types.OPERATOR:
                return await this.transformOperator(expr);
            case types.NAMED:
                return await this.transformNamed(expr);
            case types.EXISTENCE:
                return AlgebraTransformer.transformExistence(expr);
            case types.AGGREGATE:
                return AlgebraTransformer.transformAggregate(expr);
            case types.WILDCARD:
                return AlgebraTransformer.transformWildcard(expr);
        }
    }
    static transformWildcard(term) {
        return new ExprEval.NamedNode(term.wildcard.value);
    }
    async getOperator(operator, expr) {
        const operatorFunc = await this.mediatorFunctionFactory.mediate({
            functionName: operator,
            arguments: expr.args,
            context: this.context,
        });
        const operatorArgs = await Promise.all(expr.args.map(arg => this.transformAlgebra(arg)));
        if (!operatorFunc.checkArity(operatorArgs)) {
            throw new ExprEval.InvalidArity(operatorArgs, operator);
        }
        return new ExprEval.Operator(operator, operatorArgs, operatorFunc.apply);
    }
    async transformOperator(expr) {
        return this.getOperator(expr.operator.toLowerCase(), expr);
    }
    async transformNamed(expr) {
        return this.getOperator(expr.name.value, expr);
    }
    static transformAggregate(expr) {
        const name = expr.aggregator;
        return new ExprEval.Aggregate(name, expr);
    }
    static transformExistence(expr) {
        return new ExprEval.Existence(expr);
    }
}
exports.AlgebraTransformer = AlgebraTransformer;
//# sourceMappingURL=AlgebraTransformer.js.map