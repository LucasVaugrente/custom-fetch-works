import { ExpressionFunctionBase } from '@comunica/bus-function-factory';
/**
 * https://www.w3.org/TR/sparql11-query/#func-if
 * This function doesn't require type promotion or subtype-substitution, everything works on TermExpression
 */
export declare class ExpressionFunctionIf extends ExpressionFunctionBase {
    constructor();
}
