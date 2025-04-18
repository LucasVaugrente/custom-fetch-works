import type { IActionHttp, IActorHttpOutput, IActorHttpArgs } from '@comunica/bus-http';
import { ActorHttp } from '@comunica/bus-http';
import type { TestResult } from '@comunica/core';
import type { IMediatorTypeTime } from '@comunica/mediatortype-time';
/**
 * A comunica Follow Redirects Http Actor.
 */
export declare class ActorHttpNative extends ActorHttp {
    private static readonly userAgent;
    private readonly requester;
    constructor(args: IActorHttpNativeArgs);
    test(_action: IActionHttp): Promise<TestResult<IMediatorTypeTime>>;
    run(action: IActionHttp): Promise<IActorHttpOutput>;
}
export interface IActorHttpNativeArgs extends IActorHttpArgs {
    /**
     * The agent options for the HTTP agent
     * @range {json}
     * @default {{ "keepAlive": true, "maxSockets": 5 }}
     */
    agentOptions?: Record<string, any>;
}
