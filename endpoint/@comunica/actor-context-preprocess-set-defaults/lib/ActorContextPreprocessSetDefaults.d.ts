import type { IActorContextPreprocessOutput, IActorContextPreprocessArgs, IActionContextPreprocess } from '@comunica/bus-context-preprocess';
import { ActorContextPreprocess } from '@comunica/bus-context-preprocess';
import type { IAction, IActorTest, TestResult } from '@comunica/core';
import type { Logger } from '@comunica/types';
/**
 * A comunica Set Defaults Context Preprocess Actor.
 */
export declare class ActorContextPreprocessSetDefaults extends ActorContextPreprocess {
    private readonly defaultFunctionArgumentsCache;
    readonly logger: Logger;
    constructor(args: IActorContextPreprocessSetDefaultsArgs);
    test(_action: IAction): Promise<TestResult<IActorTest>>;
    run(action: IActionContextPreprocess): Promise<IActorContextPreprocessOutput>;
}
export interface IActorContextPreprocessSetDefaultsArgs extends IActorContextPreprocessArgs {
    /**
     * The logger of this actor
     * @default {a <npmd:@comunica/logger-void/^4.0.0/components/LoggerVoid.jsonld#LoggerVoid>}
     */
    logger: Logger;
}
