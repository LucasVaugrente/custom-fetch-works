"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysStatistics = exports.KeysRdfJoin = exports.KeysMergeBindingsContext = exports.KeysRdfUpdateQuads = exports.KeysQuerySourceIdentify = exports.KeysRdfParseHtmlScript = exports.KeysRdfParseJsonLd = exports.KeysQueryOperation = exports.KeysExpressionEvaluator = exports.KeysInitQuery = exports.KeysHttpProxy = exports.KeysHttpMemento = exports.KeysHttpWayback = exports.KeysHttp = exports.KeysCore = void 0;
const core_1 = require("@comunica/core");
/**
 * When adding entries to this file, also add a shortcut for them in the contextKeyShortcuts TSDoc comment in
 * ActorInitQueryBase in @comunica/actor-init-query if it makes sense to use this entry externally.
 * Also, add this shortcut to IQueryContextCommon in @comunica/types.
 */
exports.KeysCore = {
    // We create the core context keys in @comunica/core to avoid a cyclic dependency
    /**
     * A logger instance.
     */
    log: core_1.CONTEXT_KEY_LOGGER,
};
exports.KeysHttp = {
    /**
     * Include credentials flags.
     */
    includeCredentials: new core_1.ActionContextKey('@comunica/bus-http:include-credentials'),
    /**
     * Authentication for a source as a "username:password"-pair.
     */
    auth: new core_1.ActionContextKey('@comunica/bus-http:auth'),
    /**
     * Fetch function implementation.
     */
    fetch: new core_1.ActionContextKey('@comunica/bus-http:fetch'),
    /**
     * HTTP request timeout in milliseconds.
     */
    httpTimeout: new core_1.ActionContextKey('@comunica/bus-http:http-timeout'),
    /**
     * Makes the HTTP timeout not only apply until the response starts streaming in
     * but until the response is fully consumed.
     */
    httpBodyTimeout: new core_1.ActionContextKey('@comunica/bus-http:http-body-timeout'),
    /**
     * Number of retries to make on failed network calls. This only takes effect
     * on errors thrown during the initial fetch() call and not while streaming the body.
     */
    httpRetryCount: new core_1.ActionContextKey('@comunica/bus-http:http-retry-count'),
    /**
     * The fallback retry delay in milliseconds. This value is used when a server does not
     * send a delay value in the Retry-After header or if the header value is incorrectly formatted.
     */
    httpRetryDelayFallback: new core_1.ActionContextKey('@comunica/bus-http:http-retry-delay-fallback'),
    /**
     * The upper limit for the retry delay in milliseconds. When a server requests a delay larger than this,
     * the engine will consider it unavailable until the specified timestamp is close enough.
     */
    httpRetryDelayLimit: new core_1.ActionContextKey('@comunica/bus-http:http-retry-delay-limit'),
    /**
     * HTTP status codes that should always trigger a retry, regardless of the default behaviour.
     * This can be used to, for example, force retries on server-side errors in the 500 range.
     */
    httpRetryStatusCodes: new core_1.ActionContextKey('@comunica/bus-http:http-retry-status-codes'),
};
exports.KeysHttpWayback = {
    /**
     * Use the WayBack machine to get the most recent representation of a file if a link is broken.
     * @default false
     */
    recoverBrokenLinks: new core_1.ActionContextKey('@comunica/bus-http:recover-broken-links'),
};
exports.KeysHttpMemento = {
    /**
     * The desired datetime for Memento datetime-negotiation.
     */
    datetime: new core_1.ActionContextKey('@comunica/actor-http-memento:datetime'),
};
exports.KeysHttpProxy = {
    /**
     * Interface.
     */
    httpProxyHandler: new core_1.ActionContextKey('@comunica/actor-http-proxy:httpProxyHandler'),
};
exports.KeysInitQuery = {
    /**
     * The unidentified sources to query over.
     */
    querySourcesUnidentified: new core_1.ActionContextKey('@comunica/actor-init-query:querySourcesUnidentified'),
    /**
     * Variables that have to be pre-bound to values in the query.
     */
    initialBindings: new core_1.ActionContextKey('@comunica/actor-init-query:initialBindings'),
    /**
     * The provided query's format.
     * Defaults to { language: 'sparql', version: '1.1' }
     */
    queryFormat: new core_1.ActionContextKey('@comunica/actor-init-query:queryFormat'),
    /**
     * Which GraphQL bindings should be singularized.
     */
    graphqlSingularizeVariables: new core_1.ActionContextKey('@comunica/actor-init-query:singularizeVariables'),
    /**
     * If HTTP and parsing failures are ignored.
     */
    lenient: new core_1.ActionContextKey('@comunica/actor-init-query:lenient'),
    /**
     * The original query string.
     */
    queryString: new core_1.ActionContextKey('@comunica/actor-init-query:queryString'),
    /**
     * The original parsed query.
     */
    query: new core_1.ActionContextKey('@comunica/actor-init-query:query'),
    /**
     * The query's base IRI.
     */
    baseIRI: new core_1.ActionContextKey('@comunica/actor-init-query:baseIRI'),
    /**
     * Object to cache function argument overload resolutions.
     * Defaults to an object that is reused across query executions.
     */
    functionArgumentsCache: new core_1.ActionContextKey('@comunica/actor-init-query:functionArgumentsCache'),
    /**
     * A timestamp representing the current time.
     * This is required for certain SPARQL operations such as NOW().
     */
    queryTimestamp: new core_1.ActionContextKey('@comunica/actor-init-query:queryTimestamp'),
    /**
     * A high resolution timestamp representing the time elapsed since Performance.timeOrigin`.
     * It can be used to precisely measure durations from the start of query execution.
     */
    queryTimestampHighResolution: new core_1.ActionContextKey('@comunica/actor-init-query:queryTimestampHighResolution'),
    /**
     * @range {functionNamedNode: RDF.NamedNode) => ((args: RDF.Term[]) => Promise<RDF.Term>) | undefined}
     * Extension function creator for a given function IRI.
     * Returned value should be an async function implementation.
     * Undefined may be returned if no implementation exists for the given function IRI.
     *
     * The dictionary-based extensionFunctions context entry may be used instead, but not simultaneously.
     */
    extensionFunctionCreator: new core_1.ActionContextKey('@comunica/actor-init-query:extensionFunctionCreator'),
    /**
     * Dictionary of extension functions.
     * Key is the IRI of the function, and value is the async function implementation.
     *
     * The callback-based extensionFunctionCreator context entry may be used instead, but not simultaneously.
     */
    extensionFunctions: new core_1.ActionContextKey('@comunica/actor-init-query:extensionFunctions'),
    /**
     * Enables manipulation of the CLI arguments and their processing.
     */
    cliArgsHandlers: new core_1.ActionContextKey('@comunica/actor-init-query:cliArgsHandlers'),
    /**
     * Explain mode of the query. Can be 'parsed', 'logical', 'physical', or 'physical-json'.
     */
    explain: new core_1.ActionContextKey('@comunica/actor-init-query:explain'),
    /**
     * Logs the used physical operators
     */
    physicalQueryPlanLogger: new core_1.ActionContextKey('@comunica/actor-init-query:physicalQueryPlanLogger'),
    /**
     * The current physical operator within the query plan.
     *              This is used to pass parent-child relationships for invoking the query plan logger.
     */
    physicalQueryPlanNode: new core_1.ActionContextKey('@comunica/actor-init-query:physicalQueryPlanNode'),
    /**
     * A JSON-LD context
     */
    jsonLdContext: new core_1.ActionContextKey('@context'),
    /**
     * A boolean value denoting whether caching is disabled or not.
     */
    invalidateCache: new core_1.ActionContextKey('@comunica/actor-init-query:invalidateCache'),
    /**
     * The data factory for creating terms and quads.
     */
    dataFactory: new core_1.ActionContextKey('@comunica/actor-init-query:dataFactory'),
    /**
     * A boolean value denoting whether results should be deduplicated or not.
     */
    distinctConstruct: new core_1.ActionContextKey('@comunica/actor-init-query:distinctConstruct'),
};
exports.KeysExpressionEvaluator = {
    extensionFunctionCreator: new core_1.ActionContextKey('@comunica/utils-expression-evaluator:extensionFunctionCreator'),
    superTypeProvider: new core_1.ActionContextKey('@comunica/utils-expression-evaluator:superTypeProvider'),
    defaultTimeZone: new core_1.ActionContextKey('@comunica/utils-expression-evaluator:defaultTimeZone'),
    actionContext: new core_1.ActionContextKey('@comunica/utils-expression-evaluator:actionContext'),
};
exports.KeysQueryOperation = {
    /**
     * Context entry for the current query operation.
     */
    operation: new core_1.ActionContextKey('@comunica/bus-query-operation:operation'),
    /**
     * @type {any} The metadata from the left streams within a join operation.
     */
    joinLeftMetadata: new core_1.ActionContextKey('@comunica/bus-query-operation:joinLeftMetadata'),
    /**
     * An array of metadata from the right streams within a join operation.
     */
    joinRightMetadatas: new core_1.ActionContextKey('@comunica/bus-query-operation:joinRightMetadatas'),
    /**
     * Indicates the bindings that were used to bind the operation.
     */
    joinBindings: new core_1.ActionContextKey('@comunica/bus-query-operation:joinBindings'),
    /**
     * Flag for indicating that only read operations are allowed, defaults to false.
     */
    readOnly: new core_1.ActionContextKey('@comunica/bus-query-operation:readOnly'),
    /**
     * An internal context entry to mark that a property path with arbitrary length and a distinct key is being processed.
     */
    isPathArbitraryLengthDistinctKey: new core_1.ActionContextKey('@comunica/bus-query-operation:isPathArbitraryLengthDistinct'),
    /**
     * An indicator that the stream will be limited to the given number of elements afterwards.
     */
    limitIndicator: new core_1.ActionContextKey('@comunica/bus-query-operation:limitIndicator'),
    /**
     * If the default graph should also contain the union of all named graphs.
     */
    unionDefaultGraph: new core_1.ActionContextKey('@comunica/bus-query-operation:unionDefaultGraph'),
    /**
     * The sources to query over.
     */
    querySources: new core_1.ActionContextKey('@comunica/bus-query-operation:querySources'),
};
exports.KeysRdfParseJsonLd = {
    /**
     * @range {IDocumentLoader}
     */
    documentLoader: new core_1.ActionContextKey('@comunica/actor-rdf-parse-jsonld:documentLoader'),
    /**
     * @range {boolean}
     */
    strictValues: new core_1.ActionContextKey('@comunica/actor-rdf-parse-jsonld:strictValues'),
    /**
     * @range {Record<string, any>}
     */
    parserOptions: new core_1.ActionContextKey('@comunica/actor-rdf-parse-jsonld:parserOptions'),
};
exports.KeysRdfParseHtmlScript = {
    /**
     * An internal context flag to determine if the engine is already processing an HTML script tag.
     */
    processingHtmlScript: new core_1.ActionContextKey('@comunica/actor-rdf-parse-html-script:processingHtmlScript'),
    /**
     * If all HTML script tags must be considered.
     */
    extractAllScripts: new core_1.ActionContextKey('extractAllScripts'),
};
exports.KeysQuerySourceIdentify = {
    /**
     * A map containing unique IDs for each source
     */
    sourceIds: new core_1.ActionContextKey('@comunica/bus-query-source-identify:sourceIds'),
    /**
     * Hypermedia sources mapping to their aggregated store.
     */
    hypermediaSourcesAggregatedStores: new core_1.ActionContextKey('@comunica/bus-query-source-identify:hypermediaSourcesAggregatedStores'),
    /**
     * If links may be traversed from this source.
     * This means that sources annotated with this flag are considered incomplete until all links have been traversed.
     */
    traverse: new core_1.ActionContextKey('@comunica/bus-query-source-identify:traverse'),
};
exports.KeysRdfUpdateQuads = {
    /**
     * A data destination.
     */
    destination: new core_1.ActionContextKey('@comunica/bus-rdf-update-quads:destination'),
};
exports.KeysMergeBindingsContext = {
    /**
     * The data sources required to produce the binding
     */
    sourcesBinding: new core_1.ActionContextKey('@comunica/bus-merge-bindings-context:sourcesBinding'),
};
exports.KeysRdfJoin = {
    /**
     * The last physical join actor that was executed.
     */
    lastPhysicalJoin: new core_1.ActionContextKey('@comunica/bus-rdf-join:lastPhysicalJoin'),
};
exports.KeysStatistics = {
    /**
     * All discovered links during query execution. Not all of them will necessarily be dereferenced.
     */
    discoveredLinks: new core_1.ActionContextKey('@comunica/statistic:discoveredLinks'),
    /**
     * Information about what links are dereferenced and when
     */
    dereferencedLinks: new core_1.ActionContextKey('@comunica/statistic:dereferencedLinks'),
    /**
     * Intermediate results produced during query execution
     */
    intermediateResults: new core_1.ActionContextKey('@comunica/statistic:intermediateResults'),
};
//# sourceMappingURL=Keys.js.map