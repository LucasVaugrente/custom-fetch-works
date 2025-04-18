import type { AggregateExpression } from '@comunica/types';
import { ExpressionType } from '@comunica/types';
import type { Algebra as Alg } from 'sparqlalgebrajs';
export declare class Aggregate implements AggregateExpression {
    name: string;
    expression: Alg.AggregateExpression;
    expressionType: ExpressionType.Aggregate;
    constructor(name: string, expression: Alg.AggregateExpression);
}
