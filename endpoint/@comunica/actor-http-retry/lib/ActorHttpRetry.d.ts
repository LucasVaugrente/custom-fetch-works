import type { IActionHttp, IActorHttpOutput, IActorHttpArgs, MediatorHttp } from '@comunica/bus-http';
import { ActorHttp } from '@comunica/bus-http';
import type { ActorHttpInvalidateListenable, IActionHttpInvalidate } from '@comunica/bus-http-invalidate';
import type { TestResult } from '@comunica/core';
import type { IMediatorTypeTime } from '@comunica/mediatortype-time';
export declare class ActorHttpRetry extends ActorHttp {
    private readonly activeDelays;
    private readonly httpInvalidator;
    private readonly mediatorHttp;
    private static readonly dateRegex;
    private static readonly numberRegex;
    private static readonly keyWrapped;
    constructor(args: IActorHttpQueueArgs);
    test(action: IActionHttp): Promise<TestResult<IMediatorTypeTime>>;
    run(action: IActionHttp): Promise<IActorHttpOutput>;
    /**
     * Sleeps for the specified amount of time, using a timeout
     * @param {number} ms The amount of milliseconds to sleep
     */
    static sleep(ms: number): Promise<void>;
    /**
     * Parses a Retry-After HTTP header value following the specification:
     * https://httpwg.org/specs/rfc9110.html#field.retry-after
     * @param {string} retryAfter The raw header value as string
     * @returns The parsed Date object, or undefined in case of invalid header value
     */
    static parseRetryAfterHeader(retryAfter: string): Date | undefined;
    /**
     * Handles HTTP cache invalidation events.
     * @param {IActionHttpInvalidate} action The invalidation action
     */
    handleHttpInvalidateEvent(action: IActionHttpInvalidate): void;
}
export interface IActorHttpQueueArgs extends IActorHttpArgs {
    /**
     * The HTTP mediator.
     */
    mediatorHttp: MediatorHttp;
    /**
     * An actor that listens to HTTP invalidation events
     * @default {<default_invalidator> a <npmd:@comunica/bus-http-invalidate/^4.0.0/components/ActorHttpInvalidateListenable.jsonld#ActorHttpInvalidateListenable>}
     */
    httpInvalidator: ActorHttpInvalidateListenable;
}
