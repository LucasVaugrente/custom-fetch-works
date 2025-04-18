"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryEngineBase = void 0;
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
/**
 * Base implementation of a Comunica query engine.
 */
class QueryEngineBase {
    constructor(actorInitQuery) {
        this.actorInitQuery = actorInitQuery;
    }
    async queryBindings(query, context) {
        return this.queryOfType(query, context, 'bindings');
    }
    async queryQuads(query, context) {
        return this.queryOfType(query, context, 'quads');
    }
    async queryBoolean(query, context) {
        return this.queryOfType(query, context, 'boolean');
    }
    async queryVoid(query, context) {
        return this.queryOfType(query, context, 'void');
    }
    async queryOfType(query, context, expectedType) {
        const result = await this.query(query, context);
        if (result.resultType === expectedType) {
            return await result.execute();
        }
        throw new Error(`Query result type '${expectedType}' was expected, while '${result.resultType}' was found.`);
    }
    /**
     * Evaluate the given query
     * @param query A query string or algebra.
     * @param context An optional query context.
     * @return {Promise<QueryType>} A promise that resolves to the query output.
     */
    async query(query, context) {
        const output = await this.queryOrExplain(query, context);
        if ('explain' in output) {
            throw new Error(`Tried to explain a query when in query-only mode`);
        }
        return output;
    }
    /**
     * Explain the given query
     * @param query A query string or algebra.
     * @param context An optional query context.
     * @param explainMode The explain mode.
     * @return {Promise<QueryType | IQueryExplained>} A promise that resolves to
     *                                                               the query output or explanation.
     */
    async explain(query, context, explainMode) {
        context.explain = explainMode;
        const output = await this.queryOrExplain(query, context);
        return output;
    }
    /**
     * Evaluate or explain the given query
     * @param query A query string or algebra.
     * @param context An optional query context.
     * @return {Promise<QueryType | IQueryExplained>} A promise that resolves to
     *                                                               the query output or explanation.
     */
    async queryOrExplain(query, context) {
        const actionContext = core_1.ActionContext.ensureActionContext(context);
        // Invalidate caches if cache argument is set to false
        if (actionContext.get(context_entries_1.KeysInitQuery.invalidateCache)) {
            await this.invalidateHttpCache();
        }
        // Invoke query process
        const { result } = await this.actorInitQuery.mediatorQueryProcess.mediate({ query, context: actionContext });
        if ('explain' in result) {
            return result;
        }
        return QueryEngineBase.internalToFinalResult(result);
    }
    /**
     * @param context An optional context.
     * @return {Promise<{[p: string]: number}>} All available SPARQL (weighted) result media types.
     */
    async getResultMediaTypes(context) {
        context = core_1.ActionContext.ensureActionContext(context);
        return (await this.actorInitQuery.mediatorQueryResultSerializeMediaTypeCombiner
            .mediate({ context, mediaTypes: true })).mediaTypes;
    }
    /**
     * @param context An optional context.
     * @return {Promise<{[p: string]: number}>} All available SPARQL result media type formats.
     */
    async getResultMediaTypeFormats(context) {
        context = core_1.ActionContext.ensureActionContext(context);
        return (await this.actorInitQuery.mediatorQueryResultSerializeMediaTypeFormatCombiner
            .mediate({ context, mediaTypeFormats: true })).mediaTypeFormats;
    }
    /**
     * Convert a query result to a string stream based on a certain media type.
     * @param {IQueryOperationResult} queryResult A query result.
     * @param {string} mediaType A media type.
     * @param {ActionContext} context An optional context.
     * @return {Promise<IActorQueryResultSerializeOutput>} A text stream.
     */
    async resultToString(queryResult, mediaType, context) {
        context = core_1.ActionContext.ensureActionContext(context);
        if (!mediaType) {
            switch (queryResult.resultType) {
                case 'bindings':
                    mediaType = 'application/json';
                    break;
                case 'quads':
                    mediaType = 'application/trig';
                    break;
                default:
                    mediaType = 'simple';
                    break;
            }
        }
        const handle = { ...await QueryEngineBase.finalToInternalResult(queryResult), context };
        return (await this.actorInitQuery.mediatorQueryResultSerialize
            .mediate({ context, handle, handleMediaType: mediaType })).handle;
    }
    /**
     * Invalidate all internal caches related to the given page URL.
     * If no page URL is given, then all pages will be invalidated.
     * @param {string} url The page URL to invalidate.
     * @param context An optional ActionContext to pass to the actors.
     * @return {Promise<any>} A promise resolving when the caches have been invalidated.
     */
    invalidateHttpCache(url, context) {
        context = core_1.ActionContext.ensureActionContext(context);
        return this.actorInitQuery.mediatorHttpInvalidate.mediate({ url, context });
    }
    /**
     * Convert an internal query result to a final one.
     * @param internalResult An intermediary query result.
     */
    static internalToFinalResult(internalResult) {
        switch (internalResult.type) {
            case 'bindings':
                return {
                    resultType: 'bindings',
                    execute: async () => internalResult.bindingsStream,
                    metadata: async () => {
                        const meta = await internalResult.metadata();
                        meta.variables = meta.variables.map((variable) => variable.variable);
                        return meta;
                    },
                    context: internalResult.context,
                };
            case 'quads':
                return {
                    resultType: 'quads',
                    execute: async () => internalResult.quadStream,
                    metadata: async () => await internalResult.metadata(),
                    context: internalResult.context,
                };
            case 'boolean':
                return {
                    resultType: 'boolean',
                    execute: async () => internalResult.execute(),
                    context: internalResult.context,
                };
            case 'void':
                return {
                    resultType: 'void',
                    execute: async () => internalResult.execute(),
                    context: internalResult.context,
                };
        }
    }
    /**
     * Convert a final query result to an internal one.
     * @param finalResult A final query result.
     */
    static async finalToInternalResult(finalResult) {
        switch (finalResult.resultType) {
            case 'bindings':
                return {
                    type: 'bindings',
                    bindingsStream: await finalResult.execute(),
                    metadata: async () => {
                        const meta = await finalResult.metadata();
                        meta.variables = meta.variables.map((variable) => ({ variable, canBeUndef: false }));
                        return meta;
                    },
                };
            case 'quads':
                return {
                    type: 'quads',
                    quadStream: await finalResult.execute(),
                    metadata: async () => await finalResult.metadata(),
                };
            case 'boolean':
                return {
                    type: 'boolean',
                    execute: () => finalResult.execute(),
                };
            case 'void':
                return {
                    type: 'void',
                    execute: () => finalResult.execute(),
                };
        }
    }
}
exports.QueryEngineBase = QueryEngineBase;
//# sourceMappingURL=QueryEngineBase.js.map