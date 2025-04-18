import type { Expression, FunctionApplication, OperatorExpression } from '@comunica/types';
import { ExpressionType } from '@comunica/types';
export declare class Operator implements OperatorExpression {
    name: string;
    args: Expression[];
    apply: FunctionApplication;
    expressionType: ExpressionType.Operator;
    constructor(name: string, args: Expression[], apply: FunctionApplication);
}
