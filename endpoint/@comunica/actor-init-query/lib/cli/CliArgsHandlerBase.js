"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliArgsHandlerBase = void 0;
/* eslint-disable import/no-nodejs-modules */
const node_child_process_1 = require("node:child_process");
const node_fs_1 = require("node:fs");
const OS = require("node:os");
const Path = require("node:path");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const logger_pretty_1 = require("@comunica/logger-pretty");
const process = require('process/');
/**
 * Basic CLI arguments handler that handles common options.
 */
class CliArgsHandlerBase {
    constructor(initialContext) {
        this.initialContext = initialContext;
    }
    static getScriptOutput(command, fallback) {
        return new Promise((resolve) => {
            (0, node_child_process_1.exec)(command, (error, stdout, stderr) => {
                if (error) {
                    resolve(fallback);
                }
                resolve((stdout || stderr).trimEnd());
            });
        });
    }
    static isDevelopmentEnvironment() {
        return (0, node_fs_1.existsSync)(Path.join(__dirname, `../../test`));
    }
    /**
     * Converts an URL like 'hypermedia@http://user:passwd@example.com to an IDataSource
     * @param {string} sourceString An url with possibly a type and authorization.
     * @return {[id: string]: any} An IDataSource which represents the sourceString.
     */
    static getSourceObjectFromString(sourceString) {
        const source = {};
        const mediaTypeRegex = /^([^:]*)@/u;
        const mediaTypeMatches = mediaTypeRegex.exec(sourceString);
        if (mediaTypeMatches) {
            source.type = mediaTypeMatches[1];
            sourceString = sourceString.slice(source.type.length + 1);
        }
        const authRegex = /\/\/(.*:.*)@/u;
        const authMatches = authRegex.exec(sourceString);
        if (authMatches) {
            const credentials = authMatches[1];
            source.context = new core_1.ActionContext({
                [context_entries_1.KeysHttp.auth.name]: decodeURIComponent(credentials),
            });
            sourceString = sourceString.slice(0, authMatches.index + 2) +
                sourceString.slice(authMatches.index + credentials.length + 3);
        }
        source.value = sourceString;
        return source;
    }
    populateYargs(argumentsBuilder) {
        return argumentsBuilder
            .command('$0 [sources...]', 'evaluates SPARQL queries', () => {
            // Do nothing
        }, () => {
            // Do nothing
        })
            .default('sources', [])
            .hide('sources')
            .wrap(160)
            .version(false)
            .options({
            context: {
                alias: 'c',
                type: 'string',
                describe: 'Use the given JSON context string or file (e.g., config.json)',
            },
            to: {
                type: 'string',
                describe: 'Destination for update queries',
            },
            baseIRI: {
                alias: 'b',
                type: 'string',
                describe: 'base IRI for the query (e.g., http://example.org/)',
            },
            dateTime: {
                alias: 'd',
                type: 'string',
                describe: 'Sets a datetime for querying Memento-enabled archives',
            },
            logLevel: {
                alias: 'l',
                type: 'string',
                describe: 'Sets the log level (e.g., debug, info, warn, ...)',
                default: 'warn',
            },
            lenient: {
                type: 'boolean',
                describe: 'If failing requests and parsing errors should be logged instead of causing a hard crash',
            },
            version: {
                alias: 'v',
                type: 'boolean',
                describe: 'Prints version information',
            },
            showStackTrace: {
                type: 'boolean',
                describe: 'Prints the full stacktrace when errors are thrown',
            },
            httpTimeout: {
                type: 'number',
                describe: 'HTTP requests timeout in milliseconds',
            },
            httpBodyTimeout: {
                type: 'boolean',
                describe: 'Makes the HTTP timeout take into account the response body stream read',
            },
            httpRetryCount: {
                type: 'number',
                describe: 'The number of retries to perform on failed fetch requests',
            },
            httpRetryDelayFallback: {
                type: 'number',
                describe: 'The fallback delay in milliseconds between fetch retries',
            },
            httpRetryDelayLimit: {
                type: 'number',
                describe: 'The upper limit in milliseconds for the delay between fetch retries',
            },
            unionDefaultGraph: {
                type: 'boolean',
                describe: 'If the default graph should also contain the union of all named graphs',
            },
            invalidateCache: {
                type: 'boolean',
                describe: 'Enable cache invalidation before each query execution',
            },
            distinctConstruct: {
                type: 'boolean',
                describe: 'If the query engine should deduplicate resulting triples',
            },
        })
            .exitProcess(false)
            .fail(false)
            .help(false);
    }
    async handleArgs(args, context) {
        // Print version information
        if (args.version) {
            // eslint-disable-next-line ts/no-require-imports,ts/no-var-requires,import/extensions
            const comunicaVersion = require('../../package.json').version;
            const dev = CliArgsHandlerBase.isDevelopmentEnvironment() ? '(dev)' : '';
            const nodeVersion = process.version;
            const npmVersion = await CliArgsHandlerBase.getScriptOutput('npm -v', '_NPM is unavailable_');
            const yarnVersion = await CliArgsHandlerBase.getScriptOutput('yarn -v', '_Yarn is unavailable_');
            const os = `${OS.platform()} (${OS.type()} ${OS.release()})`;
            const message = `| software         | version
| ---------------- | -------
| Comunica Engine  | ${comunicaVersion} ${dev}
| node             | ${nodeVersion}
| npm              | ${npmVersion}
| yarn             | ${yarnVersion}
| Operating System | ${os}
`;
            throw new Error(message);
        }
        // Inherit default context options
        if (this.initialContext) {
            Object.assign(context, this.initialContext.toJS());
        }
        // Define context
        if (args.context) {
            Object.assign(context, JSON.parse((0, node_fs_1.existsSync)(args.context) ? (0, node_fs_1.readFileSync)(args.c, 'utf8') : args.context));
        }
        else if (args.sources[0]?.startsWith('{')) {
            // For backwards compatibility inline JSON
            Object.assign(context, JSON.parse(args.sources[0]));
            args.sources.shift();
        }
        // Add sources to context
        if (args.sources.length > 0) {
            context.sources = context.sources || [];
            // eslint-disable-next-line unicorn/no-array-for-each
            args.sources.forEach((sourceValue) => {
                const source = CliArgsHandlerBase.getSourceObjectFromString(sourceValue);
                context.sources.push(source);
            });
        }
        // Add destination to context
        if (args.to) {
            context[context_entries_1.KeysRdfUpdateQuads.destination.name] = args.to;
        }
        // Set the logger
        if (!context.log) {
            context.log = new logger_pretty_1.LoggerPretty({ level: args.logLevel });
        }
        // Define the base IRI
        if (args.baseIRI) {
            context[context_entries_1.KeysInitQuery.baseIRI.name] = args.baseIRI;
        }
        // Define lenient-mode
        if (args.lenient) {
            context[context_entries_1.KeysInitQuery.lenient.name] = true;
        }
        // Define HTTP timeout
        if (args.httpTimeout) {
            context[context_entries_1.KeysHttp.httpTimeout.name] = args.httpTimeout;
        }
        // Define HTTP body timeout
        if (args.httpBodyTimeout) {
            if (!args.httpTimeout) {
                throw new Error('The --httpBodyTimeout option requires the --httpTimeout option to be set');
            }
            context[context_entries_1.KeysHttp.httpBodyTimeout.name] = args.httpBodyTimeout;
        }
        // Define HTTP retry count
        if (args.httpRetryCount) {
            context[context_entries_1.KeysHttp.httpRetryCount.name] = args.httpRetryCount;
        }
        // Define fallback HTTP delay between retries
        if (args.httpRetryDelayFallback) {
            if (!args.httpRetryCount) {
                throw new Error('The --httpRetryDelayFallback option requires the --httpRetryCount option to be set');
            }
            context[context_entries_1.KeysHttp.httpRetryDelayFallback.name] = args.httpRetryDelayFallback;
        }
        // Define limit to the delay between HTTP retries
        if (args.httpRetryDelayLimit) {
            if (!args.httpRetryCount) {
                throw new Error('The --httpRetryDelayLimit option requires the --httpRetryCount option to be set');
            }
            context[context_entries_1.KeysHttp.httpRetryDelayLimit.name] = args.httpRetryDelayLimit;
        }
        // Define union default graph
        if (args.unionDefaultGraph) {
            context[context_entries_1.KeysQueryOperation.unionDefaultGraph.name] = true;
        }
        // Define if cache should be disabled
        if (args.invalidateCache) {
            context[context_entries_1.KeysInitQuery.invalidateCache.name] = true;
        }
        // Define if results should be deduplicated
        if (args.distinctConstruct) {
            context[context_entries_1.KeysInitQuery.distinctConstruct.name] = true;
        }
    }
}
exports.CliArgsHandlerBase = CliArgsHandlerBase;
/* eslint-enable import/no-nodejs-modules */
//# sourceMappingURL=CliArgsHandlerBase.js.map