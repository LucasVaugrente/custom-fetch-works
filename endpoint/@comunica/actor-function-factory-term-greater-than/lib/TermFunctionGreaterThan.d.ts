import type { ITermFunction } from '@comunica/bus-function-factory';
import { TermFunctionBase } from '@comunica/bus-function-factory';
export declare class TermFunctionGreaterThan extends TermFunctionBase {
    private readonly lessThanFunction;
    constructor(lessThanFunction: ITermFunction);
}
