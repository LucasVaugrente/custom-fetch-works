import type { Actor, IAction, IActorOutput, IActorReply, IActorTest, IMediatorArgs, TestResult } from '@comunica/core';
import { Mediator } from '@comunica/core';
/**
 * A mediator that can mediate over a single number field.
 *
 * It takes the required 'field' and 'type' parameters.
 * The 'field' parameter represents the field name of the test result field over which must be mediated.
 * The 'type' parameter
 */
export declare class MediatorNumber<A extends Actor<I, T, O, TS>, I extends IAction, T extends IActorTest, O extends IActorOutput, TS> extends Mediator<A, I, T, O, TS> implements IMediatorNumberArgs<A, I, T, O, TS> {
    readonly field: string;
    readonly type: 'min' | 'max';
    readonly ignoreFailures: boolean;
    readonly indexPicker: (tests: T[]) => number;
    constructor(args: IMediatorNumberArgs<A, I, T, O, TS>);
    /**
     * @return {(tests: T[]) => number} A function that returns the index of the test result
     *                                  that has been chosen by this mediator.
     */
    protected createIndexPicker(): (tests: (T | undefined)[]) => number;
    protected getOrDefault(value: number | undefined, defaultValue: number): number;
    protected mediateWith(action: I, testResults: IActorReply<A, I, T, O, TS>[]): Promise<TestResult<A, TS>>;
}
export interface IMediatorNumberArgs<A extends Actor<I, T, O, TS>, I extends IAction, T extends IActorTest, O extends IActorOutput, TS> extends IMediatorArgs<A, I, T, O, TS> {
    /**
     * The field name of the test result field over which must be mediated.
     */
    field: string;
    /**
     * The way how the index should be selected.
     * For choosing the minimum value: 'min'.
     * For choosing the maximum value: 'max'.
     */
    type: 'min' | 'max';
    /**
     * If actors that throw fail tests should be ignored
     */
    ignoreFailures?: boolean;
}
