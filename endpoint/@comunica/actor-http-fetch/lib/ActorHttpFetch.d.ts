import type { IActionHttp, IActorHttpOutput, IActorHttpArgs } from '@comunica/bus-http';
import { ActorHttp } from '@comunica/bus-http';
import type { TestResult } from '@comunica/core';
import type { IMediatorTypeTime } from '@comunica/mediatortype-time';
export declare class ActorHttpFetch extends ActorHttp {
    private readonly fetchInitPreprocessor;
    private static readonly userAgent;
    constructor(args: IActorHttpFetchArgs);
    test(_action: IActionHttp): Promise<TestResult<IMediatorTypeTime>>;
    run(action: IActionHttp): Promise<IActorHttpOutput>;
    /**
     * Prepares the request headers, taking into account the environment.
     * @param {IActionHttp} action The HTTP action
     * @returns {Headers} Headers
     */
    prepareRequestHeaders(action: IActionHttp): Headers;
    /**
     * Converts a string, including ones with Unicode symbols, to Base64 encoding.
     * This function was adapted from the MDN example function here:
     * https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
     * @param {string} value The string value to encode
     * @returns {string} The Base64-encoded value
     */
    static stringToBase64(value: string): string;
}
export interface IActorHttpFetchArgs extends IActorHttpArgs {
    /**
     * The agent options for the HTTP agent
     * @range {json}
     * @default {{ "keepAlive": true, "maxSockets": 5 }}
     */
    agentOptions?: Record<string, any>;
}
