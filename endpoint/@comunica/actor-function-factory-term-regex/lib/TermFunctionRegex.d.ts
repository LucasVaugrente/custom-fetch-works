import { TermFunctionBase } from '@comunica/bus-function-factory';
/**
 * https://www.w3.org/TR/sparql11-query/#func-regex
 */
export declare class TermFunctionRegex extends TermFunctionBase {
    constructor();
    private static regex2;
    private static regex3;
    private static matches;
    static cleanFlags(flags: string): string;
    static flagX(pattern: string): string;
    static flagQ(pattern: string): string;
}
