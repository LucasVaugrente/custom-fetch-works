import type { ITermFunction } from '@comunica/bus-function-factory';
import { TermFunctionBase } from '@comunica/bus-function-factory';
export declare class TermFunctionGreaterThanEqual extends TermFunctionBase {
    private readonly lessThanEqualFunction;
    constructor(lessThanEqualFunction: ITermFunction);
}
