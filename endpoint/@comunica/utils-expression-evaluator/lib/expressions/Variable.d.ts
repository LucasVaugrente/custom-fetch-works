import type { VariableExpression } from '@comunica/types';
import { ExpressionType } from '@comunica/types';
export declare class Variable implements VariableExpression {
    expressionType: ExpressionType.Variable;
    name: string;
    constructor(name: string);
}
