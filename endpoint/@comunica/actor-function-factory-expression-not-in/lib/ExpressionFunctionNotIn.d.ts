import type { IExpressionFunction } from '@comunica/bus-function-factory';
import { ExpressionFunctionBase } from '@comunica/bus-function-factory';
import type { Expression } from '@comunica/types';
/**
 * https://www.w3.org/TR/sparql11-query/#func-not-in
 * This function doesn't require type promotion or subtype-substitution, everything works on TermExpression
 */
export declare class ExpressionFunctionNotIn extends ExpressionFunctionBase {
    private readonly inFunction;
    constructor(inFunction: IExpressionFunction);
    checkArity(args: Expression[]): boolean;
}
