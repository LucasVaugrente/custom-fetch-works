import { ActionContextKey } from '@comunica/core';
import type { AsyncExtensionFunctionCreator, FunctionArgumentsCache, IActionContext, IAggregatedStore, ICliArgsHandler, IDataDestination, IPhysicalQueryPlanLogger, IProxyHandler, IQuerySourceWrapper, ISuperTypeProvider, ITimeZoneRepresentation, MetadataBindings, QueryExplainMode, QuerySourceReference, QuerySourceUnidentified, ComunicaDataFactory, IStatisticBase, IDiscoverEventData, PartialResult, ILink } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { IDocumentLoader } from 'jsonld-context-parser';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * When adding entries to this file, also add a shortcut for them in the contextKeyShortcuts TSDoc comment in
 * ActorInitQueryBase in @comunica/actor-init-query if it makes sense to use this entry externally.
 * Also, add this shortcut to IQueryContextCommon in @comunica/types.
 */
export declare const KeysCore: {
    /**
     * A logger instance.
     */
    log: ActionContextKey<import("@comunica/types").Logger>;
};
export declare const KeysHttp: {
    /**
     * Include credentials flags.
     */
    includeCredentials: ActionContextKey<boolean>;
    /**
     * Authentication for a source as a "username:password"-pair.
     */
    auth: ActionContextKey<string>;
    /**
     * Fetch function implementation.
     */
    fetch: ActionContextKey<typeof fetch>;
    /**
     * HTTP request timeout in milliseconds.
     */
    httpTimeout: ActionContextKey<number>;
    /**
     * Makes the HTTP timeout not only apply until the response starts streaming in
     * but until the response is fully consumed.
     */
    httpBodyTimeout: ActionContextKey<boolean>;
    /**
     * Number of retries to make on failed network calls. This only takes effect
     * on errors thrown during the initial fetch() call and not while streaming the body.
     */
    httpRetryCount: ActionContextKey<number>;
    /**
     * The fallback retry delay in milliseconds. This value is used when a server does not
     * send a delay value in the Retry-After header or if the header value is incorrectly formatted.
     */
    httpRetryDelayFallback: ActionContextKey<number>;
    /**
     * The upper limit for the retry delay in milliseconds. When a server requests a delay larger than this,
     * the engine will consider it unavailable until the specified timestamp is close enough.
     */
    httpRetryDelayLimit: ActionContextKey<number>;
    /**
     * HTTP status codes that should always trigger a retry, regardless of the default behaviour.
     * This can be used to, for example, force retries on server-side errors in the 500 range.
     */
    httpRetryStatusCodes: ActionContextKey<number[]>;
};
export declare const KeysHttpWayback: {
    /**
     * Use the WayBack machine to get the most recent representation of a file if a link is broken.
     * @default false
     */
    recoverBrokenLinks: ActionContextKey<boolean>;
};
export declare const KeysHttpMemento: {
    /**
     * The desired datetime for Memento datetime-negotiation.
     */
    datetime: ActionContextKey<Date>;
};
export declare const KeysHttpProxy: {
    /**
     * Interface.
     */
    httpProxyHandler: ActionContextKey<IProxyHandler>;
};
export declare const KeysInitQuery: {
    /**
     * The unidentified sources to query over.
     */
    querySourcesUnidentified: ActionContextKey<QuerySourceUnidentified[]>;
    /**
     * Variables that have to be pre-bound to values in the query.
     */
    initialBindings: ActionContextKey<RDF.Bindings>;
    /**
     * The provided query's format.
     * Defaults to { language: 'sparql', version: '1.1' }
     */
    queryFormat: ActionContextKey<RDF.QueryFormat>;
    /**
     * Which GraphQL bindings should be singularized.
     */
    graphqlSingularizeVariables: ActionContextKey<any>;
    /**
     * If HTTP and parsing failures are ignored.
     */
    lenient: ActionContextKey<boolean>;
    /**
     * The original query string.
     */
    queryString: ActionContextKey<string>;
    /**
     * The original parsed query.
     */
    query: ActionContextKey<Algebra.Operation>;
    /**
     * The query's base IRI.
     */
    baseIRI: ActionContextKey<string>;
    /**
     * Object to cache function argument overload resolutions.
     * Defaults to an object that is reused across query executions.
     */
    functionArgumentsCache: ActionContextKey<FunctionArgumentsCache>;
    /**
     * A timestamp representing the current time.
     * This is required for certain SPARQL operations such as NOW().
     */
    queryTimestamp: ActionContextKey<Date>;
    /**
     * A high resolution timestamp representing the time elapsed since Performance.timeOrigin`.
     * It can be used to precisely measure durations from the start of query execution.
     */
    queryTimestampHighResolution: ActionContextKey<number>;
    /**
     * @range {functionNamedNode: RDF.NamedNode) => ((args: RDF.Term[]) => Promise<RDF.Term>) | undefined}
     * Extension function creator for a given function IRI.
     * Returned value should be an async function implementation.
     * Undefined may be returned if no implementation exists for the given function IRI.
     *
     * The dictionary-based extensionFunctions context entry may be used instead, but not simultaneously.
     */
    extensionFunctionCreator: ActionContextKey<AsyncExtensionFunctionCreator>;
    /**
     * Dictionary of extension functions.
     * Key is the IRI of the function, and value is the async function implementation.
     *
     * The callback-based extensionFunctionCreator context entry may be used instead, but not simultaneously.
     */
    extensionFunctions: ActionContextKey<Record<string, (args: RDF.Term[]) => Promise<RDF.Term>>>;
    /**
     * Enables manipulation of the CLI arguments and their processing.
     */
    cliArgsHandlers: ActionContextKey<ICliArgsHandler[]>;
    /**
     * Explain mode of the query. Can be 'parsed', 'logical', 'physical', or 'physical-json'.
     */
    explain: ActionContextKey<QueryExplainMode>;
    /**
     * Logs the used physical operators
     */
    physicalQueryPlanLogger: ActionContextKey<IPhysicalQueryPlanLogger>;
    /**
     * The current physical operator within the query plan.
     *              This is used to pass parent-child relationships for invoking the query plan logger.
     */
    physicalQueryPlanNode: ActionContextKey<any>;
    /**
     * A JSON-LD context
     */
    jsonLdContext: ActionContextKey<any>;
    /**
     * A boolean value denoting whether caching is disabled or not.
     */
    invalidateCache: ActionContextKey<boolean>;
    /**
     * The data factory for creating terms and quads.
     */
    dataFactory: ActionContextKey<ComunicaDataFactory>;
    /**
     * A boolean value denoting whether results should be deduplicated or not.
     */
    distinctConstruct: ActionContextKey<boolean>;
};
export declare const KeysExpressionEvaluator: {
    extensionFunctionCreator: ActionContextKey<AsyncExtensionFunctionCreator>;
    superTypeProvider: ActionContextKey<ISuperTypeProvider>;
    defaultTimeZone: ActionContextKey<ITimeZoneRepresentation>;
    actionContext: ActionContextKey<IActionContext>;
};
export declare const KeysQueryOperation: {
    /**
     * Context entry for the current query operation.
     */
    operation: ActionContextKey<Algebra.Operation>;
    /**
     * @type {any} The metadata from the left streams within a join operation.
     */
    joinLeftMetadata: ActionContextKey<MetadataBindings>;
    /**
     * An array of metadata from the right streams within a join operation.
     */
    joinRightMetadatas: ActionContextKey<MetadataBindings[]>;
    /**
     * Indicates the bindings that were used to bind the operation.
     */
    joinBindings: ActionContextKey<RDF.Bindings>;
    /**
     * Flag for indicating that only read operations are allowed, defaults to false.
     */
    readOnly: ActionContextKey<boolean>;
    /**
     * An internal context entry to mark that a property path with arbitrary length and a distinct key is being processed.
     */
    isPathArbitraryLengthDistinctKey: ActionContextKey<boolean>;
    /**
     * An indicator that the stream will be limited to the given number of elements afterwards.
     */
    limitIndicator: ActionContextKey<number>;
    /**
     * If the default graph should also contain the union of all named graphs.
     */
    unionDefaultGraph: ActionContextKey<boolean>;
    /**
     * The sources to query over.
     */
    querySources: ActionContextKey<IQuerySourceWrapper<import("@comunica/types").IQuerySource>[]>;
};
export declare const KeysRdfParseJsonLd: {
    /**
     * @range {IDocumentLoader}
     */
    documentLoader: ActionContextKey<IDocumentLoader>;
    /**
     * @range {boolean}
     */
    strictValues: ActionContextKey<boolean>;
    /**
     * @range {Record<string, any>}
     */
    parserOptions: ActionContextKey<Record<string, any>>;
};
export declare const KeysRdfParseHtmlScript: {
    /**
     * An internal context flag to determine if the engine is already processing an HTML script tag.
     */
    processingHtmlScript: ActionContextKey<boolean>;
    /**
     * If all HTML script tags must be considered.
     */
    extractAllScripts: ActionContextKey<boolean>;
};
export declare const KeysQuerySourceIdentify: {
    /**
     * A map containing unique IDs for each source
     */
    sourceIds: ActionContextKey<Map<QuerySourceReference, string>>;
    /**
     * Hypermedia sources mapping to their aggregated store.
     */
    hypermediaSourcesAggregatedStores: ActionContextKey<Map<string, IAggregatedStore<RDF.Quad>>>;
    /**
     * If links may be traversed from this source.
     * This means that sources annotated with this flag are considered incomplete until all links have been traversed.
     */
    traverse: ActionContextKey<boolean>;
};
export declare const KeysRdfUpdateQuads: {
    /**
     * A data destination.
     */
    destination: ActionContextKey<IDataDestination>;
};
export declare const KeysMergeBindingsContext: {
    /**
     * The data sources required to produce the binding
     */
    sourcesBinding: ActionContextKey<string[]>;
};
export declare const KeysRdfJoin: {
    /**
     * The last physical join actor that was executed.
     */
    lastPhysicalJoin: ActionContextKey<string>;
};
export declare const KeysStatistics: {
    /**
     * All discovered links during query execution. Not all of them will necessarily be dereferenced.
     */
    discoveredLinks: ActionContextKey<IStatisticBase<IDiscoverEventData>>;
    /**
     * Information about what links are dereferenced and when
     */
    dereferencedLinks: ActionContextKey<IStatisticBase<ILink>>;
    /**
     * Intermediate results produced during query execution
     */
    intermediateResults: ActionContextKey<IStatisticBase<PartialResult>>;
};
