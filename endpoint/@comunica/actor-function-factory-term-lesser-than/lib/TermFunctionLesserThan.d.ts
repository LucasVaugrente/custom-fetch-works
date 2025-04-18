import type { ITermFunction } from '@comunica/bus-function-factory';
import { TermFunctionBase } from '@comunica/bus-function-factory';
export declare class TermFunctionLesserThan extends TermFunctionBase {
    private readonly equalityFunction;
    constructor(equalityFunction: ITermFunction);
    private quadComponentTest;
}
