import type { MediatorFunctionFactory } from '@comunica/bus-function-factory';
import type { Expression, IActionContext } from '@comunica/types';
import * as ExprEval from '@comunica/utils-expression-evaluator';
import { Algebra as Alg } from 'sparqlalgebrajs';
export declare class AlgebraTransformer extends ExprEval.TermTransformer {
    private readonly context;
    private readonly mediatorFunctionFactory;
    constructor(context: IActionContext, mediatorFunctionFactory: MediatorFunctionFactory);
    transformAlgebra(expr: Alg.Expression): Promise<Expression>;
    private static transformWildcard;
    private getOperator;
    private transformOperator;
    private transformNamed;
    static transformAggregate(expr: Alg.AggregateExpression): ExprEval.Aggregate;
    static transformExistence(expr: Alg.ExistenceExpression): ExprEval.Existence;
}
