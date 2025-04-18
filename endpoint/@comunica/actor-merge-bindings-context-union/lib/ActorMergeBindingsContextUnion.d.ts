import type { IActionMergeBindingsContext, IActorMergeBindingsContextOutput, IActorMergeBindingsContextArgs } from '@comunica/bus-merge-bindings-context';
import { ActorMergeBindingsContext } from '@comunica/bus-merge-bindings-context';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Union Merge Bindings Context Actor.
 */
export declare class ActorMergeBindingsContextUnion extends ActorMergeBindingsContext {
    private readonly contextKey;
    constructor(args: IActorMergeBindingsContextUnionArgs);
    test(_action: IActionMergeBindingsContext): Promise<TestResult<IActorTest>>;
    run(_action: IActionMergeBindingsContext): Promise<IActorMergeBindingsContextOutput>;
}
export interface IActorMergeBindingsContextUnionArgs extends IActorMergeBindingsContextArgs {
    /**
     * The context key name to merge over.
     */
    contextKey: string;
}
