import type { ITermFunction } from '@comunica/bus-function-factory';
import { ExpressionFunctionBase } from '@comunica/bus-function-factory';
import type { Expression } from '@comunica/types';
/**
 * https://www.w3.org/TR/sparql11-query/#func-in
 * This function doesn't require type promotion or subtype-substitution, everything works on TermExpression
 */
export declare class ExpressionFunctionIn extends ExpressionFunctionBase {
    private readonly equalityFunction;
    constructor(equalityFunction: ITermFunction);
    checkArity(args: Expression[]): boolean;
    private inRecursive;
}
