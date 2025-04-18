"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorInitQuery = void 0;
/* eslint-disable import/no-nodejs-modules */
const node_fs_1 = require("node:fs");
const context_entries_1 = require("@comunica/context-entries");
const readable_stream_1 = require("readable-stream");
const yargs_1 = require("yargs");
const ActorInitQueryBase_1 = require("./ActorInitQueryBase");
const CliArgsHandlerBase_1 = require("./cli/CliArgsHandlerBase");
const CliArgsHandlerQuery_1 = require("./cli/CliArgsHandlerQuery");
const QueryEngineBase_1 = require("./QueryEngineBase");
/**
 * A comunica Query Init Actor.
 */
class ActorInitQuery extends ActorInitQueryBase_1.ActorInitQueryBase {
    constructor(args) {
        super(args);
    }
    async run(action) {
        // Wrap this actor in a query engine so we can conveniently execute queries
        const queryEngine = new QueryEngineBase_1.QueryEngineBase(this);
        const cliArgsHandlers = [
            new CliArgsHandlerBase_1.CliArgsHandlerBase(action.context),
            new CliArgsHandlerQuery_1.CliArgsHandlerQuery(this.defaultQueryInputFormat, this.queryString, this.context, this.allowNoSources),
            ...action.context?.get(context_entries_1.KeysInitQuery.cliArgsHandlers) || [],
        ];
        // Populate yargs arguments object
        let argumentsBuilder = (0, yargs_1.default)([]);
        for (const cliArgsHandler of cliArgsHandlers) {
            argumentsBuilder = cliArgsHandler.populateYargs(argumentsBuilder);
        }
        // Extract raw argument values from parsed yargs object, so that we can handle each of them hereafter
        let args;
        try {
            args = await argumentsBuilder.parse(action.argv);
        }
        catch (error) {
            return {
                stderr: readable_stream_1.Readable.from([`${await argumentsBuilder.getHelp()}\n\n${error.message}\n`]),
            };
        }
        // Print supported MIME types
        if (args.listformats) {
            const mediaTypes = await queryEngine.getResultMediaTypes();
            return { stdout: readable_stream_1.Readable.from([`${Object.keys(mediaTypes).join('\n')}\n`]) };
        }
        // Define query
        // We need to do this before the cliArgsHandlers, as we may modify the sources array
        let query;
        if (args.query) {
            query = args.query;
        }
        else if (args.file) {
            query = (0, node_fs_1.readFileSync)(args.file, { encoding: 'utf8' });
        }
        else if (args.sources.length > 0) {
            query = args.sources.at(-1);
            args.sources.pop();
        }
        // Invoke args handlers to process any remaining args
        const context = {};
        try {
            for (const cliArgsHandler of cliArgsHandlers) {
                await cliArgsHandler.handleArgs(args, context);
            }
        }
        catch (error) {
            return { stderr: readable_stream_1.Readable.from([error.message]) };
        }
        // Evaluate query
        const queryResult = await queryEngine.queryOrExplain(query, context);
        // Output query explanations in a different way
        if ('explain' in queryResult) {
            return {
                stdout: readable_stream_1.Readable.from([typeof queryResult.data === 'string' ?
                        // eslint-disable-next-line prefer-template
                        queryResult.data + '\n' :
                        // eslint-disable-next-line prefer-template
                        JSON.stringify(queryResult.data, (key, value) => {
                            if (key === 'scopedSource') {
                                return value.source.toString();
                            }
                            return value;
                        }, '  ') + '\n']),
            };
        }
        // Serialize output according to media type
        const stdout = (await queryEngine.resultToString(queryResult, args.outputType, queryResult.context)).data;
        return { stdout };
    }
}
exports.ActorInitQuery = ActorInitQuery;
/* eslint-enable import/no-nodejs-modules */
//# sourceMappingURL=ActorInitQuery.js.map