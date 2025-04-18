import type { IActionHttp, IActorHttpOutput, IActorHttpArgs, MediatorHttp } from '@comunica/bus-http';
import { ActorHttp } from '@comunica/bus-http';
import type { ActorHttpInvalidateListenable, IActionHttpInvalidate } from '@comunica/bus-http-invalidate';
import type { TestResult } from '@comunica/core';
import type { IMediatorTypeTime } from '@comunica/mediatortype-time';
export declare class ActorHttpLimitRate extends ActorHttp {
    private readonly hostData;
    private readonly correctionMultiplier;
    private readonly failureMultiplier;
    private readonly limitByDefault;
    private readonly allowOverlap;
    private readonly httpInvalidator;
    private readonly mediatorHttp;
    private static readonly keyWrapped;
    constructor(args: IActorHttpLimitRateArgs);
    test(action: IActionHttp): Promise<TestResult<IMediatorTypeTime>>;
    run(action: IActionHttp): Promise<IActorHttpOutput>;
    /**
     * Handles HTTP cache invalidation events.
     * @param {IActionHttpInvalidate} action The invalidation action
     */
    handleHttpInvalidateEvent(action: IActionHttpInvalidate): void;
}
export interface IActorHttpLimitRateArgs extends IActorHttpArgs {
    /**
     * The HTTP mediator.
     */
    mediatorHttp: MediatorHttp;
    /**
     * An actor that listens to HTTP invalidation events
     * @default {<default_invalidator> a <npmd:@comunica/bus-http-invalidate/^4.0.0/components/ActorHttpInvalidateListenable.jsonld#ActorHttpInvalidateListenable>}
     */
    httpInvalidator: ActorHttpInvalidateListenable;
    /**
     * Multiplier for how aggressively the delay should follow the latest response time, ideally in range ]0.0, 1.0].
     * @range {float}
     * @default {0.1}
     */
    correctionMultiplier: number;
    /**
     * The response time of a failed request is taken into account with this multiplier applied.
     * @range {float}
     * @default {10.0}
     */
    failureMultiplier: number;
    /**
     * Whether rate limiting should be applied from the first request onwards, instead of waiting for a request to fail.
     * Enabling this behaviour can help avoid spamming a server with large amounts of requests when execution begins.
     * @range {boolean}
     * @default {false}
     */
    limitByDefault: boolean;
    /**
     * Whether requests should be allowed to overlap, instead of being effectively queued one after another for a host.
     * Enabling this behaviour may help with overall performance, but will make the rate limiter less accurate,
     * and make it impossible for the limiter to smooth out large bursts of requests to a given host.
     * @range {boolean}
     * @default {false}
     */
    allowOverlap: boolean;
}
