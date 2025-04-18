/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import type { EventEmitter } from 'node:events';
import * as http from 'node:http';
import type { Writable } from 'node:stream';
import type { ICliArgsHandler } from '@comunica/types';
import type { IDynamicQueryEngineOptions } from '..';
import { QueryEngineBase } from '..';
/**
 * An HTTP service that exposes a Comunica engine as a SPARQL endpoint.
 */
export declare class HttpServiceSparqlEndpoint {
    static readonly MIME_PLAIN = "text/plain";
    static readonly MIME_JSON = "application/json";
    readonly engine: Promise<QueryEngineBase>;
    readonly context: any;
    readonly timeout: number;
    readonly port: number;
    readonly workers: number;
    readonly freshWorkerPerQuery: boolean;
    readonly contextOverride: boolean;
    lastQueryId: number;
    constructor(args: IHttpServiceSparqlEndpointArgs);
    /**
     * Starts the server
     * @param {string[]} argv The commandline arguments that the script was called with
     * @param {module:stream.internal.Writable} stdout The output stream to log to.
     * @param {module:stream.internal.Writable} stderr The error stream to log errors to.
     * @param {string} moduleRootPath The path to the invoking module.
     * @param {NodeJS.ProcessEnv} env The process env to get constants from.
     * @param {string} defaultConfigPath The path to get the config from if none is defined in the environment.
     * @param {(code: number) => void} exit The callback to invoke to stop the script.
     * @param {ICliArgsHandler[]} cliArgsHandlers Enables manipulation of the CLI arguments and their processing.
     * @return {Promise<void>} A promise that resolves when the server has been started.
     */
    static runArgsInProcess(argv: string[], stdout: Writable, stderr: Writable, moduleRootPath: string, env: NodeJS.ProcessEnv, defaultConfigPath: string, exit: (code: number) => void, cliArgsHandlers?: ICliArgsHandler[]): Promise<void>;
    /**
     * Takes parsed commandline arguments and turns them into an object used in the HttpServiceSparqlEndpoint constructor
     * @param {args: string[]} argv The commandline arguments that the script was called with
     * @param {string} moduleRootPath The path to the invoking module.
     * @param {NodeJS.ProcessEnv} env The process env to get constants from.
     * @param {string} defaultConfigPath The path to get the config from if none is defined in the environment.
     * @param stderr The error stream.
     * @param exit An exit process callback.
     * @param {ICliArgsHandler[]} cliArgsHandlers Enables manipulation of the CLI arguments and their processing.
     */
    static generateConstructorArguments(argv: string[], moduleRootPath: string, env: NodeJS.ProcessEnv, defaultConfigPath: string, stderr: Writable, exit: (code: number) => void, cliArgsHandlers: ICliArgsHandler[]): Promise<IHttpServiceSparqlEndpointArgs>;
    /**
     * Start the HTTP service.
     * @param {module:stream.internal.Writable} stdout The output stream to log to.
     * @param {module:stream.internal.Writable} stderr The error stream to log errors to.
     */
    run(stdout: Writable, stderr: Writable): Promise<void>;
    /**
     * Start the HTTP service as master.
     * @param {module:stream.internal.Writable} stdout The output stream to log to.
     * @param {module:stream.internal.Writable} stderr The error stream to log errors to.
     */
    runMaster(stdout: Writable, stderr: Writable): Promise<void>;
    /**
     * Start the HTTP service as worker.
     * @param {module:stream.internal.Writable} stdout The output stream to log to.
     * @param {module:stream.internal.Writable} stderr The error stream to log errors to.
     */
    runWorker(stdout: Writable, stderr: Writable): Promise<void>;
    /**
     * Handles an HTTP request.
     * @param {QueryEngineBase} engine A SPARQL engine.
     * @param {{type: string; quality: number}[]} variants Allowed variants.
     * @param {module:stream.internal.Writable} stdout Output stream.
     * @param {module:stream.internal.Writable} stderr Error output stream.
     * @param {module:http.IncomingMessage} request Request object.
     * @param {module:http.ServerResponse} response Response object.
     */
    handleRequest(engine: QueryEngineBase, variants: {
        type: string;
        quality: number;
    }[], stdout: Writable, stderr: Writable, request: http.IncomingMessage, response: http.ServerResponse): Promise<void>;
    /**
     * Writes the result of the given SPARQL query.
     * @param {QueryEngineBase} engine A SPARQL engine.
     * @param {module:stream.internal.Writable} stdout Output stream.
     * @param {module:stream.internal.Writable} stderr Error output stream.
     * @param {module:http.IncomingMessage} request Request object.
     * @param {module:http.ServerResponse} response Response object.
     * @param {IQueryBody | undefined} queryBody The query body.
     * @param {string} mediaType The requested response media type.
     * @param {boolean} headOnly If only the header should be written.
     * @param {boolean} readOnly If only data can be read, but not updated. (i.e., if we're in a GET request)
     * @param queryId The unique id of this query.
     */
    writeQueryResult(engine: QueryEngineBase, stdout: Writable, stderr: Writable, request: http.IncomingMessage, response: http.ServerResponse, queryBody: IQueryBody | undefined, mediaType: string, headOnly: boolean, readOnly: boolean, queryId: number): Promise<void>;
    writeServiceDescription(engine: QueryEngineBase, stdout: Writable, stderr: Writable, request: http.IncomingMessage, response: http.ServerResponse, mediaType: string, headOnly: boolean): Promise<void>;
    /**
     * Stop after timeout or if the connection is terminated
     * @param {module:http.ServerResponse} response Response object.
     * @param queryId The unique query id.
     * @param stderr Error stream to write to.
     * @param {NodeJS.ReadableStream} eventEmitter Query result stream.
     */
    stopResponse(response: http.ServerResponse, queryId: number, stderr: Writable, eventEmitter?: EventEmitter): void;
    /**
     * Parses the body of a SPARQL POST request
     * @param {module:http.IncomingMessage} request Request object.
     * @return {Promise<IQueryBody>} A promise resolving to a query body object.
     */
    parseBody(request: http.IncomingMessage): Promise<IQueryBody>;
}
export interface IQueryBody {
    type: 'query' | 'void';
    value: string;
    context: Record<string, any> | undefined;
}
export interface IHttpServiceSparqlEndpointArgs extends IDynamicQueryEngineOptions {
    context?: any;
    timeout?: number;
    port?: number;
    workers?: number;
    freshWorkerPerQuery?: boolean;
    contextOverride?: boolean;
    moduleRootPath: string;
    defaultConfigPath: string;
}
