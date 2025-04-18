import type { Actor, IAction, IActorOutput, IActorTest, IMediatorArgs, TestResult } from '@comunica/core';
import { Mediator } from '@comunica/core';
import type { IActionContext } from '@comunica/types';
/**
 * A comunica mediator that goes over all actors in sequence and forwards I/O.
 * This required the action input and the actor output to be of the same type.
 */
export declare class MediatorCombinePipeline<A extends Actor<H, T, H, TS>, H extends IAction | (IActorOutput & {
    context: IActionContext;
}), T extends IActorTest, TS = undefined> extends Mediator<A, H, T, H, TS> {
    readonly filterFailures: boolean | undefined;
    readonly order: 'increasing' | 'decreasing' | undefined;
    readonly field: string | undefined;
    constructor(args: IMediatorCombinePipelineArgs<A, H, T, H, TS>);
    mediate(action: H): Promise<H>;
    protected mediateWith(): Promise<TestResult<A, TS>>;
}
export interface IMediatorCombinePipelineArgs<A extends Actor<I, T, O, TS>, I extends IAction, T extends IActorTest, O extends IActorOutput, TS> extends IMediatorArgs<A, I, T, O, TS> {
    /**
     * If actors that throw test errors should be ignored
     */
    filterFailures?: boolean;
    /**
     * The field to use for ordering (if the ordering strategy is chosen).
     * Leave undefined if the test output is a number rather than an object.
     */
    field?: string;
    /**
     * The strategy of ordering the pipeline (increasing or decreasing).
     * For choosing to leave the order of the pipeline unchanged, leave this undefined.
     * For choosing to order by increasing values: 'increasing'.
     * For choosing to order by decreasing values: 'decreasing'.
     */
    order?: 'increasing' | 'decreasing' | undefined;
}
