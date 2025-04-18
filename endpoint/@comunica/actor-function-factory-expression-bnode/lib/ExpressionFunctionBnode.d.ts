import { ExpressionFunctionBase } from '@comunica/bus-function-factory';
import type { Expression } from '@comunica/types';
/**
 * https://www.w3.org/TR/sparql11-query/#func-bnode
 * id has to be distinct over all id's in dataset
 */
export declare class ExpressionFunctionBnode extends ExpressionFunctionBase {
    /**
     * This OverloadTree with the constant function will handle both type promotion and subtype-substitution
     */
    private static readonly bnodeTree;
    /**
     * A counter that keeps track blank node generated through BNODE() SPARQL
     * expressions.
     */
    private static bnodeCounter;
    constructor();
    checkArity(args: Expression[]): boolean;
}
