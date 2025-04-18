import type { IAction, IActorArgs, IActorTest } from '@comunica/core';
import { Actor } from '@comunica/core';
import type { IActionContext } from '@comunica/types';
import { Readable } from 'readable-stream';
import type { IActorDereferenceOutput } from '.';
export declare function emptyReadable<S extends Readable>(): S;
/**
 * Check if hard errors should occur on HTTP or parse errors.
 * @param {IActionContext} context An action context.
 * @return {boolean} If hard errors are enabled.
 */
export declare function isHardError(context: IActionContext): boolean;
/**
 * A base actor for dereferencing URLs to (generic) streams.
 *
 * Actor types:
 * * Input:  IActionDereference:      A URL.
 * * Test:   <none>
 * * Output: IActorDereferenceOutput: A Readable stream
 *
 * @see IActionDereference
 * @see IActorDereferenceOutput
 */
export declare abstract class ActorDereferenceBase<I extends IAction, T extends IActorTest, O extends IActorDereferenceOutput, TS = undefined> extends Actor<I, T, O, TS> {
    constructor(args: IActorArgs<I, T, O, TS>);
    /**
     * Handle the given error as a rejection or delegate it to the logger,
     * depending on whether or not hard errors are enabled.
     * @param {I} action An action.
     * @param {Error} error An error that has occurred.
     * @param {N} output Data to add to the output
     */
    protected dereferenceErrorHandler<N, M extends Readable>(action: I, error: unknown, output: N): Promise<N & {
        data: M;
    }>;
}
