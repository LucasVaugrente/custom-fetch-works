/// <reference types="node" />
/// <reference types="node" />
import { EventEmitter } from 'node:events';
import type { IncomingHttpHeaders } from 'node:http';
export default class Requester {
    private negotiatedResources;
    constructor();
    createRequest(settings: any): EventEmitter;
    convertRequestHeadersToFetchHeaders(headers: IncomingHttpHeaders): Headers;
    private removeQuery;
}
