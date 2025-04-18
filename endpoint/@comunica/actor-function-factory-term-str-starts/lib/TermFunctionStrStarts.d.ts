import { TermFunctionBase } from '@comunica/bus-function-factory';
/**
 * https://www.w3.org/TR/sparql11-query/#func-strstarts
 * for this and the following functions you'll see (string, langstring) is not allowed. This behaviour is defined in:
 * https://www.w3.org/TR/sparql11-query/#func-arg-compatibility
 */
export declare class TermFunctionStrStarts extends TermFunctionBase {
    constructor();
}
