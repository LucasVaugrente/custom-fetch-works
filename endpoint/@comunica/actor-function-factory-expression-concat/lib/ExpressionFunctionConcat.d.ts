import { ExpressionFunctionBase } from '@comunica/bus-function-factory';
/**
 * https://www.w3.org/TR/sparql11-query/#func-concat
 */
export declare class ExpressionFunctionConcat extends ExpressionFunctionBase {
    constructor();
    /**
     * This OverloadTree with the constant function will handle both type promotion and subtype-substitution
     */
    private static readonly concatTree;
    private static langAllEqual;
}
