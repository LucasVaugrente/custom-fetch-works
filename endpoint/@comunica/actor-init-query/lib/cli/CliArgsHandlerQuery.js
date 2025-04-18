"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliArgsHandlerQuery = void 0;
const actor_http_proxy_1 = require("@comunica/actor-http-proxy");
const context_entries_1 = require("@comunica/context-entries");
/**
 * CLI arguments handler that handles options for query execution.
 */
class CliArgsHandlerQuery {
    constructor(defaultQueryInputFormat, queryString, context, allowNoSources) {
        this.defaultQueryInputFormat = defaultQueryInputFormat;
        this.queryString = queryString;
        this.context = context;
        this.allowNoSources = allowNoSources;
    }
    populateYargs(argumentsBuilder) {
        return argumentsBuilder
            .usage('$0 evaluates SPARQL queries')
            .example([
            [`$0 https://fragments.dbpedia.org/2016-04/en -q 'SELECT * { ?s ?p ?o }'`, ''],
            [`$0 https://fragments.dbpedia.org/2016-04/en -f query.sparql`, ''],
            [`$0 https://fragments.dbpedia.org/2016-04/en https://query.wikidata.org/sparql ...`, ''],
            [`$0 hypermedia@https://fragments.dbpedia.org/2016-04/en sparql@https://query.wikidata.org/sparql ...`, ''],
        ])
            .options({
            query: {
                alias: 'q',
                type: 'string',
                describe: 'Evaluate the given SPARQL query string',
                default: this.queryString,
                group: 'Recommended options:',
            },
            file: {
                alias: 'f',
                type: 'string',
                describe: 'Evaluate the SPARQL query in the given file',
                group: 'Recommended options:',
            },
            inputType: {
                alias: 'i',
                type: 'string',
                describe: 'Query input format (e.g., graphql, sparql)',
                default: this.defaultQueryInputFormat,
                group: 'Recommended options:',
            },
            outputType: {
                alias: 't',
                type: 'string',
                describe: 'MIME type of the output (e.g., application/json)',
                group: 'Recommended options:',
            },
            proxy: {
                alias: 'p',
                type: 'string',
                describe: 'Delegates all HTTP traffic through the given proxy (e.g. http://myproxy.org/?uri=)',
            },
            listformats: {
                type: 'boolean',
                describe: 'Prints the supported MIME types',
            },
            context: {
                type: 'string',
                describe: 'Use the given JSON context string or file (e.g., config.json)',
                default: this.context,
            },
            explain: {
                type: 'string',
                describe: 'Print the query plan',
                choices: [
                    'parsed',
                    'logical',
                    'physical',
                    'physical-json',
                ],
            },
            recoverBrokenLinks: {
                alias: 'r',
                type: 'boolean',
                describe: 'Use the WayBack machine to recover broken links',
            },
        })
            .check((args) => {
            if (args.version || args.listformats) {
                return true;
            }
            if (this.allowNoSources) {
                if (!this.queryString && !(args.query ?? args.file) && args.sources.length === 0) {
                    throw new Error('A query must be provided');
                }
            }
            else if (this.queryString ?
                args.sources.length < (args.context ? 0 : 1) :
                !(args.query ?? args.file) && args.sources.length < (args.context ? 1 : 2)) {
                throw new Error('At least one source and query must be provided');
            }
            return true;
        });
    }
    async handleArgs(args, context) {
        // Define the query format
        context[context_entries_1.KeysInitQuery.queryFormat.name] = { language: args.inputType, version: '1.1' };
        // Define the datetime
        if (args.dateTime) {
            context[context_entries_1.KeysHttpMemento.datetime.name] = new Date(args.dateTime);
        }
        // Set the proxy
        if (args.proxy) {
            context[context_entries_1.KeysHttpProxy.httpProxyHandler.name] = new actor_http_proxy_1.ProxyHandlerStatic(args.proxy);
        }
        // Mark explain output
        if (args.explain) {
            context[context_entries_1.KeysInitQuery.explain.name] = args.explain;
        }
        // Set recover broken links flag
        if (args.recoverBrokenLinks) {
            context[context_entries_1.KeysHttpWayback.recoverBrokenLinks.name] = args.recoverBrokenLinks;
        }
    }
}
exports.CliArgsHandlerQuery = CliArgsHandlerQuery;
//# sourceMappingURL=CliArgsHandlerQuery.js.map