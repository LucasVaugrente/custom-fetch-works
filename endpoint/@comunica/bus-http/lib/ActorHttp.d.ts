/// <reference types="node" />
import type { IAction, IActorArgs, IActorOutput, IActorTest, Mediate } from '@comunica/core';
import { Actor } from '@comunica/core';
/**
 * A base actor for listening to HTTP events.
 *
 * Actor types:
 * * Input:  IActionHttp:      The HTTP request.
 * * Test:   IActorHttpTest:   An estimate for the response time.
 * * Output: IActorHttpOutput: The HTTP response.
 *
 * @see IActionHttp
 * @see IActorHttpTest
 * @see IActorHttpOutput
 */
export declare abstract class ActorHttp<TS = undefined> extends Actor<IActionHttp, IActorTest, IActorHttpOutput, TS> {
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {HTTP request failed: none of the configured actors were able to handle ${action.input}} busFailMessage
     */
    constructor(args: IActorHttpArgs<TS>);
    /**
     * Converts WhatWG streams to Node streams if required.
     * Returns the input in case the stream already is a Node stream.
     * @param {ReadableStream} body
     * @returns {NodeJS.ReadableStream} A node stream.
     */
    static toNodeReadable(body: ReadableStream | null): NodeJS.ReadableStream;
    /**
     * Converts Node streams to WhatWG streams.
     * @param {NodeJS.ReadableStream} body
     * @returns {ReadableStream} A web stream.
     */
    static toWebReadableStream(body: NodeJS.ReadableStream | null): ReadableStream;
    /**
     * Convert the given headers object into a raw hash.
     * @param headers A headers object.
     */
    static headersToHash(headers: Headers): Record<string, string>;
    /**
     * Extract the requested URL from the action input.
     * @param {RequestInfo | URL} input The request input.
     * @returns {URL} The extracted URL.
     */
    static getInputUrl(input: RequestInfo | URL): URL;
    /**
     * Creates an appropriate User-Agent header string for Node.js or other environments.
     * Within browsers, returns undefined, because the value should not be overridden due to potential CORS issues.
     */
    static createUserAgent(actorName: string, actorVersion: string): string | undefined;
    /**
     * Attempts to determine whether the current environment is a browser or not.
     * @returns {boolean} True for browsers and web workers, false for other runtimes.
     */
    static isBrowser(): boolean;
}
/**
 * The HTTP input, which contains the HTTP request.
 */
export interface IActionHttp extends IAction {
    input: RequestInfo;
    init?: RequestInit;
}
/**
 * The HTTP output, which contains the HTTP response.
 */
export interface IActorHttpOutput extends IActorOutput, Response {
}
export type IActorHttpArgs<TS = undefined> = IActorArgs<IActionHttp, IActorTest, IActorHttpOutput, TS>;
export type MediatorHttp = Mediate<IActionHttp, IActorHttpOutput>;
