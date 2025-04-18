import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionHttpInvalidate, IActorHttpInvalidateOutput, IActorHttpInvalidateArgs } from './ActorHttpInvalidate';
import { ActorHttpInvalidate } from './ActorHttpInvalidate';
/**
 * An ActorHttpInvalidate actor that allows listeners to be attached.
 *
 * @see ActorHttpInvalidate
 */
export declare class ActorHttpInvalidateListenable extends ActorHttpInvalidate {
    private readonly invalidateListeners;
    constructor(args: IActorHttpInvalidateArgs);
    addInvalidateListener(listener: IInvalidateListener): void;
    test(_action: IActionHttpInvalidate): Promise<TestResult<IActorTest>>;
    run(action: IActionHttpInvalidate): Promise<IActorHttpInvalidateOutput>;
}
/**
 * Called when a {@link IActionHttpInvalidate} is received.
 */
export type IInvalidateListener = (action: IActionHttpInvalidate) => void;
