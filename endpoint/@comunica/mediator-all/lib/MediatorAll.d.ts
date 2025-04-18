import type { Actor, IAction, IActorOutput, IActorTest, IMediatorArgs, TestResult } from '@comunica/core';
import { Mediator } from '@comunica/core';
/**
 * A comunica mediator that runs all actors that resolve their test.
 * This mediator will always resolve to the first actor's output.
 */
export declare class MediatorAll<A extends Actor<I, T, O, TS>, I extends IAction, T extends IActorTest, O extends IActorOutput, TS = undefined> extends Mediator<A, I, T, O, TS> {
    constructor(args: IMediatorArgs<A, I, T, O, TS>);
    mediate(action: I): Promise<O>;
    protected mediateWith(): Promise<TestResult<A, TS>>;
}
