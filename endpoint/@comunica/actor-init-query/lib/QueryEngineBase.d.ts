import type { IActorQueryResultSerializeOutput } from '@comunica/bus-query-result-serialize';
import type { IQueryOperationResult, IQueryEngine, IQueryExplained, QueryFormatType, QueryType, QueryExplainMode, BindingsStream, QueryAlgebraContext, QueryStringContext, QueryEnhanced, IQueryContextCommon } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { AsyncIterator } from 'asynciterator';
import type { ActorInitQueryBase } from './ActorInitQueryBase';
/**
 * Base implementation of a Comunica query engine.
 */
export declare class QueryEngineBase<QueryContext extends IQueryContextCommon = IQueryContextCommon, QueryStringContextInner extends RDF.QueryStringContext = QueryStringContext, QueryAlgebraContextInner extends RDF.QueryAlgebraContext = QueryAlgebraContext> implements IQueryEngine<QueryStringContextInner, QueryAlgebraContextInner> {
    private readonly actorInitQuery;
    constructor(actorInitQuery: ActorInitQueryBase);
    queryBindings<QueryFormatTypeInner extends QueryFormatType>(query: QueryFormatTypeInner, context?: QueryFormatTypeInner extends string ? QueryStringContextInner : QueryAlgebraContextInner): Promise<BindingsStream>;
    queryQuads<QueryFormatTypeInner extends QueryFormatType>(query: QueryFormatTypeInner, context?: QueryFormatTypeInner extends string ? QueryStringContextInner : QueryAlgebraContextInner): Promise<AsyncIterator<RDF.Quad> & RDF.ResultStream<RDF.Quad>>;
    queryBoolean<QueryFormatTypeInner extends QueryFormatType>(query: QueryFormatTypeInner, context?: QueryFormatTypeInner extends string ? QueryStringContextInner : QueryAlgebraContextInner): Promise<boolean>;
    queryVoid<QueryFormatTypeInner extends QueryFormatType>(query: QueryFormatTypeInner, context?: QueryFormatTypeInner extends string ? QueryStringContextInner : QueryAlgebraContextInner): Promise<void>;
    protected queryOfType<QueryFormatTypeInner extends QueryFormatType, QueryTypeOut extends QueryEnhanced>(query: QueryFormatTypeInner, context: undefined | (QueryFormatTypeInner extends string ? QueryStringContextInner : QueryAlgebraContextInner), expectedType: QueryTypeOut['resultType']): Promise<ReturnType<QueryTypeOut['execute']>>;
    /**
     * Evaluate the given query
     * @param query A query string or algebra.
     * @param context An optional query context.
     * @return {Promise<QueryType>} A promise that resolves to the query output.
     */
    query<QueryFormatTypeInner extends QueryFormatType>(query: QueryFormatTypeInner, context?: QueryFormatTypeInner extends string ? QueryStringContextInner : QueryAlgebraContextInner): Promise<QueryType>;
    /**
     * Explain the given query
     * @param query A query string or algebra.
     * @param context An optional query context.
     * @param explainMode The explain mode.
     * @return {Promise<QueryType | IQueryExplained>} A promise that resolves to
     *                                                               the query output or explanation.
     */
    explain<QueryFormatTypeInner extends QueryFormatType>(query: QueryFormatTypeInner, context: QueryFormatTypeInner extends string ? QueryStringContextInner : QueryAlgebraContextInner, explainMode: QueryExplainMode): Promise<IQueryExplained>;
    /**
     * Evaluate or explain the given query
     * @param query A query string or algebra.
     * @param context An optional query context.
     * @return {Promise<QueryType | IQueryExplained>} A promise that resolves to
     *                                                               the query output or explanation.
     */
    queryOrExplain<QueryFormatTypeInner extends QueryFormatType>(query: QueryFormatTypeInner, context?: QueryFormatTypeInner extends string ? QueryStringContextInner : QueryAlgebraContextInner): Promise<QueryType | IQueryExplained>;
    /**
     * @param context An optional context.
     * @return {Promise<{[p: string]: number}>} All available SPARQL (weighted) result media types.
     */
    getResultMediaTypes(context?: any): Promise<Record<string, number>>;
    /**
     * @param context An optional context.
     * @return {Promise<{[p: string]: number}>} All available SPARQL result media type formats.
     */
    getResultMediaTypeFormats(context?: any): Promise<Record<string, string>>;
    /**
     * Convert a query result to a string stream based on a certain media type.
     * @param {IQueryOperationResult} queryResult A query result.
     * @param {string} mediaType A media type.
     * @param {ActionContext} context An optional context.
     * @return {Promise<IActorQueryResultSerializeOutput>} A text stream.
     */
    resultToString(queryResult: RDF.Query<any>, mediaType?: string, context?: any): Promise<IActorQueryResultSerializeOutput>;
    /**
     * Invalidate all internal caches related to the given page URL.
     * If no page URL is given, then all pages will be invalidated.
     * @param {string} url The page URL to invalidate.
     * @param context An optional ActionContext to pass to the actors.
     * @return {Promise<any>} A promise resolving when the caches have been invalidated.
     */
    invalidateHttpCache(url?: string, context?: any): Promise<any>;
    /**
     * Convert an internal query result to a final one.
     * @param internalResult An intermediary query result.
     */
    static internalToFinalResult(internalResult: IQueryOperationResult): QueryType;
    /**
     * Convert a final query result to an internal one.
     * @param finalResult A final query result.
     */
    static finalToInternalResult(finalResult: RDF.Query<any>): Promise<IQueryOperationResult>;
}
