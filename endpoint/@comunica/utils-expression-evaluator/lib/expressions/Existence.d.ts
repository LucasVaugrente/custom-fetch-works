import type { ExistenceExpression } from '@comunica/types';
import { ExpressionType } from '@comunica/types';
import type { Algebra as Alg } from 'sparqlalgebrajs';
export declare class Existence implements ExistenceExpression {
    expression: Alg.ExistenceExpression;
    expressionType: ExpressionType.Existence;
    constructor(expression: Alg.ExistenceExpression);
}
