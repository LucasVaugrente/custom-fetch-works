import type { Actor, IAction, IActorOutput, IActorReply, IActorTest, IMediatorArgs, TestResult } from '@comunica/core';
import { Mediator } from '@comunica/core';
/**
 * A mediator that picks the first actor that resolves its test.
 */
export declare class MediatorRace<A extends Actor<I, T, O, TS>, I extends IAction, T extends IActorTest, O extends IActorOutput, TS = undefined> extends Mediator<A, I, T, O, TS> {
    constructor(args: IMediatorArgs<A, I, T, O, TS>);
    protected mediateWith(action: I, testResults: IActorReply<A, I, T, O, TS>[]): Promise<TestResult<A, TS>>;
}
