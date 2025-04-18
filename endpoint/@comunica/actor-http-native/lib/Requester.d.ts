/// <reference types="node" />
/// <reference types="node" />
import { EventEmitter } from 'node:events';
import type { AgentOptions, IncomingHttpHeaders } from 'node:http';
export default class Requester {
    private readonly agents;
    constructor(agentOptions?: AgentOptions);
    createRequest(settings: any): EventEmitter;
    convertRequestHeadersToFetchHeaders(headers: IncomingHttpHeaders): Headers;
    private decode;
}
