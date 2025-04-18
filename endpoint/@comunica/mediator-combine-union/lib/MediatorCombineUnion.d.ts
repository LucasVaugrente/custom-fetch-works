import type { Actor, IAction, IActorOutput, IActorTest, IMediatorArgs, TestResult } from '@comunica/core';
import { Mediator } from '@comunica/core';
/**
 * A comunica mediator that takes the union of all actor results.
 *
 * The actors that are registered first will have priority on setting overlapping fields.
 */
export declare class MediatorCombineUnion<A extends Actor<I, T, O, TS>, I extends IAction, T extends IActorTest, O extends IActorOutput, TS = undefined> extends Mediator<A, I, T, O, TS> implements IMediatorCombineUnionArgs<A, I, T, O, TS> {
    readonly filterFailures: boolean | undefined;
    readonly field: string;
    readonly combiner: (results: O[]) => O;
    constructor(args: IMediatorCombineUnionArgs<A, I, T, O, TS>);
    mediate(action: I): Promise<O>;
    protected mediateWith(): Promise<TestResult<any, TS>>;
    protected createCombiner(): (results: O[]) => O;
}
export interface IMediatorCombineUnionArgs<A extends Actor<I, T, O, TS>, I extends IAction, T extends IActorTest, O extends IActorOutput, TS = undefined> extends IMediatorArgs<A, I, T, O, TS> {
    /**
     * If actors that throw test errors should be ignored
     */
    filterFailures?: boolean;
    /**
     * The field name of the test result field over which must be mediated.
     */
    field: string;
}
