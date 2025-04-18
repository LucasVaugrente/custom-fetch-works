import type { IActorContextPreprocessOutput, IActorContextPreprocessArgs } from '@comunica/bus-context-preprocess';
import { ActorContextPreprocess } from '@comunica/bus-context-preprocess';
import type { IActorTest, IAction, TestResult } from '@comunica/core';
/**
 * A comunica Query Source Skolemize Context Preprocess Actor.
 */
export declare class ActorContextPreprocessQuerySourceSkolemize extends ActorContextPreprocess {
    constructor(args: IActorContextPreprocessArgs);
    test(_action: IAction): Promise<TestResult<IActorTest>>;
    run(action: IAction): Promise<IActorContextPreprocessOutput>;
}
