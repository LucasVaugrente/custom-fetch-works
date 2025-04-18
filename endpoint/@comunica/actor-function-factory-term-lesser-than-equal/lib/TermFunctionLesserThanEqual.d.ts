import type { ITermFunction } from '@comunica/bus-function-factory';
import { TermFunctionBase } from '@comunica/bus-function-factory';
export declare class TermFunctionLesserThanEqual extends TermFunctionBase {
    private readonly equalityFunction;
    private readonly lessThanFunction;
    constructor(equalityFunction: ITermFunction, lessThanFunction: ITermFunction);
}
