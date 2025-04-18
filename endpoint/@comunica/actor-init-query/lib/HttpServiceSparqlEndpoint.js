"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpServiceSparqlEndpoint = void 0;
const http = require("node:http");
const querystring = require("node:querystring");
const url = require("node:url");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const asynciterator_1 = require("asynciterator");
const yargs_1 = require("yargs");
const __1 = require("..");
const CliArgsHandlerBase_1 = require("./cli/CliArgsHandlerBase");
const CliArgsHandlerHttp_1 = require("./cli/CliArgsHandlerHttp");
// Use require instead of import for default exports, to be compatible with variants of esModuleInterop in tsconfig.
const clusterUntyped = require('node:cluster');
const process = require('process/');
const quad = require('rdf-quad');
// Force type on Cluster, because there are issues with the Node.js typings since v18
const cluster = clusterUntyped;
/**
 * An HTTP service that exposes a Comunica engine as a SPARQL endpoint.
 */
class HttpServiceSparqlEndpoint {
    constructor(args) {
        this.lastQueryId = 0;
        this.context = args.context || {};
        this.timeout = args.timeout ?? 60_000;
        this.port = args.port ?? 3_000;
        this.workers = args.workers ?? 1;
        this.freshWorkerPerQuery = Boolean(args.freshWorkerPerQuery);
        this.contextOverride = Boolean(args.contextOverride);
        this.engine = new __1.QueryEngineFactoryBase(args.moduleRootPath, args.defaultConfigPath, actorInitQuery => new __1.QueryEngineBase(actorInitQuery)).create(args);
    }
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
    static async runArgsInProcess(argv, stdout, stderr, moduleRootPath, env, defaultConfigPath, exit, cliArgsHandlers = []) {
        const options = await HttpServiceSparqlEndpoint
            .generateConstructorArguments(argv, moduleRootPath, env, defaultConfigPath, stderr, exit, cliArgsHandlers);
        return new Promise((resolve) => {
            new HttpServiceSparqlEndpoint(options || {}).run(stdout, stderr)
                .then(resolve)
                .catch((error) => {
                stderr.write(error);
                exit(1);
                resolve();
            });
        });
    }
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
    static async generateConstructorArguments(argv, moduleRootPath, env, defaultConfigPath, stderr, exit, cliArgsHandlers) {
        // Populate yargs arguments object
        cliArgsHandlers = [
            new CliArgsHandlerBase_1.CliArgsHandlerBase(),
            new CliArgsHandlerHttp_1.CliArgsHandlerHttp(),
            ...cliArgsHandlers,
        ];
        let argumentsBuilder = (0, yargs_1.default)([]);
        for (const cliArgsHandler of cliArgsHandlers) {
            argumentsBuilder = cliArgsHandler.populateYargs(argumentsBuilder);
        }
        // Extract raw argument values from parsed yargs object, so that we can handle each of them hereafter
        let args;
        try {
            args = await argumentsBuilder.parse(argv);
        }
        catch (error) {
            stderr.write(`${await argumentsBuilder.getHelp()}\n\n${error.message}\n`);
            return exit(1);
        }
        // Invoke args handlers to process any remaining args
        const context = {};
        try {
            for (const cliArgsHandler of cliArgsHandlers) {
                await cliArgsHandler.handleArgs(args, context);
            }
        }
        catch (error) {
            stderr.write(`${error.message}/n`);
            exit(1);
        }
        const freshWorkerPerQuery = args.freshWorker;
        const contextOverride = args.contextOverride;
        const port = args.port;
        const timeout = args.timeout * 1_000;
        const workers = args.workers;
        context[context_entries_1.KeysQueryOperation.readOnly.name] = !args.u;
        const configPath = env.COMUNICA_CONFIG ? env.COMUNICA_CONFIG : defaultConfigPath;
        return {
            defaultConfigPath,
            configPath,
            context,
            freshWorkerPerQuery,
            contextOverride,
            moduleRootPath,
            mainModulePath: moduleRootPath,
            port,
            timeout,
            workers,
        };
    }
    /**
     * Start the HTTP service.
     * @param {module:stream.internal.Writable} stdout The output stream to log to.
     * @param {module:stream.internal.Writable} stderr The error stream to log errors to.
     */
    run(stdout, stderr) {
        if (cluster.isMaster) {
            return this.runMaster(stdout, stderr);
        }
        return this.runWorker(stdout, stderr);
    }
    /**
     * Start the HTTP service as master.
     * @param {module:stream.internal.Writable} stdout The output stream to log to.
     * @param {module:stream.internal.Writable} stderr The error stream to log errors to.
     */
    async runMaster(stdout, stderr) {
        stderr.write(`Server running on http://localhost:${this.port}/sparql\n`);
        // Create workers
        for (let i = 0; i < this.workers; i++) {
            cluster.fork();
        }
        // Attach listeners to each new worker
        cluster.on('listening', (worker) => {
            // Respawn crashed workers
            worker.once('exit', (code, signal) => {
                if (!worker.exitedAfterDisconnect) {
                    if (code === 9 || signal === 'SIGKILL') {
                        stderr.write(`Worker ${worker.process.pid} forcefully killed with ${code || signal}. Killing main process as well.\n`);
                        cluster.disconnect();
                    }
                    else {
                        stderr.write(`Worker ${worker.process.pid} died with ${code || signal}. Starting new worker.\n`);
                        cluster.fork();
                    }
                }
            });
            // Handle worker timeouts
            const workerTimeouts = {};
            worker.on('message', ({ type, queryId }) => {
                if (type === 'start') {
                    stderr.write(`Worker ${worker.process.pid} got assigned a new query (${queryId}).\n`);
                    workerTimeouts[queryId] = setTimeout(() => {
                        try {
                            if (worker.isConnected()) {
                                stderr.write(`Worker ${worker.process.pid} timed out for query ${queryId}.\n`);
                                worker.send('shutdown');
                            }
                        }
                        catch (error) {
                            stderr.write(`Unable to timeout worker ${worker.process.pid}: ${error.message}.\n`);
                        }
                        delete workerTimeouts[queryId];
                    }, this.timeout);
                }
                else if (type === 'end' && workerTimeouts[queryId]) {
                    stderr.write(`Worker ${worker.process.pid} has completed query ${queryId}.\n`);
                    clearTimeout(workerTimeouts[queryId]);
                    delete workerTimeouts[queryId];
                }
            });
        });
        // Disconnect from cluster on SIGINT, so that the process can cleanly terminate
        process.once('SIGINT', () => {
            cluster.disconnect();
        });
    }
    /**
     * Start the HTTP service as worker.
     * @param {module:stream.internal.Writable} stdout The output stream to log to.
     * @param {module:stream.internal.Writable} stderr The error stream to log errors to.
     */
    async runWorker(stdout, stderr) {
        const engine = await this.engine;
        // Determine the allowed media types for requests
        const mediaTypes = await engine.getResultMediaTypes();
        const variants = [];
        for (const type of Object.keys(mediaTypes)) {
            variants.push({ type, quality: mediaTypes[type] });
        }
        // Start the server
        // eslint-disable-next-line ts/no-misused-promises
        const server = http.createServer(this.handleRequest.bind(this, engine, variants, stdout, stderr));
        server.listen(this.port);
        stderr.write(`Server worker (${process.pid}) running on http://localhost:${this.port}/sparql\n`);
        // Keep track of all open connections
        const openConnections = new Set();
        server.on('request', (request, response) => {
            openConnections.add(response);
            response.on('close', () => {
                openConnections.delete(response);
            });
        });
        // Subscribe to shutdown messages
        // eslint-disable-next-line ts/no-misused-promises
        process.on('message', async (message) => {
            if (message === 'shutdown') {
                stderr.write(`Shutting down worker ${process.pid} with ${openConnections.size} open connections.\n`);
                // Stop new connections from being accepted
                server.close();
                // Close all open connections
                for (const connection of openConnections) {
                    await new Promise(resolve => connection.end('!TIMEDOUT!', resolve));
                }
                // Kill the worker once the connections have been closed
                process.exit(15);
            }
        });
        // Catch global errors, and cleanly close open connections
        // eslint-disable-next-line ts/no-misused-promises
        process.on('uncaughtException', async (error) => {
            stderr.write(`Terminating worker ${process.pid} with ${openConnections.size} open connections due to uncaught exception.\n`);
            stderr.write(error.stack);
            // Stop new connections from being accepted
            server.close();
            // Close all open connections
            for (const connection of openConnections) {
                await new Promise(resolve => connection.end('!ERROR!', resolve));
            }
            // Kill the worker once the connections have been closed
            process.exit(15);
        });
    }
    /**
     * Handles an HTTP request.
     * @param {QueryEngineBase} engine A SPARQL engine.
     * @param {{type: string; quality: number}[]} variants Allowed variants.
     * @param {module:stream.internal.Writable} stdout Output stream.
     * @param {module:stream.internal.Writable} stderr Error output stream.
     * @param {module:http.IncomingMessage} request Request object.
     * @param {module:http.ServerResponse} response Response object.
     */
    async handleRequest(engine, variants, stdout, stderr, request, response) {
        const negotiated = require('negotiate').choose(variants, request)
            .sort((first, second) => second.qts - first.qts);
        const variant = request.headers.accept ? negotiated[0] : null;
        // Require qts strictly larger than 2, as 1 and 2 respectively allow * and */* matching.
        // For qts 0, 1, and 2, we fallback to our built-in media type defaults, for which we pass null.
        const mediaType = variant && variant.qts > 2 ? variant.type : null;
        // Verify the path
        // eslint-disable-next-line node/no-deprecated-api
        const requestUrl = url.parse(request.url ?? '', true);
        if (requestUrl.pathname === '/' || request.url === '/') {
            stdout.write('[301] Permanently moved. Redirected to /sparql.');
            response.writeHead(301, { 'content-type': HttpServiceSparqlEndpoint.MIME_JSON, 'Access-Control-Allow-Origin': '*', Location: `http://localhost:${this.port}/sparql${requestUrl.search ?? ''}` });
            response.end(JSON.stringify({ message: 'Queries are accepted on /sparql. Redirected.' }));
            return;
        }
        if (requestUrl.pathname !== '/sparql') {
            stdout.write('[404] Resource not found. Queries are accepted on /sparql.\n');
            response.writeHead(404, { 'content-type': HttpServiceSparqlEndpoint.MIME_JSON, 'Access-Control-Allow-Origin': '*' });
            response.end(JSON.stringify({ message: 'Resource not found. Queries are accepted on /sparql.' }));
            return;
        }
        // Parse the query, depending on the HTTP method
        let queryBody;
        switch (request.method) {
            case 'POST':
                queryBody = await this.parseBody(request);
                await this.writeQueryResult(engine, stdout, stderr, request, response, queryBody, mediaType, false, false, this.lastQueryId++);
                break;
            case 'HEAD':
            case 'GET':
                // eslint-disable-next-line no-case-declarations
                const queryValue = requestUrl.query.query;
                queryBody = queryValue ? { type: 'query', value: queryValue, context: undefined } : undefined;
                // eslint-disable-next-line no-case-declarations
                const headOnly = request.method === 'HEAD';
                await this.writeQueryResult(engine, stdout, stderr, request, response, queryBody, mediaType, headOnly, true, this.lastQueryId++);
                break;
            default:
                stdout.write(`[405] ${request.method} to ${request.url}\n`);
                response.writeHead(405, { 'content-type': HttpServiceSparqlEndpoint.MIME_JSON, 'Access-Control-Allow-Origin': '*' });
                response.end(JSON.stringify({ message: 'Incorrect HTTP method' }));
        }
    }
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
    async writeQueryResult(engine, stdout, stderr, request, response, queryBody, mediaType, headOnly, readOnly, queryId) {
        if (!queryBody || !queryBody.value) {
            return this.writeServiceDescription(engine, stdout, stderr, request, response, mediaType, headOnly);
        }
        // Log the start of the query execution
        stdout.write(`[200] ${request.method} to ${request.url}\n`);
        stdout.write(`      Requested media type: ${mediaType}\n`);
        stdout.write(`      Received ${queryBody.type} query: ${queryBody.value}\n`);
        // Send message to master process to indicate the start of an execution
        process.send({ type: 'start', queryId });
        // Determine context
        let context = {
            ...this.context,
            ...this.contextOverride ? queryBody.context : undefined,
        };
        if (readOnly) {
            context = { ...context, [context_entries_1.KeysQueryOperation.readOnly.name]: readOnly };
        }
        let result;
        try {
            result = await engine.query(queryBody.value, context);
            // For update queries, also await the result
            if (result.resultType === 'void') {
                await result.execute();
            }
        }
        catch (error) {
            stdout.write('[400] Bad request\n');
            response.writeHead(400, { 'content-type': HttpServiceSparqlEndpoint.MIME_PLAIN, 'Access-Control-Allow-Origin': '*' });
            response.end(error.message);
            return;
        }
        // Default to SPARQL JSON for bindings and boolean
        if (!mediaType) {
            switch (result.resultType) {
                case 'quads':
                    mediaType = 'application/trig';
                    break;
                case 'void':
                    mediaType = 'simple';
                    break;
                default:
                    mediaType = 'application/sparql-results+json';
                    break;
            }
        }
        // Write header of response
        response.writeHead(200, { 'content-type': mediaType, 'Access-Control-Allow-Origin': '*' });
        stdout.write(`      Resolved to result media type: ${mediaType}\n`);
        // Stop further processing for HEAD requests
        if (headOnly) {
            response.end();
            return;
        }
        let eventEmitter;
        try {
            const { data } = await engine.resultToString(result, mediaType);
            data.on('error', (error) => {
                stdout.write(`[500] Server error in results: ${error.message} \n`);
                if (!response.writableEnded) {
                    response.end('An internal server error occurred.\n');
                }
            });
            data.pipe(response);
            eventEmitter = data;
        }
        catch {
            stdout.write('[400] Bad request, invalid media type\n');
            response.writeHead(400, { 'content-type': HttpServiceSparqlEndpoint.MIME_PLAIN, 'Access-Control-Allow-Origin': '*' });
            response.end('The response for the given query could not be serialized for the requested media type\n');
        }
        // Send message to master process to indicate the end of an execution
        response.on('close', () => {
            process.send({ type: 'end', queryId });
        });
        this.stopResponse(response, queryId, process.stderr, eventEmitter);
    }
    async writeServiceDescription(engine, stdout, stderr, request, response, mediaType, headOnly) {
        stdout.write(`[200] ${request.method} to ${request.url}\n`);
        stdout.write(`      Requested media type: ${mediaType}\n`);
        stdout.write('      Received query for service description.\n');
        response.writeHead(200, { 'content-type': mediaType, 'Access-Control-Allow-Origin': '*' });
        if (headOnly) {
            response.end();
            return;
        }
        const s = request.url;
        const sd = 'http://www.w3.org/ns/sparql-service-description#';
        const quads = [
            // Basic metadata
            quad(s, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', `${sd}Service`),
            quad(s, `${sd}endpoint`, '/sparql'),
            quad(s, `${sd}url`, '/sparql'),
            // Features
            quad(s, `${sd}feature`, `${sd}BasicFederatedQuery`),
            quad(s, `${sd}supportedLanguage`, `${sd}SPARQL10Query`),
            quad(s, `${sd}supportedLanguage`, `${sd}SPARQL11Query`),
        ];
        let eventEmitter;
        try {
            // Append result formats
            const formats = await engine.getResultMediaTypeFormats(new core_1.ActionContext(this.context));
            for (const format in formats) {
                quads.push(quad(s, `${sd}resultFormat`, formats[format]));
            }
            // Flush results
            const { data } = await engine.resultToString({
                resultType: 'quads',
                execute: async () => new asynciterator_1.ArrayIterator(quads),
                metadata: undefined,
            }, mediaType);
            data.on('error', (error) => {
                stdout.write(`[500] Server error in results: ${error.message} \n`);
                response.end('An internal server error occurred.\n');
            });
            data.pipe(response);
            eventEmitter = data;
        }
        catch {
            stdout.write('[400] Bad request, invalid media type\n');
            response.writeHead(400, { 'content-type': HttpServiceSparqlEndpoint.MIME_PLAIN, 'Access-Control-Allow-Origin': '*' });
            response.end('The response for the given query could not be serialized for the requested media type\n');
            return;
        }
        this.stopResponse(response, 0, process.stderr, eventEmitter);
    }
    /**
     * Stop after timeout or if the connection is terminated
     * @param {module:http.ServerResponse} response Response object.
     * @param queryId The unique query id.
     * @param stderr Error stream to write to.
     * @param {NodeJS.ReadableStream} eventEmitter Query result stream.
     */
    stopResponse(response, queryId, stderr, eventEmitter) {
        response.on('close', killClient);
        // eslint-disable-next-line ts/no-this-alias
        const self = this;
        function killClient() {
            if (eventEmitter) {
                // Remove all listeners so we are sure no more write calls are made
                eventEmitter.removeAllListeners();
                eventEmitter.on('error', () => {
                    // Void any errors that may still occur
                });
                eventEmitter.emit('end');
            }
            try {
                response.end();
            }
            catch {
                // Do nothing
            }
            // Kill the worker if we want fresh workers per query
            if (self.freshWorkerPerQuery) {
                stderr.write(`Killing fresh worker ${process.pid} after query ${queryId}.\n`);
                // eslint-disable-next-line unicorn/no-process-exit
                process.exit(15);
            }
        }
    }
    /**
     * Parses the body of a SPARQL POST request
     * @param {module:http.IncomingMessage} request Request object.
     * @return {Promise<IQueryBody>} A promise resolving to a query body object.
     */
    parseBody(request) {
        return new Promise((resolve, reject) => {
            let body = '';
            request.setEncoding('utf8');
            request.on('error', reject);
            request.on('data', (chunk) => {
                body += chunk;
            });
            request.on('end', () => {
                const contentType = request.headers['content-type'];
                if (contentType) {
                    if (contentType.includes('application/sparql-query')) {
                        return resolve({ type: 'query', value: body, context: undefined });
                    }
                    if (contentType.includes('application/sparql-update')) {
                        return resolve({ type: 'void', value: body, context: undefined });
                    }
                    if (contentType.includes('application/x-www-form-urlencoded')) {
                        const bodyStructure = querystring.parse(body);
                        let context;
                        if (bodyStructure.context) {
                            try {
                                context = JSON.parse(bodyStructure.context);
                            }
                            catch (error) {
                                reject(new Error(`Invalid POST body with context received ('${bodyStructure.context}'): ${error.message}`));
                            }
                        }
                        if (bodyStructure.query) {
                            return resolve({ type: 'query', value: bodyStructure.query, context });
                        }
                        if (bodyStructure.update) {
                            return resolve({ type: 'void', value: bodyStructure.update, context });
                        }
                    }
                }
                reject(new Error(`Invalid POST body received, query type could not be determined`));
            });
        });
    }
}
exports.HttpServiceSparqlEndpoint = HttpServiceSparqlEndpoint;
HttpServiceSparqlEndpoint.MIME_PLAIN = 'text/plain';
HttpServiceSparqlEndpoint.MIME_JSON = 'application/json';
/* eslint-enable import/no-nodejs-modules */
//# sourceMappingURL=HttpServiceSparqlEndpoint.js.map