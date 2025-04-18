/// <reference types="node" />
import { Agent as HttpAgent } from 'node:http';
import type { IFetchInitPreprocessor } from './IFetchInitPreprocessor';
/**
 * Overrides the HTTP agent to perform better in Node.js.
 */
export declare class FetchInitPreprocessor implements IFetchInitPreprocessor {
    private readonly agent;
    constructor(agentOptions: any);
    handle(init: RequestInit): Promise<RequestInit & {
        agent: (url: URL) => HttpAgent;
    }>;
}
