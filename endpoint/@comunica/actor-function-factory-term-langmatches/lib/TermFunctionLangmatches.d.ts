import { TermFunctionBase } from '@comunica/bus-function-factory';
/**
 * https://www.w3.org/TR/sparql11-query/#func-langMatches
 */
export declare class TermFunctionLangmatches extends TermFunctionBase {
    constructor();
    private static langMatches;
    private static isWildCard;
    private static matchLangTag;
}
