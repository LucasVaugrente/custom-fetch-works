import type { IActionHttp, IActorHttpOutput, MediatorHttp, IActorHttpArgs } from '@comunica/bus-http';
import { ActorHttp } from '@comunica/bus-http';
import type { TestResult } from '@comunica/core';
import type { IMediatorTypeTime } from '@comunica/mediatortype-time';
/**
 * A comunica Proxy Http Actor.
 */
export declare class ActorHttpProxy extends ActorHttp {
    readonly mediatorHttp: MediatorHttp;
    constructor(args: IActorHttpProxyArgs);
    test(action: IActionHttp): Promise<TestResult<IMediatorTypeTime>>;
    run(action: IActionHttp): Promise<IActorHttpOutput>;
}
export interface IActorHttpProxyArgs extends IActorHttpArgs {
    /**
     * The HTTP mediator
     */
    mediatorHttp: MediatorHttp;
}
