import { ExpressionFunctionBase } from '@comunica/bus-function-factory';
/**
 * https://www.w3.org/TR/sparql11-query/#func-sameTerm
 * This function doesn't require type promotion or subtype-substitution, everything works on TermExpression
 */
export declare class ExpressionFunctionSameTerm extends ExpressionFunctionBase {
    constructor();
}
