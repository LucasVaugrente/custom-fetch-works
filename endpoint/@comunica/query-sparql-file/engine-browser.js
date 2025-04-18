module.exports = function(variables) {
function getVariableValue(name) {
  if (!variables || !(name in variables)) {
    throw new Error('Undefined variable: ' + name);
  }
  return variables[name];
}
const df_713_1 = new (require('@comunica/logger-void').LoggerVoid)();
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_init__4_0_0_components_ActorInit_jsonld_ActorInit_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-init/^4.0.0/components/ActorInit.jsonld#ActorInit_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_context_preprocess__4_0_0_components_ActorContextPreprocess_jsonld_ActorContextPreprocess_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-context-preprocess/^4.0.0/components/ActorContextPreprocess.jsonld#ActorContextPreprocess_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_hash_bindings__4_0_0_components_ActorHashBindings_jsonld_ActorHashBindings_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-hash-bindings/^4.0.0/components/ActorHashBindings.jsonld#ActorHashBindings_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_hash_quads__4_0_0_components_ActorHashQuads_jsonld_ActorHashQuads_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-hash-quads/^4.0.0/components/ActorHashQuads.jsonld#ActorHashQuads_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_optimize_query_operation__4_0_0_components_ActorOptimizeQueryOperation_jsonld_ActorOptimizeQueryOperation_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-optimize-query-operation/^4.0.0/components/ActorOptimizeQueryOperation.jsonld#ActorOptimizeQueryOperation_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_parse__4_0_0_components_ActorQueryParse_jsonld_ActorQueryParse_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-query-parse/^4.0.0/components/ActorQueryParse.jsonld#ActorQueryParse_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_result_serialize__4_0_0_components_ActorQueryResultSerialize_jsonld_ActorQueryResultSerialize_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-query-result-serialize/^4.0.0/components/ActorQueryResultSerialize.jsonld#ActorQueryResultSerialize_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_source_identify_hypermedia__4_0_0_components_ActorQuerySourceIdentifyHypermedia_jsonld_ActorQuerySourceIdentifyHypermedia_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-query-source-identify-hypermedia/^4.0.0/components/ActorQuerySourceIdentifyHypermedia.jsonld#ActorQuerySourceIdentifyHypermedia_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_dereference__4_0_0_components_ActorDereference_jsonld_ActorDereference_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-dereference/^4.0.0/components/ActorDereference.jsonld#ActorDereference_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_dereference_rdf__4_0_0_components_ActorDereferenceRdf_jsonld_ActorDereferenceRdf_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-dereference-rdf/^4.0.0/components/ActorDereferenceRdf.jsonld#ActorDereferenceRdf_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join_entries_sort__4_0_0_components_ActorRdfJoinEntriesSort_jsonld_ActorRdfJoinEntriesSort_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-rdf-join-entries-sort/^4.0.0/components/ActorRdfJoinEntriesSort.jsonld#ActorRdfJoinEntriesSort_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join_selectivity__4_0_0_components_ActorRdfJoinSelectivity_jsonld_ActorRdfJoinSelectivity_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-rdf-join-selectivity/^4.0.0/components/ActorRdfJoinSelectivity.jsonld#ActorRdfJoinSelectivity_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_metadata__4_0_0_components_ActorRdfMetadata_jsonld_ActorRdfMetadata_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-rdf-metadata/^4.0.0/components/ActorRdfMetadata.jsonld#ActorRdfMetadata_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_metadata_accumulate__4_0_0_components_ActorRdfMetadataAccumulate_jsonld_ActorRdfMetadataAccumulate_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-rdf-metadata-accumulate/^4.0.0/components/ActorRdfMetadataAccumulate.jsonld#ActorRdfMetadataAccumulate_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_metadata_extract__4_0_0_components_ActorRdfMetadataExtract_jsonld_ActorRdfMetadataExtract_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-rdf-metadata-extract/^4.0.0/components/ActorRdfMetadataExtract.jsonld#ActorRdfMetadataExtract_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_parse__4_0_0_components_ActorRdfParse_jsonld_ActorRdfParse_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-rdf-parse/^4.0.0/components/ActorRdfParse.jsonld#ActorRdfParse_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_parse_html__4_0_0_components_ActorRdfParseHtml_jsonld_ActorRdfParseHtml_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-rdf-parse-html/^4.0.0/components/ActorRdfParseHtml.jsonld#ActorRdfParseHtml_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_resolve_hypermedia_links__4_0_0_components_ActorRdfResolveHypermediaLinks_jsonld_ActorRdfResolveHypermediaLinks_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-rdf-resolve-hypermedia-links/^4.0.0/components/ActorRdfResolveHypermediaLinks.jsonld#ActorRdfResolveHypermediaLinks_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_resolve_hypermedia_links_queue__4_0_0_components_ActorRdfResolveHypermediaLinksQueue_jsonld_ActorRdfResolveHypermediaLinksQueue_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-rdf-resolve-hypermedia-links-queue/^4.0.0/components/ActorRdfResolveHypermediaLinksQueue.jsonld#ActorRdfResolveHypermediaLinksQueue_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_serialize__4_0_0_components_ActorRdfSerialize_jsonld_ActorRdfSerialize_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-rdf-serialize/^4.0.0/components/ActorRdfSerialize.jsonld#ActorRdfSerialize_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_update_hypermedia__4_0_0_components_ActorRdfUpdateHypermedia_jsonld_ActorRdfUpdateHypermedia_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-rdf-update-hypermedia/^4.0.0/components/ActorRdfUpdateHypermedia.jsonld#ActorRdfUpdateHypermedia_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_update_quads__4_0_0_components_ActorRdfUpdateQuads_jsonld_ActorRdfUpdateQuads_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-rdf-update-quads/^4.0.0/components/ActorRdfUpdateQuads.jsonld#ActorRdfUpdateQuads_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_bindings_aggregator_factory__4_0_0_components_ActorBindingsAggregatorFactory_jsonld_ActorBindingsAggregatorFactory_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-bindings-aggregator-factory/^4.0.0/components/ActorBindingsAggregatorFactory.jsonld#ActorBindingsAggregatorFactory_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_expression_evaluator_factory__4_0_0_components_ActorExpressionEvaluatorFactory_jsonld_ActorExpressionEvaluatorFactory_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-expression-evaluator-factory/^4.0.0/components/ActorExpressionEvaluatorFactory.jsonld#ActorExpressionEvaluatorFactory_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus = new (require('@comunica/bus-function-factory').BusFunctionFactory)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-function-factory/^4.0.0/components/ActorFunctionFactory.jsonld#ActorFunctionFactory_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_http__4_0_0_components_ActorHttp_jsonld_ActorHttp_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-http/^4.0.0/components/ActorHttp.jsonld#ActorHttp_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_http__4_0_0_components_ActorHttp_jsonld_ActorHttp_fallback_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-http/^4.0.0/components/ActorHttp.jsonld#ActorHttp_fallback_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus = new (require('@comunica/bus-query-operation').BusQueryOperation)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-query-operation/^4.0.0/components/ActorQueryOperation.jsonld#ActorQueryOperation_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_process__4_0_0_components_ActorQueryProcess_jsonld_ActorQueryProcess_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-query-process/^4.0.0/components/ActorQueryProcess.jsonld#ActorQueryProcess_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_source_identify__4_0_0_components_ActorQuerySourceIdentify_jsonld_ActorQuerySourceIdentify_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-query-source-identify/^4.0.0/components/ActorQuerySourceIdentify.jsonld#ActorQuerySourceIdentify_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-rdf-join/^4.0.0/components/ActorRdfJoin.jsonld#ActorRdfJoin_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_term_comparator_factory__4_0_0_components_ActorTermComparatorFactory_jsonld_ActorTermComparatorFactory_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-term-comparator-factory/^4.0.0/components/ActorTermComparatorFactory.jsonld#ActorTermComparatorFactory_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_http_invalidate__4_0_0_components_ActorHttpInvalidate_jsonld_ActorHttpInvalidate_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-http-invalidate/^4.0.0/components/ActorHttpInvalidate.jsonld#ActorHttpInvalidate_default_bus'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_merge_bindings_context__4_0_0_components_ActorMergeBindingsContext_jsonld_ActorMergeBindingsContext_default_bus = new (require('@comunica/core').Bus)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/bus-merge-bindings-context/^4.0.0/components/ActorMergeBindingsContext.jsonld#ActorMergeBindingsContext_default_bus'
});
const urn_comunica_default_context_preprocess_actors_convert_shortcuts = new (require('@comunica/actor-context-preprocess-convert-shortcuts').ActorContextPreprocessConvertShortcuts)({
  'contextKeyShortcuts': {"baseIRI":"@comunica/actor-init-query:baseIRI","dataFactory":"@comunica/actor-init-query:dataFactory","datetime":"@comunica/actor-http-memento:datetime","destination":"@comunica/bus-rdf-update-quads:destination","distinctConstruct":"@comunica/actor-init-query:distinctConstruct","explain":"@comunica/actor-init-query:explain","extensionFunctionCreator":"@comunica/actor-init-query:extensionFunctionCreator","extensionFunctions":"@comunica/actor-init-query:extensionFunctions","fetch":"@comunica/bus-http:fetch","functionArgumentsCache":"@comunica/actor-init-query:functionArgumentsCache","httpAuth":"@comunica/bus-http:auth","httpBodyTimeout":"@comunica/bus-http:http-body-timeout","httpIncludeCredentials":"@comunica/bus-http:include-credentials","httpProxyHandler":"@comunica/actor-http-proxy:httpProxyHandler","httpRetryCount":"@comunica/bus-http:http-retry-count","httpRetryDelayFallback":"@comunica/bus-http:http-retry-delay-fallback","httpRetryDelayLimit":"@comunica/bus-http:http-retry-delay-limit","httpTimeout":"@comunica/bus-http:http-timeout","initialBindings":"@comunica/actor-init-query:initialBindings","invalidateCache":"@comunica/actor-init-query:invalidateCache","lenient":"@comunica/actor-init-query:lenient","log":"@comunica/core:log","queryFormat":"@comunica/actor-init-query:queryFormat","queryTimestamp":"@comunica/actor-init-query:queryTimestamp","queryTimestampHighResolution":"@comunica/actor-init-query:queryTimestampHighResolution","readOnly":"@comunica/bus-query-operation:readOnly","recoverBrokenLinks":"@comunica/bus-http-wayback:recover-broken-links","sources":"@comunica/actor-init-query:querySourcesUnidentified","traverse":"@comunica/bus-query-source-identify:traverse","unionDefaultGraph":"@comunica/bus-query-operation:unionDefaultGraph"},
  'name': 'urn:comunica:default:context-preprocess/actors#convert-shortcuts',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_context_preprocess__4_0_0_components_ActorContextPreprocess_jsonld_ActorContextPreprocess_default_bus,
  'busFailMessage': 'Context preprocessing failed'
});
const urn_comunica_default_context_preprocess_actors_set_defaults = new (require('@comunica/actor-context-preprocess-set-defaults').ActorContextPreprocessSetDefaults)({
  'logger': df_713_1,
  'name': 'urn:comunica:default:context-preprocess/actors#set-defaults',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_context_preprocess__4_0_0_components_ActorContextPreprocess_jsonld_ActorContextPreprocess_default_bus,
  'busFailMessage': 'Context preprocessing failed'
});
const urn_comunica_default_context_preprocess_actors_source_to_destination = new (require('@comunica/actor-context-preprocess-source-to-destination').ActorContextPreprocessSourceToDestination)({
  'name': 'urn:comunica:default:context-preprocess/actors#source-to-destination',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_context_preprocess__4_0_0_components_ActorContextPreprocess_jsonld_ActorContextPreprocess_default_bus,
  'busFailMessage': 'Context preprocessing failed'
});
const urn_comunica_default_context_preprocess_actors_query_source_skolemize = new (require('@comunica/actor-context-preprocess-query-source-skolemize').ActorContextPreprocessQuerySourceSkolemize)({
  'name': 'urn:comunica:default:context-preprocess/actors#query-source-skolemize',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_context_preprocess__4_0_0_components_ActorContextPreprocess_jsonld_ActorContextPreprocess_default_bus,
  'busFailMessage': 'Context preprocessing failed'
});
const urn_comunica_default_context_preprocess_mediators_main = new (require('@comunica/mediator-combine-pipeline').MediatorCombinePipeline)({
  'name': 'urn:comunica:default:context-preprocess/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_context_preprocess__4_0_0_components_ActorContextPreprocess_jsonld_ActorContextPreprocess_default_bus
});
const urn_comunica_default_hash_bindings_actors_murmur = new (require('@comunica/actor-hash-bindings-murmur').ActorHashBindingsMurmur)({
  'name': 'urn:comunica:default:hash-bindings/actors#murmur',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_hash_bindings__4_0_0_components_ActorHashBindings_jsonld_ActorHashBindings_default_bus,
  'busFailMessage': 'Failed to obtaining hash functions for bindings'
});
const urn_comunica_default_hash_bindings_mediators_main = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:hash-bindings/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_hash_bindings__4_0_0_components_ActorHashBindings_jsonld_ActorHashBindings_default_bus
});
const urn_comunica_default_hash_quads_actors_murmur = new (require('@comunica/actor-hash-quads-murmur').ActorHashQuadsMurmur)({
  'name': 'urn:comunica:default:hash-quads/actors#murmur',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_hash_quads__4_0_0_components_ActorHashQuads_jsonld_ActorHashQuads_default_bus,
  'busFailMessage': 'Failed to obtaining hash functions for quads'
});
const urn_comunica_default_hash_quads_mediators_main = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:hash-quads/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_hash_quads__4_0_0_components_ActorHashQuads_jsonld_ActorHashQuads_default_bus
});
const urn_comunica_default_optimize_query_operation_actors_rewrite_copy = new (require('@comunica/actor-optimize-query-operation-rewrite-copy').ActorOptimizeQueryOperationRewriteCopy)({
  'name': 'urn:comunica:default:optimize-query-operation/actors#rewrite-copy',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_optimize_query_operation__4_0_0_components_ActorOptimizeQueryOperation_jsonld_ActorOptimizeQueryOperation_default_bus,
  'busFailMessage': 'Query optimization failed: none of the configured actors were able to optimize'
});
const urn_comunica_default_optimize_query_operation_actors_rewrite_move = new (require('@comunica/actor-optimize-query-operation-rewrite-move').ActorOptimizeQueryOperationRewriteMove)({
  'name': 'urn:comunica:default:optimize-query-operation/actors#rewrite-move',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_optimize_query_operation__4_0_0_components_ActorOptimizeQueryOperation_jsonld_ActorOptimizeQueryOperation_default_bus,
  'busFailMessage': 'Query optimization failed: none of the configured actors were able to optimize'
});
const urn_comunica_default_optimize_query_operation_actors_rewrite_add = new (require('@comunica/actor-optimize-query-operation-rewrite-add').ActorOptimizeQueryOperationRewriteAdd)({
  'name': 'urn:comunica:default:optimize-query-operation/actors#rewrite-add',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_optimize_query_operation__4_0_0_components_ActorOptimizeQueryOperation_jsonld_ActorOptimizeQueryOperation_default_bus,
  'busFailMessage': 'Query optimization failed: none of the configured actors were able to optimize'
});
const urn_comunica_default_optimize_query_operation_actors_group_sources = new (require('@comunica/actor-optimize-query-operation-group-sources').ActorOptimizeQueryOperationGroupSources)({
  'name': 'urn:comunica:default:optimize-query-operation/actors#group-sources',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_optimize_query_operation__4_0_0_components_ActorOptimizeQueryOperation_jsonld_ActorOptimizeQueryOperation_default_bus,
  'busFailMessage': 'Query optimization failed: none of the configured actors were able to optimize'
});
const urn_comunica_default_optimize_query_operation_actors_construct_distinct = new (require('@comunica/actor-optimize-query-operation-construct-distinct').ActorOptimizeQueryOperationConstructDistinct)({
  'name': 'urn:comunica:default:optimize-query-operation/actors#construct-distinct',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_optimize_query_operation__4_0_0_components_ActorOptimizeQueryOperation_jsonld_ActorOptimizeQueryOperation_default_bus,
  'busFailMessage': 'Query optimization failed: none of the configured actors were able to optimize'
});
const urn_comunica_default_optimize_query_operation_mediators_main = new (require('@comunica/mediator-combine-pipeline').MediatorCombinePipeline)({
  'filterFailures': true,
  'name': 'urn:comunica:default:optimize-query-operation/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_optimize_query_operation__4_0_0_components_ActorOptimizeQueryOperation_jsonld_ActorOptimizeQueryOperation_default_bus
});
const urn_comunica_default_query_parse_actors_sparql = new (require('@comunica/actor-query-parse-sparql').ActorQueryParseSparql)({
  'prefixes': {"dbpedia":"http://dbpedia.org/resource/","dbpedia-owl":"http://dbpedia.org/ontology/","dbpprop":"http://dbpedia.org/property/","dc":"http://purl.org/dc/terms/","dc11":"http://purl.org/dc/elements/1.1/","dcterms":"http://purl.org/dc/terms/","foaf":"http://xmlns.com/foaf/0.1/","geo":"http://www.w3.org/2003/01/geo/wgs84_pos#","owl":"http://www.w3.org/2002/07/owl#","rdf":"http://www.w3.org/1999/02/22-rdf-syntax-ns#","rdfs":"http://www.w3.org/2000/01/rdf-schema#","schema":"http://schema.org/","skos":"http://www.w3.org/2008/05/skos#","xsd":"http://www.w3.org/2001/XMLSchema#"},
  'name': 'urn:comunica:default:query-parse/actors#sparql',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_parse__4_0_0_components_ActorQueryParse_jsonld_ActorQueryParse_default_bus,
  'busFailMessage': 'Query parsing failed: none of the configured parsers were able to the query "${action.query}"'
});
const urn_comunica_default_query_parse_actors_graphql = new (require('@comunica/actor-query-parse-graphql').ActorQueryParseGraphql)({
  'name': 'urn:comunica:default:query-parse/actors#graphql',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_parse__4_0_0_components_ActorQueryParse_jsonld_ActorQueryParse_default_bus,
  'busFailMessage': 'Query parsing failed: none of the configured parsers were able to the query "${action.query}"'
});
const urn_comunica_default_query_parse_mediators_main = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:query-parse/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_parse__4_0_0_components_ActorQueryParse_jsonld_ActorQueryParse_default_bus
});
const urn_comunica_default_query_result_serialize_actors_json = new (require('@comunica/actor-query-result-serialize-json').ActorQueryResultSerializeJson)({
  'mediaTypePriorities': {"application/json":1},
  'mediaTypeFormats': {"application/json":"https://comunica.linkeddatafragments.org/#results_JSON"},
  'name': 'urn:comunica:default:query-result-serialize/actors#json',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_result_serialize__4_0_0_components_ActorQueryResultSerialize_jsonld_ActorQueryResultSerialize_default_bus,
  'busFailMessage': 'Query result serialization failed: none of the configured actors were able to serialize for type ${action.handle.type}'
});
const urn_comunica_default_query_result_serialize_actors_simple = new (require('@comunica/actor-query-result-serialize-simple').ActorQueryResultSerializeSimple)({
  'mediaTypePriorities': {"simple":0.9},
  'mediaTypeFormats': {"simple":"https://comunica.linkeddatafragments.org/#results_simple"},
  'name': 'urn:comunica:default:query-result-serialize/actors#simple',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_result_serialize__4_0_0_components_ActorQueryResultSerialize_jsonld_ActorQueryResultSerialize_default_bus,
  'busFailMessage': 'Query result serialization failed: none of the configured actors were able to serialize for type ${action.handle.type}'
});
const urn_comunica_default_query_result_serialize_actors_csv = new (require('@comunica/actor-query-result-serialize-sparql-csv').ActorQueryResultSerializeSparqlCsv)({
  'mediaTypePriorities': {"text/csv":0.75},
  'mediaTypeFormats': {"text/csv":"http://www.w3.org/ns/formats/SPARQL_Results_CSV"},
  'name': 'urn:comunica:default:query-result-serialize/actors#csv',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_result_serialize__4_0_0_components_ActorQueryResultSerialize_jsonld_ActorQueryResultSerialize_default_bus,
  'busFailMessage': 'Query result serialization failed: none of the configured actors were able to serialize for type ${action.handle.type}'
});
const urn_comunica_default_query_result_serialize_actors_sparql_tsv = new (require('@comunica/actor-query-result-serialize-sparql-tsv').ActorQueryResultSerializeSparqlTsv)({
  'mediaTypePriorities': {"text/tab-separated-values":0.75},
  'mediaTypeFormats': {"text/tab-separated-values":"http://www.w3.org/ns/formats/SPARQL_Results_TSV"},
  'name': 'urn:comunica:default:query-result-serialize/actors#sparql-tsv',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_result_serialize__4_0_0_components_ActorQueryResultSerialize_jsonld_ActorQueryResultSerialize_default_bus,
  'busFailMessage': 'Query result serialization failed: none of the configured actors were able to serialize for type ${action.handle.type}'
});
const urn_comunica_default_query_result_serialize_actors_sparql_xml = new (require('@comunica/actor-query-result-serialize-sparql-xml').ActorQueryResultSerializeSparqlXml)({
  'mediaTypePriorities': {"application/sparql-results+xml":0.8},
  'mediaTypeFormats': {"application/sparql-results+xml":"http://www.w3.org/ns/formats/SPARQL_Results_XML"},
  'name': 'urn:comunica:default:query-result-serialize/actors#sparql-xml',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_result_serialize__4_0_0_components_ActorQueryResultSerialize_jsonld_ActorQueryResultSerialize_default_bus,
  'busFailMessage': 'Query result serialization failed: none of the configured actors were able to serialize for type ${action.handle.type}'
});
const urn_comunica_default_query_result_serialize_actors_table = new (require('@comunica/actor-query-result-serialize-table').ActorQueryResultSerializeTable)({
  'columnWidth': 50,
  'mediaTypePriorities': {"table":0.6},
  'mediaTypeFormats': {"table":"https://comunica.linkeddatafragments.org/#results_table"},
  'name': 'urn:comunica:default:query-result-serialize/actors#table',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_result_serialize__4_0_0_components_ActorQueryResultSerialize_jsonld_ActorQueryResultSerialize_default_bus,
  'busFailMessage': 'Query result serialization failed: none of the configured actors were able to serialize for type ${action.handle.type}'
});
const urn_comunica_default_query_result_serialize_actors_tree = new (require('@comunica/actor-query-result-serialize-tree').ActorQueryResultSerializeTree)({
  'mediaTypePriorities': {"tree":0.5},
  'mediaTypeFormats': {"tree":"https://comunica.linkeddatafragments.org/#results_tree"},
  'name': 'urn:comunica:default:query-result-serialize/actors#tree',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_result_serialize__4_0_0_components_ActorQueryResultSerialize_jsonld_ActorQueryResultSerialize_default_bus,
  'busFailMessage': 'Query result serialization failed: none of the configured actors were able to serialize for type ${action.handle.type}'
});
const urn_comunica_default_query_result_serialize_mediators_serialize = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:query-result-serialize/mediators#serialize',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_result_serialize__4_0_0_components_ActorQueryResultSerialize_jsonld_ActorQueryResultSerialize_default_bus
});
const urn_comunica_default_query_result_serialize_mediators_mediaType = new (require('@comunica/mediator-combine-union').MediatorCombineUnion)({
  'field': 'mediaTypes',
  'name': 'urn:comunica:default:query-result-serialize/mediators#mediaType',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_result_serialize__4_0_0_components_ActorQueryResultSerialize_jsonld_ActorQueryResultSerialize_default_bus
});
const urn_comunica_default_query_result_serialize_mediators_mediaTypeFormat = new (require('@comunica/mediator-combine-union').MediatorCombineUnion)({
  'field': 'mediaTypeFormats',
  'name': 'urn:comunica:default:query-result-serialize/mediators#mediaTypeFormat',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_result_serialize__4_0_0_components_ActorQueryResultSerialize_jsonld_ActorQueryResultSerialize_default_bus
});
const urn_comunica_default_query_source_identify_hypermedia_mediators_main = new (require('@comunica/mediator-number').MediatorNumber)({
  'field': 'filterFactor',
  'type': 'max',
  'ignoreFailures': true,
  'name': 'urn:comunica:default:query-source-identify-hypermedia/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_source_identify_hypermedia__4_0_0_components_ActorQuerySourceIdentifyHypermedia_jsonld_ActorQuerySourceIdentifyHypermedia_default_bus
});
const urn_comunica_default_dereference_actors_fallback = new (require('@comunica/actor-dereference-fallback').ActorDereferenceFallback)({
  'name': 'urn:comunica:default:dereference/actors#fallback',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_dereference__4_0_0_components_ActorDereference_jsonld_ActorDereference_default_bus,
  'busFailMessage': 'Dereferencing failed: none of the configured actors were able to handle ${action.url}'
});
const urn_comunica_default_dereference_mediators_main = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:dereference/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_dereference__4_0_0_components_ActorDereference_jsonld_ActorDereference_default_bus
});
const urn_comunica_default_dereference_rdf_mediators_main = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:dereference-rdf/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_dereference_rdf__4_0_0_components_ActorDereferenceRdf_jsonld_ActorDereferenceRdf_default_bus
});
const urn_comunica_default_rdf_join_entries_sort_actors_cardinality = new (require('@comunica/actor-rdf-join-entries-sort-cardinality').ActorRdfJoinEntriesSortCardinality)({
  'name': 'urn:comunica:default:rdf-join-entries-sort/actors#cardinality',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join_entries_sort__4_0_0_components_ActorRdfJoinEntriesSort_jsonld_ActorRdfJoinEntriesSort_default_bus,
  'busFailMessage': 'Sorting join entries failed: none of the configured actors were able to sort'
});
const urn_comunica_default_rdf_join_entries_sort_mediators_main = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:rdf-join-entries-sort/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join_entries_sort__4_0_0_components_ActorRdfJoinEntriesSort_jsonld_ActorRdfJoinEntriesSort_default_bus
});
const urn_comunica_default_rdf_join_selectivity_actors_variable_counting = new (require('@comunica/actor-rdf-join-selectivity-variable-counting').ActorRdfJoinSelectivityVariableCounting)({
  'name': 'urn:comunica:default:rdf-join-selectivity/actors#variable-counting',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join_selectivity__4_0_0_components_ActorRdfJoinSelectivity_jsonld_ActorRdfJoinSelectivity_default_bus,
  'busFailMessage': 'Determining join selectivity failed: none of the configured actors were able to calculate selectivities'
});
const urn_comunica_default_rdf_join_selectivity_mediators_main = new (require('@comunica/mediator-number').MediatorNumber)({
  'field': 'accuracy',
  'type': 'max',
  'ignoreFailures': true,
  'name': 'urn:comunica:default:rdf-join-selectivity/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join_selectivity__4_0_0_components_ActorRdfJoinSelectivity_jsonld_ActorRdfJoinSelectivity_default_bus
});
const urn_comunica_default_rdf_metadata_actors_primary_topic = new (require('@comunica/actor-rdf-metadata-primary-topic').ActorRdfMetadataPrimaryTopic)({
  'metadataToData': false,
  'dataToMetadataOnInvalidMetadataGraph': true,
  'name': 'urn:comunica:default:rdf-metadata/actors#primary-topic',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_metadata__4_0_0_components_ActorRdfMetadata_jsonld_ActorRdfMetadata_default_bus,
  'busFailMessage': 'Metadata splicing failed: none of the configured actors were able to splice metadata from ${action.url}'
});
const urn_comunica_default_rdf_metadata_actors_all = new (require('@comunica/actor-rdf-metadata-all').ActorRdfMetadataAll)({
  'name': 'urn:comunica:default:rdf-metadata/actors#all',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_metadata__4_0_0_components_ActorRdfMetadata_jsonld_ActorRdfMetadata_default_bus,
  'busFailMessage': 'Metadata splicing failed: none of the configured actors were able to splice metadata from ${action.url}'
});
const urn_comunica_default_rdf_metadata_mediators_main = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:rdf-metadata/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_metadata__4_0_0_components_ActorRdfMetadata_jsonld_ActorRdfMetadata_default_bus
});
const urn_comunica_default_rdf_metadata_accumulate_actors_cardinality = new (require('@comunica/actor-rdf-metadata-accumulate-cardinality').ActorRdfMetadataAccumulateCardinality)({
  'name': 'urn:comunica:default:rdf-metadata-accumulate/actors#cardinality',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_metadata_accumulate__4_0_0_components_ActorRdfMetadataAccumulate_jsonld_ActorRdfMetadataAccumulate_default_bus,
  'busFailMessage': 'Metadata accumulation failed: none of the configured actors were able to accumulate metadata in mode ${action.mode}'
});
const urn_comunica_default_rdf_metadata_accumulate_actors_pagesize = new (require('@comunica/actor-rdf-metadata-accumulate-pagesize').ActorRdfMetadataAccumulatePageSize)({
  'name': 'urn:comunica:default:rdf-metadata-accumulate/actors#pagesize',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_metadata_accumulate__4_0_0_components_ActorRdfMetadataAccumulate_jsonld_ActorRdfMetadataAccumulate_default_bus,
  'busFailMessage': 'Metadata accumulation failed: none of the configured actors were able to accumulate metadata in mode ${action.mode}'
});
const urn_comunica_default_rdf_metadata_accumulate_actors_requesttime = new (require('@comunica/actor-rdf-metadata-accumulate-requesttime').ActorRdfMetadataAccumulateRequestTime)({
  'name': 'urn:comunica:default:rdf-metadata-accumulate/actors#requesttime',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_metadata_accumulate__4_0_0_components_ActorRdfMetadataAccumulate_jsonld_ActorRdfMetadataAccumulate_default_bus,
  'busFailMessage': 'Metadata accumulation failed: none of the configured actors were able to accumulate metadata in mode ${action.mode}'
});
const urn_comunica_default_rdf_metadata_accumulate_mediators_main = new (require('@comunica/mediator-combine-union').MediatorCombineUnion)({
  'field': 'metadata',
  'name': 'urn:comunica:default:rdf-metadata-accumulate/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_metadata_accumulate__4_0_0_components_ActorRdfMetadataAccumulate_jsonld_ActorRdfMetadataAccumulate_default_bus
});
const urn_comunica_default_rdf_metadata_extract_actors_hydra_controls = new (require('@comunica/actor-rdf-metadata-extract-hydra-controls').ActorRdfMetadataExtractHydraControls)({
  'name': 'urn:comunica:default:rdf-metadata-extract/actors#hydra-controls',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_metadata_extract__4_0_0_components_ActorRdfMetadataExtract_jsonld_ActorRdfMetadataExtract_default_bus,
  'busFailMessage': 'Metadata extraction failed: none of the configured actors were able to extract metadata from ${action.url}'
});
const urn_comunica_default_rdf_metadata_extract_actors_hydra_count = new (require('@comunica/actor-rdf-metadata-extract-hydra-count').ActorRdfMetadataExtractHydraCount)({
  'predicates': [
  'http://www.w3.org/ns/hydra/core#totalItems',
  'http://rdfs.org/ns/void#triples'
],
  'name': 'urn:comunica:default:rdf-metadata-extract/actors#hydra-count',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_metadata_extract__4_0_0_components_ActorRdfMetadataExtract_jsonld_ActorRdfMetadataExtract_default_bus,
  'busFailMessage': 'Metadata extraction failed: none of the configured actors were able to extract metadata from ${action.url}'
});
const urn_comunica_default_rdf_metadata_extract_actors_hydra_pagesize = new (require('@comunica/actor-rdf-metadata-extract-hydra-pagesize').ActorRdfMetadataExtractHydraPagesize)({
  'predicates': [
  'http://www.w3.org/ns/hydra/core#itemsPerPage'
],
  'name': 'urn:comunica:default:rdf-metadata-extract/actors#hydra-pagesize',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_metadata_extract__4_0_0_components_ActorRdfMetadataExtract_jsonld_ActorRdfMetadataExtract_default_bus,
  'busFailMessage': 'Metadata extraction failed: none of the configured actors were able to extract metadata from ${action.url}'
});
const urn_comunica_default_rdf_metadata_extract_actors_request_time = new (require('@comunica/actor-rdf-metadata-extract-request-time').ActorRdfMetadataExtractRequestTime)({
  'name': 'urn:comunica:default:rdf-metadata-extract/actors#request-time',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_metadata_extract__4_0_0_components_ActorRdfMetadataExtract_jsonld_ActorRdfMetadataExtract_default_bus,
  'busFailMessage': 'Metadata extraction failed: none of the configured actors were able to extract metadata from ${action.url}'
});
const urn_comunica_default_rdf_metadata_extract_actors_allow_http_methods = new (require('@comunica/actor-rdf-metadata-extract-allow-http-methods').ActorRdfMetadataExtractAllowHttpMethods)({
  'name': 'urn:comunica:default:rdf-metadata-extract/actors#allow-http-methods',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_metadata_extract__4_0_0_components_ActorRdfMetadataExtract_jsonld_ActorRdfMetadataExtract_default_bus,
  'busFailMessage': 'Metadata extraction failed: none of the configured actors were able to extract metadata from ${action.url}'
});
const urn_comunica_default_rdf_metadata_extract_actors_put_accepted = new (require('@comunica/actor-rdf-metadata-extract-put-accepted').ActorRdfMetadataExtractPutAccepted)({
  'name': 'urn:comunica:default:rdf-metadata-extract/actors#put-accepted',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_metadata_extract__4_0_0_components_ActorRdfMetadataExtract_jsonld_ActorRdfMetadataExtract_default_bus,
  'busFailMessage': 'Metadata extraction failed: none of the configured actors were able to extract metadata from ${action.url}'
});
const urn_comunica_default_rdf_metadata_extract_actors_patch_sparql_update = new (require('@comunica/actor-rdf-metadata-extract-patch-sparql-update').ActorRdfMetadataExtractPatchSparqlUpdate)({
  'name': 'urn:comunica:default:rdf-metadata-extract/actors#patch-sparql-update',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_metadata_extract__4_0_0_components_ActorRdfMetadataExtract_jsonld_ActorRdfMetadataExtract_default_bus,
  'busFailMessage': 'Metadata extraction failed: none of the configured actors were able to extract metadata from ${action.url}'
});
const urn_comunica_default_rdf_metadata_extract_actors_sparql_service = new (require('@comunica/actor-rdf-metadata-extract-sparql-service').ActorRdfMetadataExtractSparqlService)({
  'inferHttpsEndpoint': true,
  'name': 'urn:comunica:default:rdf-metadata-extract/actors#sparql-service',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_metadata_extract__4_0_0_components_ActorRdfMetadataExtract_jsonld_ActorRdfMetadataExtract_default_bus,
  'busFailMessage': 'Metadata extraction failed: none of the configured actors were able to extract metadata from ${action.url}'
});
const urn_comunica_default_rdf_metadata_extract_mediators_main = new (require('@comunica/mediator-combine-union').MediatorCombineUnion)({
  'filterFailures': true,
  'field': 'metadata',
  'name': 'urn:comunica:default:rdf-metadata-extract/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_metadata_extract__4_0_0_components_ActorRdfMetadataExtract_jsonld_ActorRdfMetadataExtract_default_bus
});
const urn_comunica_default_rdf_parse_actors_n3 = new (require('@comunica/actor-rdf-parse-n3').ActorRdfParseN3)({
  'mediaTypePriorities': {"application/n-quads":1,"application/n-triples":0.8,"application/trig":0.95,"text/n3":0.35,"text/turtle":0.6},
  'mediaTypeFormats': {"application/n-quads":"http://www.w3.org/ns/formats/N-Quads","application/n-triples":"http://www.w3.org/ns/formats/N-Triples","application/trig":"http://www.w3.org/ns/formats/TriG","text/n3":"http://www.w3.org/ns/formats/N3","text/turtle":"http://www.w3.org/ns/formats/Turtle"},
  'priorityScale': 1,
  'name': 'urn:comunica:default:rdf-parse/actors#n3',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_parse__4_0_0_components_ActorRdfParse_jsonld_ActorRdfParse_default_bus,
  'busFailMessage': 'RDF parsing failed: none of the configured parsers were able to handle the media type ${action.handle.mediaType} for ${action.handle.url}'
});
const urn_comunica_default_rdf_parse_actors_rdfxml = new (require('@comunica/actor-rdf-parse-rdfxml').ActorRdfParseRdfXml)({
  'mediaTypePriorities': {"application/rdf+xml":1},
  'mediaTypeFormats': {"application/rdf+xml":"http://www.w3.org/ns/formats/RDF_XML"},
  'priorityScale': 0.5,
  'name': 'urn:comunica:default:rdf-parse/actors#rdfxml',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_parse__4_0_0_components_ActorRdfParse_jsonld_ActorRdfParse_default_bus,
  'busFailMessage': 'RDF parsing failed: none of the configured parsers were able to handle the media type ${action.handle.mediaType} for ${action.handle.url}'
});
const urn_comunica_default_rdf_parse_actors_xmlrdfa = new (require('@comunica/actor-rdf-parse-xml-rdfa').ActorRdfParseXmlRdfa)({
  'mediaTypePriorities': {"application/xml":1,"image/svg+xml":1,"text/xml":1},
  'mediaTypeFormats': {"application/xml":"http://www.w3.org/ns/formats/RDFa","image/svg+xml":"http://www.w3.org/ns/formats/RDFa","text/xml":"http://www.w3.org/ns/formats/RDFa"},
  'priorityScale': 0.3,
  'name': 'urn:comunica:default:rdf-parse/actors#xmlrdfa',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_parse__4_0_0_components_ActorRdfParse_jsonld_ActorRdfParse_default_bus,
  'busFailMessage': 'RDF parsing failed: none of the configured parsers were able to handle the media type ${action.handle.mediaType} for ${action.handle.url}'
});
const urn_comunica_default_rdf_parse_actors_shaclc = new (require('@comunica/actor-rdf-parse-shaclc').ActorRdfParseShaclc)({
  'mediaTypePriorities': {"text/shaclc":1,"text/shaclc-ext":0.5},
  'mediaTypeFormats': {"text/shaclc":"http://www.w3.org/ns/formats/Shaclc","text/shaclc-ext":"http://www.w3.org/ns/formats/ShaclcExtended"},
  'priorityScale': 0.1,
  'name': 'urn:comunica:default:rdf-parse/actors#shaclc',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_parse__4_0_0_components_ActorRdfParse_jsonld_ActorRdfParse_default_bus,
  'busFailMessage': 'RDF parsing failed: none of the configured parsers were able to handle the media type ${action.handle.mediaType} for ${action.handle.url}'
});
const urn_comunica_default_rdf_parse_mediators_parse = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:rdf-parse/mediators#parse',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_parse__4_0_0_components_ActorRdfParse_jsonld_ActorRdfParse_default_bus
});
const urn_comunica_default_rdf_parse_mediators_mediaType = new (require('@comunica/mediator-combine-union').MediatorCombineUnion)({
  'field': 'mediaTypes',
  'name': 'urn:comunica:default:rdf-parse/mediators#mediaType',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_parse__4_0_0_components_ActorRdfParse_jsonld_ActorRdfParse_default_bus
});
const urn_comunica_default_rdf_parse_actors_html = new (require('@comunica/actor-rdf-parse-html').ActorRdfParseHtml)({
  'busRdfParseHtml': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_parse_html__4_0_0_components_ActorRdfParseHtml_jsonld_ActorRdfParseHtml_default_bus,
  'mediaTypePriorities': {"application/xhtml+xml":0.9,"text/html":1},
  'mediaTypeFormats': {"application/xhtml+xml":"http://www.w3.org/ns/formats/HTML","text/html":"http://www.w3.org/ns/formats/HTML"},
  'priorityScale': 0.2,
  'name': 'urn:comunica:default:rdf-parse/actors#html',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_parse__4_0_0_components_ActorRdfParse_jsonld_ActorRdfParse_default_bus,
  'busFailMessage': 'RDF parsing failed: none of the configured parsers were able to handle the media type ${action.handle.mediaType} for ${action.handle.url}'
});
const urn_comunica_default_rdf_parse_html_actors_microdata = new (require('@comunica/actor-rdf-parse-html-microdata').ActorRdfParseHtmlMicrodata)({
  'name': 'urn:comunica:default:rdf-parse-html/actors#microdata',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_parse_html__4_0_0_components_ActorRdfParseHtml_jsonld_ActorRdfParseHtml_default_bus,
  'busFailMessage': 'RDF HTML parsing failed: none of the configured parsers were able to parse RDF in HTML'
});
const urn_comunica_default_rdf_parse_html_actors_rdfa = new (require('@comunica/actor-rdf-parse-html-rdfa').ActorRdfParseHtmlRdfa)({
  'name': 'urn:comunica:default:rdf-parse-html/actors#rdfa',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_parse_html__4_0_0_components_ActorRdfParseHtml_jsonld_ActorRdfParseHtml_default_bus,
  'busFailMessage': 'RDF HTML parsing failed: none of the configured parsers were able to parse RDF in HTML'
});
const urn_comunica_default_rdf_resolve_hypermedia_links_actors_next = new (require('@comunica/actor-rdf-resolve-hypermedia-links-next').ActorRdfResolveHypermediaLinksNext)({
  'name': 'urn:comunica:default:rdf-resolve-hypermedia-links/actors#next',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_resolve_hypermedia_links__4_0_0_components_ActorRdfResolveHypermediaLinks_jsonld_ActorRdfResolveHypermediaLinks_default_bus,
  'busFailMessage': 'Hypermedia link resolution failed: none of the configured actors were able to resolve links from metadata'
});
const urn_comunica_default_rdf_resolve_hypermedia_links_mediators_main = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:rdf-resolve-hypermedia-links/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_resolve_hypermedia_links__4_0_0_components_ActorRdfResolveHypermediaLinks_jsonld_ActorRdfResolveHypermediaLinks_default_bus
});
const urn_comunica_default_rdf_resolve_hypermedia_links_queue_actors_fifo = new (require('@comunica/actor-rdf-resolve-hypermedia-links-queue-fifo').ActorRdfResolveHypermediaLinksQueueFifo)({
  'name': 'urn:comunica:default:rdf-resolve-hypermedia-links-queue/actors#fifo',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_resolve_hypermedia_links_queue__4_0_0_components_ActorRdfResolveHypermediaLinksQueue_jsonld_ActorRdfResolveHypermediaLinksQueue_default_bus,
  'busFailMessage': 'Link queue creation failed: none of the configured actors were able to create a link queue starting from ${action.firstUrl}'
});
const urn_comunica_default_rdf_resolve_hypermedia_links_queue_mediators_main = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:rdf-resolve-hypermedia-links-queue/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_resolve_hypermedia_links_queue__4_0_0_components_ActorRdfResolveHypermediaLinksQueue_jsonld_ActorRdfResolveHypermediaLinksQueue_default_bus
});
const urn_comunica_default_rdf_serialize_actors_n3 = new (require('@comunica/actor-rdf-serialize-n3').ActorRdfSerializeN3)({
  'mediaTypePriorities': {"application/n-quads":1,"application/n-triples":0.8,"application/trig":0.95,"text/n3":0.35,"text/turtle":0.6},
  'mediaTypeFormats': {"application/n-quads":"http://www.w3.org/ns/formats/N-Quads","application/n-triples":"http://www.w3.org/ns/formats/N-Triples","application/trig":"http://www.w3.org/ns/formats/TriG","text/n3":"http://www.w3.org/ns/formats/N3","text/turtle":"http://www.w3.org/ns/formats/Turtle"},
  'name': 'urn:comunica:default:rdf-serialize/actors#n3',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_serialize__4_0_0_components_ActorRdfSerialize_jsonld_ActorRdfSerialize_default_bus,
  'busFailMessage': 'RDF serialization failed: none of the configured serializers were able to handle media type ${action.handleMediaType}'
});
const urn_comunica_default_rdf_serialize_actors_jsonld = new (require('@comunica/actor-rdf-serialize-jsonld').ActorRdfSerializeJsonLd)({
  'jsonStringifyIndentSpaces': 2,
  'mediaTypePriorities': {"application/ld+json":1},
  'mediaTypeFormats': {"application/ld+json":"http://www.w3.org/ns/formats/JSON-LD"},
  'priorityScale': 0.9,
  'name': 'urn:comunica:default:rdf-serialize/actors#jsonld',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_serialize__4_0_0_components_ActorRdfSerialize_jsonld_ActorRdfSerialize_default_bus,
  'busFailMessage': 'RDF serialization failed: none of the configured serializers were able to handle media type ${action.handleMediaType}'
});
const urn_comunica_default_rdf_serialize_actors_shaclc = new (require('@comunica/actor-rdf-serialize-shaclc').ActorRdfSerializeShaclc)({
  'mediaTypePriorities': {"text/shaclc":1,"text/shaclc-ext":0.5},
  'mediaTypeFormats': {"text/shaclc":"http://www.w3.org/ns/formats/Shaclc","text/shaclc-ext":"http://www.w3.org/ns/formats/ShaclcExtended"},
  'priorityScale': 0.1,
  'name': 'urn:comunica:default:rdf-serialize/actors#shaclc',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_serialize__4_0_0_components_ActorRdfSerialize_jsonld_ActorRdfSerialize_default_bus,
  'busFailMessage': 'RDF serialization failed: none of the configured serializers were able to handle media type ${action.handleMediaType}'
});
const urn_comunica_default_rdf_serialize_mediators_serialize = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:rdf-serialize/mediators#serialize',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_serialize__4_0_0_components_ActorRdfSerialize_jsonld_ActorRdfSerialize_default_bus
});
const urn_comunica_default_rdf_serialize_mediators_mediaType = new (require('@comunica/mediator-combine-union').MediatorCombineUnion)({
  'field': 'mediaTypes',
  'name': 'urn:comunica:default:rdf-serialize/mediators#mediaType',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_serialize__4_0_0_components_ActorRdfSerialize_jsonld_ActorRdfSerialize_default_bus
});
const urn_comunica_default_rdf_serialize_mediators_mediaTypeFormat = new (require('@comunica/mediator-combine-union').MediatorCombineUnion)({
  'field': 'mediaTypeFormats',
  'name': 'urn:comunica:default:rdf-serialize/mediators#mediaTypeFormat',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_serialize__4_0_0_components_ActorRdfSerialize_jsonld_ActorRdfSerialize_default_bus
});
const urn_comunica_default_rdf_update_hypermedia_mediators_main = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:rdf-update-hypermedia/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_update_hypermedia__4_0_0_components_ActorRdfUpdateHypermedia_jsonld_ActorRdfUpdateHypermedia_default_bus
});
const urn_comunica_default_rdf_update_quads_actors_rdfjs_store = new (require('@comunica/actor-rdf-update-quads-rdfjs-store').ActorRdfUpdateQuadsRdfJsStore)({
  'name': 'urn:comunica:default:rdf-update-quads/actors#rdfjs-store',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_update_quads__4_0_0_components_ActorRdfUpdateQuads_jsonld_ActorRdfUpdateQuads_default_bus,
  'busFailMessage': 'RDF updating failed: none of the configured actors were able to handle an update'
});
const urn_comunica_default_rdf_update_quads_mediators_main = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:rdf-update-quads/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_update_quads__4_0_0_components_ActorRdfUpdateQuads_jsonld_ActorRdfUpdateQuads_default_bus
});
const urn_comunica_default_bindings_aggregator_factory_mediators_main = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:bindings-aggregator-factory/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_bindings_aggregator_factory__4_0_0_components_ActorBindingsAggregatorFactory_jsonld_ActorBindingsAggregatorFactory_default_bus
});
const urn_comunica_default_expression_evaluator_factory_mediators_main = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:expression-evaluator-factory/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_expression_evaluator_factory__4_0_0_components_ActorExpressionEvaluatorFactory_jsonld_ActorExpressionEvaluatorFactory_default_bus
});
const urn_comunica_default_function_factory_actors_expression_function_bound = new (require('@comunica/actor-function-factory-expression-bound').ActorFunctionFactoryExpressionBound)({
  'name': 'urn:comunica:default:function-factory/actors#expression-function-bound',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_expression_function_bnode = new (require('@comunica/actor-function-factory-expression-bnode').ActorFunctionFactoryExpressionBnode)({
  'name': 'urn:comunica:default:function-factory/actors#expression-function-bnode',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_expression_function_concat = new (require('@comunica/actor-function-factory-expression-concat').ActorFunctionFactoryExpressionConcat)({
  'name': 'urn:comunica:default:function-factory/actors#expression-function-concat',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_expression_function_coalesce = new (require('@comunica/actor-function-factory-expression-coalesce').ActorFunctionFactoryExpressionCoalesce)({
  'name': 'urn:comunica:default:function-factory/actors#expression-function-coalesce',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_expression_function_extensions = new (require('@comunica/actor-function-factory-expression-extensions').ActorFunctionFactoryExpressionExtensions)({
  'name': 'urn:comunica:default:function-factory/actors#expression-function-extensions',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_expression_function_if = new (require('@comunica/actor-function-factory-expression-if').ActorFunctionFactoryExpressionIf)({
  'name': 'urn:comunica:default:function-factory/actors#expression-function-if',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_expression_function_logical_and = new (require('@comunica/actor-function-factory-expression-logical-and').ActorFunctionFactoryExpressionLogicalAnd)({
  'name': 'urn:comunica:default:function-factory/actors#expression-function-logical-and',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_expression_function_logical_or = new (require('@comunica/actor-function-factory-expression-logical-or').ActorFunctionFactoryExpressionLogicalOr)({
  'name': 'urn:comunica:default:function-factory/actors#expression-function-logical-or',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_expression_function_same_term = new (require('@comunica/actor-function-factory-expression-same-term').ActorFunctionFactoryExpressionSameTerm)({
  'name': 'urn:comunica:default:function-factory/actors#expression-function-same-term',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_abs = new (require('@comunica/actor-function-factory-term-abs').ActorFunctionFactoryTermAbs)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-abs',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_addition = new (require('@comunica/actor-function-factory-term-addition').ActorFunctionFactoryTermAddition)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-addition',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_ceil = new (require('@comunica/actor-function-factory-term-ceil').ActorFunctionFactoryTermCeil)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-ceil',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_contains = new (require('@comunica/actor-function-factory-term-contains').ActorFunctionFactoryTermContains)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-contains',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_datatype = new (require('@comunica/actor-function-factory-term-datatype').ActorFunctionFactoryTermDatatype)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-datatype',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_day = new (require('@comunica/actor-function-factory-term-day').ActorFunctionFactoryTermDay)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-day',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_division = new (require('@comunica/actor-function-factory-term-division').ActorFunctionFactoryTermDivision)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-division',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_encode_for_uri = new (require('@comunica/actor-function-factory-term-encode-for-uri').ActorFunctionFactoryTermEncodeForUri)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-encode-for-uri',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_equality = new (require('@comunica/actor-function-factory-term-equality').ActorFunctionFactoryTermEquality)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-equality',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_floor = new (require('@comunica/actor-function-factory-term-floor').ActorFunctionFactoryTermFloor)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-floor',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_hours = new (require('@comunica/actor-function-factory-term-hours').ActorFunctionFactoryTermHours)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-hours',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_iri = new (require('@comunica/actor-function-factory-term-iri').ActorFunctionFactoryTermIri)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-iri',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_is_blank = new (require('@comunica/actor-function-factory-term-is-blank').ActorFunctionFactoryTermIsBlank)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-is-blank',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_is_iri = new (require('@comunica/actor-function-factory-term-is-iri').ActorFunctionFactoryTermIsIri)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-is-iri',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_is_literal = new (require('@comunica/actor-function-factory-term-is-literal').ActorFunctionFactoryTermIsLiteral)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-is-literal',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_is_numeric = new (require('@comunica/actor-function-factory-term-is-numeric').ActorFunctionFactoryTermIsNumeric)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-is-numeric',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_is_triple = new (require('@comunica/actor-function-factory-term-is-triple').ActorFunctionFactoryTermIsTriple)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-is-triple',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_lang = new (require('@comunica/actor-function-factory-term-lang').ActorFunctionFactoryTermLang)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-lang',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_langmatches = new (require('@comunica/actor-function-factory-term-langmatches').ActorFunctionFactoryTermLangmatches)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-langmatches',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_lcase = new (require('@comunica/actor-function-factory-term-lcase').ActorFunctionFactoryTermLcase)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-lcase',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_md5 = new (require('@comunica/actor-function-factory-term-md5').ActorFunctionFactoryTermMd5)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-md5',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_minutes = new (require('@comunica/actor-function-factory-term-minutes').ActorFunctionFactoryTermMinutes)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-minutes',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_month = new (require('@comunica/actor-function-factory-term-month').ActorFunctionFactoryTermMonth)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-month',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_multiplication = new (require('@comunica/actor-function-factory-term-multiplication').ActorFunctionFactoryTermMultiplication)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-multiplication',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_not = new (require('@comunica/actor-function-factory-term-not').ActorFunctionFactoryTermNot)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-not',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_predicate = new (require('@comunica/actor-function-factory-term-predicate').ActorFunctionFactoryTermPredicate)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-predicate',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_now = new (require('@comunica/actor-function-factory-term-now').ActorFunctionFactoryTermNow)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-now',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_object = new (require('@comunica/actor-function-factory-term-object').ActorFunctionFactoryTermObject)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-object',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_rand = new (require('@comunica/actor-function-factory-term-rand').ActorFunctionFactoryTermRand)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-rand',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_regex = new (require('@comunica/actor-function-factory-term-regex').ActorFunctionFactoryTermRegex)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-regex',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_replace = new (require('@comunica/actor-function-factory-term-replace').ActorFunctionFactoryTermReplace)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-replace',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_round = new (require('@comunica/actor-function-factory-term-round').ActorFunctionFactoryTermRound)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-round',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_seconds = new (require('@comunica/actor-function-factory-term-seconds').ActorFunctionFactoryTermSeconds)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-seconds',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_sha256 = new (require('@comunica/actor-function-factory-term-sha256').ActorFunctionFactoryTermSha256)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-sha256',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_sha1 = new (require('@comunica/actor-function-factory-term-sha1').ActorFunctionFactoryTermSha1)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-sha1',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_sha512 = new (require('@comunica/actor-function-factory-term-sha512').ActorFunctionFactoryTermSha512)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-sha512',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_sha384 = new (require('@comunica/actor-function-factory-term-sha384').ActorFunctionFactoryTermSha384)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-sha384',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_str_after = new (require('@comunica/actor-function-factory-term-str-after').ActorFunctionFactoryTermStrAfter)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-str-after',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_str_before = new (require('@comunica/actor-function-factory-term-str-before').ActorFunctionFactoryTermStrBefore)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-str-before',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_str_dt = new (require('@comunica/actor-function-factory-term-str-dt').ActorFunctionFactoryTermStrDt)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-str-dt',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_str_ends = new (require('@comunica/actor-function-factory-term-str-ends').ActorFunctionFactoryTermStrEnds)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-str-ends',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_str_lang = new (require('@comunica/actor-function-factory-term-str-lang').ActorFunctionFactoryTermStrLang)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-str-lang',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_str_len = new (require('@comunica/actor-function-factory-term-str-len').ActorFunctionFactoryTermStrLen)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-str-len',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_str_starts = new (require('@comunica/actor-function-factory-term-str-starts').ActorFunctionFactoryTermStrStarts)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-str-starts',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_str_uuid = new (require('@comunica/actor-function-factory-term-str-uuid').ActorFunctionFactoryTermStrUuid)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-str-uuid',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_str = new (require('@comunica/actor-function-factory-term-str').ActorFunctionFactoryTermStr)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-str',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_sub_str = new (require('@comunica/actor-function-factory-term-sub-str').ActorFunctionFactoryTermSubStr)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-sub-str',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_subject = new (require('@comunica/actor-function-factory-term-subject').ActorFunctionFactoryTermSubject)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-subject',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_subtraction = new (require('@comunica/actor-function-factory-term-subtraction').ActorFunctionFactoryTermSubtraction)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-subtraction',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_timezone = new (require('@comunica/actor-function-factory-term-timezone').ActorFunctionFactoryTermTimezone)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-timezone',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_triple = new (require('@comunica/actor-function-factory-term-triple').ActorFunctionFactoryTermTriple)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-triple',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_tz = new (require('@comunica/actor-function-factory-term-tz').ActorFunctionFactoryTermTz)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-tz',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_unary_minus = new (require('@comunica/actor-function-factory-term-unary-minus').ActorFunctionFactoryTermUnaryMinus)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-unary-minus',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_ucase = new (require('@comunica/actor-function-factory-term-ucase').ActorFunctionFactoryTermUcase)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-ucase',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_unary_plus = new (require('@comunica/actor-function-factory-term-unary-plus').ActorFunctionFactoryTermUnaryPlus)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-unary-plus',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_uuid = new (require('@comunica/actor-function-factory-term-uuid').ActorFunctionFactoryTermUuid)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-uuid',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_xsd_to_boolean = new (require('@comunica/actor-function-factory-term-xsd-to-boolean').ActorFunctionFactoryTermXsdToBoolean)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-xsd-to-boolean',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_xsd_to_date = new (require('@comunica/actor-function-factory-term-xsd-to-date').ActorFunctionFactoryTermXsdToDate)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-xsd-to-date',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_xsd_to_datetime = new (require('@comunica/actor-function-factory-term-xsd-to-datetime').ActorFunctionFactoryTermXsdToDatetime)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-xsd-to-datetime',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_xsd_to_day_time_duration = new (require('@comunica/actor-function-factory-term-xsd-to-day-time-duration').ActorFunctionFactoryTermXsdToDayTimeDuration)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-xsd-to-day-time-duration',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_xsd_to_decimal = new (require('@comunica/actor-function-factory-term-xsd-to-decimal').ActorFunctionFactoryTermXsdToDecimal)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-xsd-to-decimal',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_xsd_to_double = new (require('@comunica/actor-function-factory-term-xsd-to-double').ActorFunctionFactoryTermXsdToDouble)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-xsd-to-double',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_xsd_to_duration = new (require('@comunica/actor-function-factory-term-xsd-to-duration').ActorFunctionFactoryTermXsdToDuration)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-xsd-to-duration',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_xsd_to_float = new (require('@comunica/actor-function-factory-term-xsd-to-float').ActorFunctionFactoryTermXsdToFloat)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-xsd-to-float',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_xsd_to_integer = new (require('@comunica/actor-function-factory-term-xsd-to-integer').ActorFunctionFactoryTermXsdToInteger)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-xsd-to-integer',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_xsd_to_string = new (require('@comunica/actor-function-factory-term-xsd-to-string').ActorFunctionFactoryTermXsdToString)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-xsd-to-string',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_xsd_to_time = new (require('@comunica/actor-function-factory-term-xsd-to-time').ActorFunctionFactoryTermXsdToTime)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-xsd-to-time',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_xsd_to_year_month_duration = new (require('@comunica/actor-function-factory-term-xsd-to-year-month-duration').ActorFunctionFactoryTermXsdToYearMonthDuration)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-xsd-to-year-month-duration',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_year = new (require('@comunica/actor-function-factory-term-year').ActorFunctionFactoryTermYear)({
  'name': 'urn:comunica:default:function-factory/actors#term-function-year',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_mediators_main = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:function-factory/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus
});
const urn_comunica_default_http_actors_fetch = new (require('@comunica/actor-http-fetch').ActorHttpFetch)({
  'agentOptions': {"keepAlive":true,"maxSockets":5},
  'name': 'urn:comunica:default:http/actors#fetch',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_http__4_0_0_components_ActorHttp_jsonld_ActorHttp_default_bus,
  'busFailMessage': 'HTTP request failed: none of the configured actors were able to handle ${action.input}'
});
const urn_comunica_default_http_mediators_no_fallback = new (require('@comunica/mediator-number').MediatorNumber)({
  'field': 'time',
  'type': 'min',
  'ignoreFailures': true,
  'name': 'urn:comunica:default:http/mediators#no-fallback',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_http__4_0_0_components_ActorHttp_jsonld_ActorHttp_default_bus
});
const urn_comunica_default_http_mediators_main = new (require('@comunica/mediator-number').MediatorNumber)({
  'field': 'time',
  'type': 'min',
  'ignoreFailures': true,
  'name': 'urn:comunica:default:http/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_http__4_0_0_components_ActorHttp_jsonld_ActorHttp_fallback_bus
});
const urn_comunica_default_query_operation_actors_source = new (require('@comunica/actor-query-operation-source').ActorQueryOperationSource)({
  'name': 'urn:comunica:default:query-operation/actors#source',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_mediators_main = new (require('@comunica/mediator-number').MediatorNumber)({
  'field': 'httpRequests',
  'type': 'min',
  'ignoreFailures': true,
  'name': 'urn:comunica:default:query-operation/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus
});
const urn_comunica_default_query_process_mediators_main = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:query-process/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_process__4_0_0_components_ActorQueryProcess_jsonld_ActorQueryProcess_default_bus
});
const urn_comunica_default_query_source_identify_mediators_main = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:query-source-identify/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_source_identify__4_0_0_components_ActorQuerySourceIdentify_jsonld_ActorQuerySourceIdentify_default_bus
});
const urn_comunica_default_rdf_join_mediators_main = new (require('@comunica/mediator-join-coefficients-fixed').MediatorJoinCoefficientsFixed)({
  'cpuWeight': 10,
  'memoryWeight': 1,
  'timeWeight': 2,
  'ioWeight': 10,
  'name': 'urn:comunica:default:rdf-join/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus
});
const urn_comunica_default_term_comparator_factory_mediators_main = new (require('@comunica/mediator-race').MediatorRace)({
  'name': 'urn:comunica:default:term-comparator-factory/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_term_comparator_factory__4_0_0_components_ActorTermComparatorFactory_jsonld_ActorTermComparatorFactory_default_bus
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_actor_context_preprocess_query_source_identify__4_0_0_components_ActorContextPreprocessQuerySourceIdentify_jsonld_IActorContextPreprocessQuerySourceIdentifyArgs_default_invalidator = new (require('@comunica/bus-http-invalidate').ActorHttpInvalidateListenable)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/actor-context-preprocess-query-source-identify/^4.0.0/components/ActorContextPreprocessQuerySourceIdentify.jsonld#IActorContextPreprocessQuerySourceIdentifyArgs_default_invalidator',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_http_invalidate__4_0_0_components_ActorHttpInvalidate_jsonld_ActorHttpInvalidate_default_bus,
  'busFailMessage': 'HTTP invalidation failed: none of the configured actors were able to invalidate ${action.url}'
});
const urn_comunica_default_http_invalidate_mediators_main = new (require('@comunica/mediator-all').MediatorAll)({
  'name': 'urn:comunica:default:http-invalidate/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_http_invalidate__4_0_0_components_ActorHttpInvalidate_jsonld_ActorHttpInvalidate_default_bus
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_actor_rdf_update_quads_hypermedia__4_0_0_components_ActorRdfUpdateQuadsHypermedia_jsonld_IActorRdfUpdateQuadsHypermediaArgs_default_invalidator = new (require('@comunica/bus-http-invalidate').ActorHttpInvalidateListenable)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/actor-rdf-update-quads-hypermedia/^4.0.0/components/ActorRdfUpdateQuadsHypermedia.jsonld#IActorRdfUpdateQuadsHypermediaArgs_default_invalidator',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_http_invalidate__4_0_0_components_ActorHttpInvalidate_jsonld_ActorHttpInvalidate_default_bus,
  'busFailMessage': 'HTTP invalidation failed: none of the configured actors were able to invalidate ${action.url}'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_actor_http_retry__4_0_0_components_ActorHttpRetry_jsonld_IActorHttpQueueArgs_default_invalidator = new (require('@comunica/bus-http-invalidate').ActorHttpInvalidateListenable)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/actor-http-retry/^4.0.0/components/ActorHttpRetry.jsonld#IActorHttpQueueArgs_default_invalidator',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_http_invalidate__4_0_0_components_ActorHttpInvalidate_jsonld_ActorHttpInvalidate_default_bus,
  'busFailMessage': 'HTTP invalidation failed: none of the configured actors were able to invalidate ${action.url}'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_actor_query_result_serialize_sparql_json__4_0_0_components_ActionObserverHttp_jsonld_IActionObserverHttpArgs_default_invalidator = new (require('@comunica/bus-http-invalidate').ActorHttpInvalidateListenable)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/actor-query-result-serialize-sparql-json/^4.0.0/components/ActionObserverHttp.jsonld#IActionObserverHttpArgs_default_invalidator',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_http_invalidate__4_0_0_components_ActorHttpInvalidate_jsonld_ActorHttpInvalidate_default_bus,
  'busFailMessage': 'HTTP invalidation failed: none of the configured actors were able to invalidate ${action.url}'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_actor_query_result_serialize_stats__4_0_0_components_ActionObserverHttp_jsonld_IActionObserverHttpArgs_default_invalidator = new (require('@comunica/bus-http-invalidate').ActorHttpInvalidateListenable)({
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/actor-query-result-serialize-stats/^4.0.0/components/ActionObserverHttp.jsonld#IActionObserverHttpArgs_default_invalidator',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_http_invalidate__4_0_0_components_ActorHttpInvalidate_jsonld_ActorHttpInvalidate_default_bus,
  'busFailMessage': 'HTTP invalidation failed: none of the configured actors were able to invalidate ${action.url}'
});
const urn_comunica_default_merge_bindings_context_mediators_main = new (require('@comunica/mediator-combine-union').MediatorCombineUnion)({
  'field': 'mergeHandlers',
  'name': 'urn:comunica:default:merge-bindings-context/mediators#main',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_merge_bindings_context__4_0_0_components_ActorMergeBindingsContext_jsonld_ActorMergeBindingsContext_default_bus
});
const urn_comunica_default_rdf_join_actors_inner_single = new (require('@comunica/actor-rdf-join-inner-single').ActorRdfJoinSingle)({
  'mediatorJoinSelectivity': urn_comunica_default_rdf_join_selectivity_mediators_main,
  'name': 'urn:comunica:default:rdf-join/actors#inner-single',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus,
  'busFailMessage': 'RDF joining failed: none of the configured actors were able to handle the join type ${action.type}'
});
const urn_comunica_default_rdf_join_actors_inner_multi_empty = new (require('@comunica/actor-rdf-join-inner-multi-empty').ActorRdfJoinMultiEmpty)({
  'mediatorJoinSelectivity': urn_comunica_default_rdf_join_selectivity_mediators_main,
  'name': 'urn:comunica:default:rdf-join/actors#inner-multi-empty',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus,
  'busFailMessage': 'RDF joining failed: none of the configured actors were able to handle the join type ${action.type}'
});
const urn_comunica_default_rdf_join_actors_inner_hash_def = new (require('@comunica/actor-rdf-join-inner-hash').ActorRdfJoinHash)({
  'mediatorHashBindings': urn_comunica_default_hash_bindings_mediators_main,
  'canHandleUndefs': false,
  'mediatorJoinSelectivity': urn_comunica_default_rdf_join_selectivity_mediators_main,
  'name': 'urn:comunica:default:rdf-join/actors#inner-hash-def',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus,
  'busFailMessage': 'RDF joining failed: none of the configured actors were able to handle the join type ${action.type}'
});
const urn_comunica_default_rdf_join_actors_inner_hash_undef = new (require('@comunica/actor-rdf-join-inner-hash').ActorRdfJoinHash)({
  'mediatorHashBindings': urn_comunica_default_hash_bindings_mediators_main,
  'canHandleUndefs': true,
  'mediatorJoinSelectivity': urn_comunica_default_rdf_join_selectivity_mediators_main,
  'name': 'urn:comunica:default:rdf-join/actors#inner-hash-undef',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus,
  'busFailMessage': 'RDF joining failed: none of the configured actors were able to handle the join type ${action.type}'
});
const urn_comunica_default_rdf_join_actors_inner_symmetric_hash = new (require('@comunica/actor-rdf-join-inner-symmetrichash').ActorRdfJoinSymmetricHash)({
  'mediatorHashBindings': urn_comunica_default_hash_bindings_mediators_main,
  'mediatorJoinSelectivity': urn_comunica_default_rdf_join_selectivity_mediators_main,
  'name': 'urn:comunica:default:rdf-join/actors#inner-symmetric-hash',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus,
  'busFailMessage': 'RDF joining failed: none of the configured actors were able to handle the join type ${action.type}'
});
const urn_comunica_default_rdf_join_actors_inner_nested_loop = new (require('@comunica/actor-rdf-join-inner-nestedloop').ActorRdfJoinNestedLoop)({
  'mediatorJoinSelectivity': urn_comunica_default_rdf_join_selectivity_mediators_main,
  'name': 'urn:comunica:default:rdf-join/actors#inner-nested-loop',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus,
  'busFailMessage': 'RDF joining failed: none of the configured actors were able to handle the join type ${action.type}'
});
const urn_comunica_default_rdf_join_actors_minus_hash_def = new (require('@comunica/actor-rdf-join-minus-hash').ActorRdfJoinMinusHash)({
  'canHandleUndefs': false,
  'mediatorJoinSelectivity': urn_comunica_default_rdf_join_selectivity_mediators_main,
  'name': 'urn:comunica:default:rdf-join/actors#minus-hash-def',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus,
  'busFailMessage': 'RDF joining failed: none of the configured actors were able to handle the join type ${action.type}'
});
const urn_comunica_default_rdf_join_actors_minus_hash_undef = new (require('@comunica/actor-rdf-join-minus-hash').ActorRdfJoinMinusHash)({
  'canHandleUndefs': true,
  'mediatorJoinSelectivity': urn_comunica_default_rdf_join_selectivity_mediators_main,
  'name': 'urn:comunica:default:rdf-join/actors#minus-hash-undef',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus,
  'busFailMessage': 'RDF joining failed: none of the configured actors were able to handle the join type ${action.type}'
});
const urn_comunica_default_rdf_join_actors_optional_hash_def_nonblocking = new (require('@comunica/actor-rdf-join-optional-hash').ActorRdfJoinOptionalHash)({
  'canHandleUndefs': false,
  'blocking': false,
  'mediatorJoinSelectivity': urn_comunica_default_rdf_join_selectivity_mediators_main,
  'name': 'urn:comunica:default:rdf-join/actors#optional-hash-def-nonblocking',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus,
  'busFailMessage': 'RDF joining failed: none of the configured actors were able to handle the join type ${action.type}'
});
const urn_comunica_default_rdf_join_actors_optional_hash_def_blocking = new (require('@comunica/actor-rdf-join-optional-hash').ActorRdfJoinOptionalHash)({
  'canHandleUndefs': false,
  'blocking': true,
  'mediatorJoinSelectivity': urn_comunica_default_rdf_join_selectivity_mediators_main,
  'name': 'urn:comunica:default:rdf-join/actors#optional-hash-def-blocking',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus,
  'busFailMessage': 'RDF joining failed: none of the configured actors were able to handle the join type ${action.type}'
});
const urn_comunica_default_rdf_join_actors_optional_hash_undef_nonblocking = new (require('@comunica/actor-rdf-join-optional-hash').ActorRdfJoinOptionalHash)({
  'canHandleUndefs': true,
  'blocking': false,
  'mediatorJoinSelectivity': urn_comunica_default_rdf_join_selectivity_mediators_main,
  'name': 'urn:comunica:default:rdf-join/actors#optional-hash-undef-nonblocking',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus,
  'busFailMessage': 'RDF joining failed: none of the configured actors were able to handle the join type ${action.type}'
});
const urn_comunica_default_rdf_join_actors_optional_hash_undef_blocking = new (require('@comunica/actor-rdf-join-optional-hash').ActorRdfJoinOptionalHash)({
  'canHandleUndefs': true,
  'blocking': true,
  'mediatorJoinSelectivity': urn_comunica_default_rdf_join_selectivity_mediators_main,
  'name': 'urn:comunica:default:rdf-join/actors#optional-hash-undef-blocking',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus,
  'busFailMessage': 'RDF joining failed: none of the configured actors were able to handle the join type ${action.type}'
});
const urn_comunica_default_rdf_join_actors_optional_nested_loop = new (require('@comunica/actor-rdf-join-optional-nestedloop').ActorRdfJoinOptionalNestedLoop)({
  'mediatorJoinSelectivity': urn_comunica_default_rdf_join_selectivity_mediators_main,
  'name': 'urn:comunica:default:rdf-join/actors#optional-nested-loop',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus,
  'busFailMessage': 'RDF joining failed: none of the configured actors were able to handle the join type ${action.type}'
});
const urn_comunica_default_dereference_rdf_actors_parse = new (require('@comunica/actor-dereference-rdf-parse').ActorDereferenceRdfParse)({
  'mediatorDereference': urn_comunica_default_dereference_mediators_main,
  'mediatorParse': urn_comunica_default_rdf_parse_mediators_parse,
  'mediatorParseMediatypes': urn_comunica_default_rdf_parse_mediators_mediaType,
  'mediaMappings': {"htm":"text/html","html":"text/html","json":"application/json","jsonld":"application/ld+json","n3":"text/n3","nq":"application/n-quads","nquads":"application/n-quads","nt":"application/n-triples","ntriples":"application/n-triples","owl":"application/rdf+xml","rdf":"application/rdf+xml","rdfxml":"application/rdf+xml","shaclc":"text/shaclc","shaclce":"text/shaclc-ext","shc":"text/shaclc","shce":"text/shaclc-ext","svg":"image/svg+xml","svgz":"image/svg+xml","trig":"application/trig","ttl":"text/turtle","turtle":"text/turtle","xht":"application/xhtml+xml","xhtml":"application/xhtml+xml","xml":"application/xml"},
  'name': 'urn:comunica:default:dereference-rdf/actors#parse',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_dereference_rdf__4_0_0_components_ActorDereferenceRdf_jsonld_ActorDereferenceRdf_default_bus,
  'busFailMessage': 'RDF dereferencing failed: none of the configured parsers were able to handle the media type ${action.handle.mediaType} for ${action.handle.url}'
});
const urn_comunica_default_rdf_parse_html_actors_script = new (require('@comunica/actor-rdf-parse-html-script').ActorRdfParseHtmlScript)({
  'mediatorRdfParseMediatypes': urn_comunica_default_rdf_parse_mediators_mediaType,
  'mediatorRdfParseHandle': urn_comunica_default_rdf_parse_mediators_parse,
  'name': 'urn:comunica:default:rdf-parse-html/actors#script',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_parse_html__4_0_0_components_ActorRdfParseHtml_jsonld_ActorRdfParseHtml_default_bus,
  'busFailMessage': 'RDF HTML parsing failed: none of the configured parsers were able to parse RDF in HTML'
});
const urn_comunica_default_query_result_serialize_actors_rdf = new (require('@comunica/actor-query-result-serialize-rdf').ActorQueryResultSerializeRdf)({
  'mediatorRdfSerialize': urn_comunica_default_rdf_serialize_mediators_serialize,
  'mediatorMediaTypeCombiner': urn_comunica_default_rdf_serialize_mediators_mediaType,
  'mediatorMediaTypeFormatCombiner': urn_comunica_default_rdf_serialize_mediators_mediaTypeFormat,
  'name': 'urn:comunica:default:query-result-serialize/actors#rdf',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_result_serialize__4_0_0_components_ActorQueryResultSerialize_jsonld_ActorQueryResultSerialize_default_bus,
  'busFailMessage': 'Query result serialization failed: none of the configured actors were able to serialize for type ${action.handle.type}'
});
const urn_comunica_default_bindings_aggregator_factory_actors_count = new (require('@comunica/actor-bindings-aggregator-factory-count').ActorBindingsAggregatorFactoryCount)({
  'mediatorExpressionEvaluatorFactory': urn_comunica_default_expression_evaluator_factory_mediators_main,
  'name': 'urn:comunica:default:bindings-aggregator-factory/actors#count',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_bindings_aggregator_factory__4_0_0_components_ActorBindingsAggregatorFactory_jsonld_ActorBindingsAggregatorFactory_default_bus,
  'busFailMessage': 'Creation of Aggregator failed: none of the configured actors were able to handle ${action.expr.aggregator}'
});
const urn_comunica_default_bindings_aggregator_factory_actors_group_concat = new (require('@comunica/actor-bindings-aggregator-factory-group-concat').ActorBindingsAggregatorFactoryGroupConcat)({
  'mediatorExpressionEvaluatorFactory': urn_comunica_default_expression_evaluator_factory_mediators_main,
  'name': 'urn:comunica:default:bindings-aggregator-factory/actors#group-concat',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_bindings_aggregator_factory__4_0_0_components_ActorBindingsAggregatorFactory_jsonld_ActorBindingsAggregatorFactory_default_bus,
  'busFailMessage': 'Creation of Aggregator failed: none of the configured actors were able to handle ${action.expr.aggregator}'
});
const urn_comunica_default_bindings_aggregator_factory_actors_sample = new (require('@comunica/actor-bindings-aggregator-factory-sample').ActorBindingsAggregatorFactorySample)({
  'mediatorExpressionEvaluatorFactory': urn_comunica_default_expression_evaluator_factory_mediators_main,
  'name': 'urn:comunica:default:bindings-aggregator-factory/actors#sample',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_bindings_aggregator_factory__4_0_0_components_ActorBindingsAggregatorFactory_jsonld_ActorBindingsAggregatorFactory_default_bus,
  'busFailMessage': 'Creation of Aggregator failed: none of the configured actors were able to handle ${action.expr.aggregator}'
});
const urn_comunica_default_bindings_aggregator_factory_actors_wildcard_count = new (require('@comunica/actor-bindings-aggregator-factory-wildcard-count').ActorBindingsAggregatorFactoryWildcardCount)({
  'mediatorExpressionEvaluatorFactory': urn_comunica_default_expression_evaluator_factory_mediators_main,
  'name': 'urn:comunica:default:bindings-aggregator-factory/actors#wildcard-count',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_bindings_aggregator_factory__4_0_0_components_ActorBindingsAggregatorFactory_jsonld_ActorBindingsAggregatorFactory_default_bus,
  'busFailMessage': 'Creation of Aggregator failed: none of the configured actors were able to handle ${action.expr.aggregator}'
});
const urn_comunica_default_bindings_aggregator_factory_actors_average = new (require('@comunica/actor-bindings-aggregator-factory-average').ActorBindingsAggregatorFactoryAverage)({
  'mediatorFunctionFactory': urn_comunica_default_function_factory_mediators_main,
  'mediatorExpressionEvaluatorFactory': urn_comunica_default_expression_evaluator_factory_mediators_main,
  'name': 'urn:comunica:default:bindings-aggregator-factory/actors#average',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_bindings_aggregator_factory__4_0_0_components_ActorBindingsAggregatorFactory_jsonld_ActorBindingsAggregatorFactory_default_bus,
  'busFailMessage': 'Creation of Aggregator failed: none of the configured actors were able to handle ${action.expr.aggregator}'
});
const urn_comunica_default_bindings_aggregator_factory_actors_sum = new (require('@comunica/actor-bindings-aggregator-factory-sum').ActorBindingsAggregatorFactorySum)({
  'mediatorFunctionFactory': urn_comunica_default_function_factory_mediators_main,
  'mediatorExpressionEvaluatorFactory': urn_comunica_default_expression_evaluator_factory_mediators_main,
  'name': 'urn:comunica:default:bindings-aggregator-factory/actors#sum',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_bindings_aggregator_factory__4_0_0_components_ActorBindingsAggregatorFactory_jsonld_ActorBindingsAggregatorFactory_default_bus,
  'busFailMessage': 'Creation of Aggregator failed: none of the configured actors were able to handle ${action.expr.aggregator}'
});
const urn_comunica_default_function_factory_actors_expression_function_in = new (require('@comunica/actor-function-factory-expression-in').ActorFunctionFactoryExpressionIn)({
  'mediatorFunctionFactory': urn_comunica_default_function_factory_mediators_main,
  'name': 'urn:comunica:default:function-factory/actors#expression-function-in',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_expression_function_not_in = new (require('@comunica/actor-function-factory-expression-not-in').ActorFunctionFactoryExpressionNotIn)({
  'mediatorFunctionFactory': urn_comunica_default_function_factory_mediators_main,
  'name': 'urn:comunica:default:function-factory/actors#expression-function-not-in',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_greater_than = new (require('@comunica/actor-function-factory-term-greater-than').ActorFunctionFactoryTermGreaterThan)({
  'mediatorFunctionFactory': urn_comunica_default_function_factory_mediators_main,
  'name': 'urn:comunica:default:function-factory/actors#term-function-greater-than',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_greater_than_equal = new (require('@comunica/actor-function-factory-term-greater-than-equal').ActorFunctionFactoryTermGreaterThanEqual)({
  'mediatorFunctionFactory': urn_comunica_default_function_factory_mediators_main,
  'name': 'urn:comunica:default:function-factory/actors#term-function-greater-than-equal',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_inequality = new (require('@comunica/actor-function-factory-term-inequality').ActorFunctionFactoryTermInequality)({
  'mediatorFunctionFactory': urn_comunica_default_function_factory_mediators_main,
  'name': 'urn:comunica:default:function-factory/actors#term-function-inequality',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_lesser_than_equal = new (require('@comunica/actor-function-factory-term-lesser-than-equal').ActorFunctionFactoryTermLesserThanEqual)({
  'mediatorFunctionFactory': urn_comunica_default_function_factory_mediators_main,
  'name': 'urn:comunica:default:function-factory/actors#term-function-lesser-than-equal',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_function_factory_actors_term_function_lesser_than = new (require('@comunica/actor-function-factory-term-lesser-than').ActorFunctionFactoryTermLesserThan)({
  'mediatorFunctionFactory': urn_comunica_default_function_factory_mediators_main,
  'name': 'urn:comunica:default:function-factory/actors#term-function-lesser-than',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_function_factory__4_0_0_components_ActorFunctionFactory_jsonld_ActorFunctionFactory_default_bus,
  'busFailMessage': 'Creation of function evaluator failed: no configured actor was able to evaluate function ${action.functionName}'
});
const urn_comunica_default_http_actors_wayback = new (require('@comunica/actor-http-wayback').ActorHttpWayback)({
  'mediatorHttp': urn_comunica_default_http_mediators_no_fallback,
  'name': 'urn:comunica:default:http/actors#wayback',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_http__4_0_0_components_ActorHttp_jsonld_ActorHttp_fallback_bus,
  'busFailMessage': 'HTTP request failed: none of the configured actors were able to handle ${action.input}'
});
const urn_comunica_default_rdf_parse_actors_jsonld = new (require('@comunica/actor-rdf-parse-jsonld').ActorRdfParseJsonLd)({
  'mediatorHttp': urn_comunica_default_http_mediators_main,
  'mediaTypePriorities': {"application/json":0.15,"application/ld+json":1},
  'mediaTypeFormats': {"application/json":"http://www.w3.org/ns/formats/JSON-LD","application/ld+json":"http://www.w3.org/ns/formats/JSON-LD"},
  'priorityScale': 0.9,
  'name': 'urn:comunica:default:rdf-parse/actors#jsonld',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_parse__4_0_0_components_ActorRdfParse_jsonld_ActorRdfParse_default_bus,
  'busFailMessage': 'RDF parsing failed: none of the configured parsers were able to handle the media type ${action.handle.mediaType} for ${action.handle.url}'
});
const urn_comunica_default_rdf_update_hypermedia_actors_patch_sparql_update = new (require('@comunica/actor-rdf-update-hypermedia-patch-sparql-update').ActorRdfUpdateHypermediaPatchSparqlUpdate)({
  'mediatorHttp': urn_comunica_default_http_mediators_main,
  'name': 'urn:comunica:default:rdf-update-hypermedia/actors#patch-sparql-update',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_update_hypermedia__4_0_0_components_ActorRdfUpdateHypermedia_jsonld_ActorRdfUpdateHypermedia_default_bus,
  'busFailMessage': 'RDF hypermedia updating failed: none of the configured actors were able to handle an update for ${action.url}'
});
const urn_comunica_default_rdf_update_hypermedia_actors_put_ldp = new (require('@comunica/actor-rdf-update-hypermedia-put-ldp').ActorRdfUpdateHypermediaPutLdp)({
  'mediatorHttp': urn_comunica_default_http_mediators_main,
  'mediatorRdfSerializeMediatypes': urn_comunica_default_rdf_serialize_mediators_mediaType,
  'mediatorRdfSerialize': urn_comunica_default_rdf_serialize_mediators_serialize,
  'name': 'urn:comunica:default:rdf-update-hypermedia/actors#put-ldp',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_update_hypermedia__4_0_0_components_ActorRdfUpdateHypermedia_jsonld_ActorRdfUpdateHypermedia_default_bus,
  'busFailMessage': 'RDF hypermedia updating failed: none of the configured actors were able to handle an update for ${action.url}'
});
const urn_comunica_default_rdf_update_hypermedia_actors_sparql = new (require('@comunica/actor-rdf-update-hypermedia-sparql').ActorRdfUpdateHypermediaSparql)({
  'mediatorHttp': urn_comunica_default_http_mediators_main,
  'checkUrlSuffixSparql': true,
  'checkUrlSuffixUpdate': true,
  'name': 'urn:comunica:default:rdf-update-hypermedia/actors#sparql',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_update_hypermedia__4_0_0_components_ActorRdfUpdateHypermedia_jsonld_ActorRdfUpdateHypermedia_default_bus,
  'busFailMessage': 'RDF hypermedia updating failed: none of the configured actors were able to handle an update for ${action.url}'
});
const urn_comunica_default_query_operation_actors_ask = new (require('@comunica/actor-query-operation-ask').ActorQueryOperationAsk)({
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#ask',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_bgp = new (require('@comunica/actor-query-operation-bgp-join').ActorQueryOperationBgpJoin)({
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#bgp',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_construct = new (require('@comunica/actor-query-operation-construct').ActorQueryOperationConstruct)({
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#construct',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_distinct = new (require('@comunica/actor-query-operation-distinct-hash').ActorQueryOperationDistinctHash)({
  'mediatorHashBindings': urn_comunica_default_hash_bindings_mediators_main,
  'mediatorHashQuads': urn_comunica_default_hash_quads_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#distinct',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_extend = new (require('@comunica/actor-query-operation-extend').ActorQueryOperationExtend)({
  'mediatorExpressionEvaluatorFactory': urn_comunica_default_expression_evaluator_factory_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#extend',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_filter = new (require('@comunica/actor-query-operation-filter').ActorQueryOperationFilter)({
  'mediatorExpressionEvaluatorFactory': urn_comunica_default_expression_evaluator_factory_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#filter',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_from = new (require('@comunica/actor-query-operation-from-quad').ActorQueryOperationFromQuad)({
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#from',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_project = new (require('@comunica/actor-query-operation-project').ActorQueryOperationProject)({
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#project',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_reduced = new (require('@comunica/actor-query-operation-reduced-hash').ActorQueryOperationReducedHash)({
  'mediatorHashBindings': urn_comunica_default_hash_bindings_mediators_main,
  'cacheSize': 100,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#reduced',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_slice = new (require('@comunica/actor-query-operation-slice').ActorQueryOperationSlice)({
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#slice',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_union = new (require('@comunica/actor-query-operation-union').ActorQueryOperationUnion)({
  'mediatorRdfMetadataAccumulate': urn_comunica_default_rdf_metadata_accumulate_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#union',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_path_alt = new (require('@comunica/actor-query-operation-path-alt').ActorQueryOperationPathAlt)({
  'mediatorRdfMetadataAccumulate': urn_comunica_default_rdf_metadata_accumulate_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#path-alt',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_path_inv = new (require('@comunica/actor-query-operation-path-inv').ActorQueryOperationPathInv)({
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#path-inv',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_path_link = new (require('@comunica/actor-query-operation-path-link').ActorQueryOperationPathLink)({
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#path-link',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_path_nps = new (require('@comunica/actor-query-operation-path-nps').ActorQueryOperationPathNps)({
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#path-nps',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_update_clear = new (require('@comunica/actor-query-operation-update-clear').ActorQueryOperationClear)({
  'mediatorUpdateQuads': urn_comunica_default_rdf_update_quads_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#update-clear',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_update_composite = new (require('@comunica/actor-query-operation-update-compositeupdate').ActorQueryOperationUpdateCompositeUpdate)({
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#update-composite',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_update_create = new (require('@comunica/actor-query-operation-update-create').ActorQueryOperationCreate)({
  'mediatorUpdateQuads': urn_comunica_default_rdf_update_quads_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#update-create',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_update_drop = new (require('@comunica/actor-query-operation-update-drop').ActorQueryOperationDrop)({
  'mediatorUpdateQuads': urn_comunica_default_rdf_update_quads_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#update-drop',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_update_load = new (require('@comunica/actor-query-operation-update-load').ActorQueryOperationLoad)({
  'mediatorUpdateQuads': urn_comunica_default_rdf_update_quads_mediators_main,
  'mediatorQuerySourceIdentify': urn_comunica_default_query_source_identify_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#update-load',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_join = new (require('@comunica/actor-query-operation-join').ActorQueryOperationJoin)({
  'mediatorJoin': urn_comunica_default_rdf_join_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#join',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_leftjoin = new (require('@comunica/actor-query-operation-leftjoin').ActorQueryOperationLeftJoin)({
  'mediatorJoin': urn_comunica_default_rdf_join_mediators_main,
  'mediatorExpressionEvaluatorFactory': urn_comunica_default_expression_evaluator_factory_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#leftjoin',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_minus = new (require('@comunica/actor-query-operation-minus').ActorQueryOperationMinus)({
  'mediatorJoin': urn_comunica_default_rdf_join_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#minus',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_path_seq = new (require('@comunica/actor-query-operation-path-seq').ActorQueryOperationPathSeq)({
  'mediatorJoin': urn_comunica_default_rdf_join_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#path-seq',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_rdf_join_actors_inner_multi_smallest = new (require('@comunica/actor-rdf-join-inner-multi-smallest').ActorRdfJoinMultiSmallest)({
  'mediatorJoinEntriesSort': urn_comunica_default_rdf_join_entries_sort_mediators_main,
  'mediatorJoin': urn_comunica_default_rdf_join_mediators_main,
  'mediatorJoinSelectivity': urn_comunica_default_rdf_join_selectivity_mediators_main,
  'name': 'urn:comunica:default:rdf-join/actors#inner-multi-smallest',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus,
  'busFailMessage': 'RDF joining failed: none of the configured actors were able to handle the join type ${action.type}'
});
const urn_comunica_default_bindings_aggregator_factory_actors_min = new (require('@comunica/actor-bindings-aggregator-factory-min').ActorBindingsAggregatorFactoryMin)({
  'mediatorTermComparatorFactory': urn_comunica_default_term_comparator_factory_mediators_main,
  'mediatorExpressionEvaluatorFactory': urn_comunica_default_expression_evaluator_factory_mediators_main,
  'name': 'urn:comunica:default:bindings-aggregator-factory/actors#min',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_bindings_aggregator_factory__4_0_0_components_ActorBindingsAggregatorFactory_jsonld_ActorBindingsAggregatorFactory_default_bus,
  'busFailMessage': 'Creation of Aggregator failed: none of the configured actors were able to handle ${action.expr.aggregator}'
});
const urn_comunica_default_bindings_aggregator_factory_actors_max = new (require('@comunica/actor-bindings-aggregator-factory-max').ActorBindingsAggregatorFactoryMax)({
  'mediatorTermComparatorFactory': urn_comunica_default_term_comparator_factory_mediators_main,
  'mediatorExpressionEvaluatorFactory': urn_comunica_default_expression_evaluator_factory_mediators_main,
  'name': 'urn:comunica:default:bindings-aggregator-factory/actors#max',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_bindings_aggregator_factory__4_0_0_components_ActorBindingsAggregatorFactory_jsonld_ActorBindingsAggregatorFactory_default_bus,
  'busFailMessage': 'Creation of Aggregator failed: none of the configured actors were able to handle ${action.expr.aggregator}'
});
const urn_comunica_default_query_operation_actors_orderby = new (require('@comunica/actor-query-operation-orderby').ActorQueryOperationOrderBy)({
  'mediatorExpressionEvaluatorFactory': urn_comunica_default_expression_evaluator_factory_mediators_main,
  'mediatorTermComparatorFactory': urn_comunica_default_term_comparator_factory_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#orderby',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_optimize_query_operation_actors_filter_pushdown = new (require('@comunica/actor-optimize-query-operation-filter-pushdown').ActorOptimizeQueryOperationFilterPushdown)({
  'aggressivePushdown': false,
  'maxIterations': 10,
  'splitConjunctive': true,
  'mergeConjunctive': true,
  'pushIntoLeftJoins': true,
  'pushEqualityIntoPatterns': true,
  'name': 'urn:comunica:default:optimize-query-operation/actors#filter-pushdown',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_optimize_query_operation__4_0_0_components_ActorOptimizeQueryOperation_jsonld_ActorOptimizeQueryOperation_default_bus,
  'busFailMessage': 'Query optimization failed: none of the configured actors were able to optimize',
  'beforeActors': [
  urn_comunica_default_optimize_query_operation_actors_group_sources
]
});
const urn_comunica_default_dereference_actors_http = new (require('@comunica/actor-dereference-http').ActorDereferenceHttp)({
  'mediatorHttp': urn_comunica_default_http_mediators_main,
  'maxAcceptHeaderLength': 1024,
  'maxAcceptHeaderLengthBrowser': 128,
  'name': 'urn:comunica:default:dereference/actors#http',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_dereference__4_0_0_components_ActorDereference_jsonld_ActorDereference_default_bus,
  'busFailMessage': 'Dereferencing failed: none of the configured actors were able to handle ${action.url}',
  'beforeActors': [
  urn_comunica_default_dereference_actors_fallback
]
});
const urn_comunica_default_http_actors_proxy = new (require('@comunica/actor-http-proxy').ActorHttpProxy)({
  'mediatorHttp': urn_comunica_default_http_mediators_main,
  'name': 'urn:comunica:default:http/actors#proxy',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_http__4_0_0_components_ActorHttp_jsonld_ActorHttp_default_bus,
  'busFailMessage': 'HTTP request failed: none of the configured actors were able to handle ${action.input}',
  'beforeActors': [
  urn_comunica_default_http_actors_fetch
]
});
const urn_comunica_default_context_preprocess_actors_query_source_identify = new (require('@comunica/actor-context-preprocess-query-source-identify').ActorContextPreprocessQuerySourceIdentify)({
  'cacheSize': 100,
  'httpInvalidator': https___linkedsoftwaredependencies_org_bundles_npm__comunica_actor_context_preprocess_query_source_identify__4_0_0_components_ActorContextPreprocessQuerySourceIdentify_jsonld_IActorContextPreprocessQuerySourceIdentifyArgs_default_invalidator,
  'mediatorQuerySourceIdentify': urn_comunica_default_query_source_identify_mediators_main,
  'mediatorContextPreprocess': urn_comunica_default_context_preprocess_mediators_main,
  'name': 'urn:comunica:default:context-preprocess/actors#query-source-identify',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_context_preprocess__4_0_0_components_ActorContextPreprocess_jsonld_ActorContextPreprocess_default_bus,
  'busFailMessage': 'Context preprocessing failed',
  'beforeActors': [
  urn_comunica_default_context_preprocess_actors_query_source_skolemize
]
});
const urn_comunica_default_init_actors_query = new (require('@comunica/actor-init-query').ActorInitQuery)({
  'mediatorQueryProcess': urn_comunica_default_query_process_mediators_main,
  'mediatorQueryResultSerialize': urn_comunica_default_query_result_serialize_mediators_serialize,
  'mediatorQueryResultSerializeMediaTypeCombiner': urn_comunica_default_query_result_serialize_mediators_mediaType,
  'mediatorQueryResultSerializeMediaTypeFormatCombiner': urn_comunica_default_query_result_serialize_mediators_mediaTypeFormat,
  'mediatorHttpInvalidate': urn_comunica_default_http_invalidate_mediators_main,
  'defaultQueryInputFormat': 'sparql',
  'allowNoSources': false,
  'name': 'urn:comunica:default:init/actors#query',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_init__4_0_0_components_ActorInit_jsonld_ActorInit_default_bus,
  'busFailMessage': 'Initialization failed: none of the configured actors were to initialize'
});
const urn_comunica_default_rdf_update_quads_actors_hypermedia = new (require('@comunica/actor-rdf-update-quads-hypermedia').ActorRdfUpdateQuadsHypermedia)({
  'cacheSize': 100,
  'httpInvalidator': https___linkedsoftwaredependencies_org_bundles_npm__comunica_actor_rdf_update_quads_hypermedia__4_0_0_components_ActorRdfUpdateQuadsHypermedia_jsonld_IActorRdfUpdateQuadsHypermediaArgs_default_invalidator,
  'mediatorDereferenceRdf': urn_comunica_default_dereference_rdf_mediators_main,
  'mediatorMetadata': urn_comunica_default_rdf_metadata_mediators_main,
  'mediatorMetadataExtract': urn_comunica_default_rdf_metadata_extract_mediators_main,
  'mediatorRdfUpdateHypermedia': urn_comunica_default_rdf_update_hypermedia_mediators_main,
  'name': 'urn:comunica:default:rdf-update-quads/actors#hypermedia',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_update_quads__4_0_0_components_ActorRdfUpdateQuads_jsonld_ActorRdfUpdateQuads_default_bus,
  'busFailMessage': 'RDF updating failed: none of the configured actors were able to handle an update'
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_actor_query_result_serialize_sparql_json__4_0_0_components_ActorQueryResultSerializeSparqlJson_jsonld_ActorQueryResultSerializeSparqlJson_default_observer = new (require('@comunica/actor-query-result-serialize-sparql-json').ActionObserverHttp)({
  'httpInvalidator': https___linkedsoftwaredependencies_org_bundles_npm__comunica_actor_query_result_serialize_sparql_json__4_0_0_components_ActionObserverHttp_jsonld_IActionObserverHttpArgs_default_invalidator,
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/actor-query-result-serialize-sparql-json/^4.0.0/components/ActorQueryResultSerializeSparqlJson.jsonld#ActorQueryResultSerializeSparqlJson_default_observer',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_http__4_0_0_components_ActorHttp_jsonld_ActorHttp_default_bus
});
const https___linkedsoftwaredependencies_org_bundles_npm__comunica_actor_query_result_serialize_stats__4_0_0_components_ActorQueryResultSerializeStats_jsonld_ActorQueryResultSerializeStats_default_observer = new (require('@comunica/actor-query-result-serialize-stats').ActionObserverHttp)({
  'httpInvalidator': https___linkedsoftwaredependencies_org_bundles_npm__comunica_actor_query_result_serialize_stats__4_0_0_components_ActionObserverHttp_jsonld_IActionObserverHttpArgs_default_invalidator,
  'name': 'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/actor-query-result-serialize-stats/^4.0.0/components/ActorQueryResultSerializeStats.jsonld#ActorQueryResultSerializeStats_default_observer',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_http__4_0_0_components_ActorHttp_jsonld_ActorHttp_default_bus
});
const urn_comunica_default_query_source_identify_hypermedia_actors_qpf = new (require('@comunica/actor-query-source-identify-hypermedia-qpf').ActorQuerySourceIdentifyHypermediaQpf)({
  'mediatorMetadata': urn_comunica_default_rdf_metadata_mediators_main,
  'mediatorMetadataExtract': urn_comunica_default_rdf_metadata_extract_mediators_main,
  'mediatorDereferenceRdf': urn_comunica_default_dereference_rdf_mediators_main,
  'mediatorMergeBindingsContext': urn_comunica_default_merge_bindings_context_mediators_main,
  'subjectUri': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#subject',
  'predicateUri': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate',
  'objectUri': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#object',
  'graphUri': 'http://www.w3.org/ns/sparql-service-description#graph',
  'name': 'urn:comunica:default:query-source-identify-hypermedia/actors#qpf',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_source_identify_hypermedia__4_0_0_components_ActorQuerySourceIdentifyHypermedia_jsonld_ActorQuerySourceIdentifyHypermedia_default_bus,
  'busFailMessage': 'Query source hypermedia identification failed: none of the configured actors were able to identify ${action.url}'
});
const urn_comunica_default_rdf_resolve_quad_pattern_actors_sparql = new (require('@comunica/actor-query-source-identify-hypermedia-sparql').ActorQuerySourceIdentifyHypermediaSparql)({
  'mediatorHttp': urn_comunica_default_http_mediators_main,
  'mediatorMergeBindingsContext': urn_comunica_default_merge_bindings_context_mediators_main,
  'checkUrlSuffix': true,
  'forceHttpGet': false,
  'cacheSize': 1024,
  'bindMethod': 'values',
  'countTimeout': 3000,
  'name': 'urn:comunica:default:rdf-resolve-quad-pattern/actors#sparql',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_source_identify_hypermedia__4_0_0_components_ActorQuerySourceIdentifyHypermedia_jsonld_ActorQuerySourceIdentifyHypermedia_default_bus,
  'busFailMessage': 'Query source hypermedia identification failed: none of the configured actors were able to identify ${action.url}'
});
const urn_comunica_default_query_source_identify_hypermedia_actors_none = new (require('@comunica/actor-query-source-identify-hypermedia-none').ActorQuerySourceIdentifyHypermediaNone)({
  'mediatorMergeBindingsContext': urn_comunica_default_merge_bindings_context_mediators_main,
  'name': 'urn:comunica:default:query-source-identify-hypermedia/actors#none',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_source_identify_hypermedia__4_0_0_components_ActorQuerySourceIdentifyHypermedia_jsonld_ActorQuerySourceIdentifyHypermedia_default_bus,
  'busFailMessage': 'Query source hypermedia identification failed: none of the configured actors were able to identify ${action.url}'
});
const urn_comunica_default_expression_evaluator_factory_actors_default = new (require('@comunica/actor-expression-evaluator-factory-default').ActorExpressionEvaluatorFactoryDefault)({
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'mediatorFunctionFactory': urn_comunica_default_function_factory_mediators_main,
  'mediatorMergeBindingsContext': urn_comunica_default_merge_bindings_context_mediators_main,
  'name': 'urn:comunica:default:expression-evaluator-factory/actors#default',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_expression_evaluator_factory__4_0_0_components_ActorExpressionEvaluatorFactory_jsonld_ActorExpressionEvaluatorFactory_default_bus,
  'busFailMessage': 'Creation of Expression Evaluator failed'
});
const urn_comunica_default_query_operation_actors_group = new (require('@comunica/actor-query-operation-group').ActorQueryOperationGroup)({
  'mediatorMergeBindingsContext': urn_comunica_default_merge_bindings_context_mediators_main,
  'mediatorBindingsAggregatorFactory': urn_comunica_default_bindings_aggregator_factory_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#group',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_nop = new (require('@comunica/actor-query-operation-nop').ActorQueryOperationNop)({
  'mediatorMergeBindingsContext': urn_comunica_default_merge_bindings_context_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#nop',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_service = new (require('@comunica/actor-query-operation-service').ActorQueryOperationService)({
  'forceSparqlEndpoint': false,
  'mediatorMergeBindingsContext': urn_comunica_default_merge_bindings_context_mediators_main,
  'mediatorQuerySourceIdentify': urn_comunica_default_query_source_identify_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#service',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_values = new (require('@comunica/actor-query-operation-values').ActorQueryOperationValues)({
  'mediatorMergeBindingsContext': urn_comunica_default_merge_bindings_context_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#values',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_path_one_or_more = new (require('@comunica/actor-query-operation-path-one-or-more').ActorQueryOperationPathOneOrMore)({
  'mediatorMergeBindingsContext': urn_comunica_default_merge_bindings_context_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#path-one-or-more',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_path_zero_or_more = new (require('@comunica/actor-query-operation-path-zero-or-more').ActorQueryOperationPathZeroOrMore)({
  'mediatorMergeBindingsContext': urn_comunica_default_merge_bindings_context_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#path-zero-or-more',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_path_zero_or_one = new (require('@comunica/actor-query-operation-path-zero-or-one').ActorQueryOperationPathZeroOrOne)({
  'mediatorMergeBindingsContext': urn_comunica_default_merge_bindings_context_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#path-zero-or-one',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_operation_actors_update_delete_insert = new (require('@comunica/actor-query-operation-update-deleteinsert').ActorQueryOperationUpdateDeleteInsert)({
  'mediatorUpdateQuads': urn_comunica_default_rdf_update_quads_mediators_main,
  'mediatorMergeBindingsContext': urn_comunica_default_merge_bindings_context_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'name': 'urn:comunica:default:query-operation/actors#update-delete-insert',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_operation__4_0_0_components_ActorQueryOperation_jsonld_ActorQueryOperation_default_bus,
  'busFailMessage': 'Query operation processing failed: none of the configured actors were able to handle the operation type ${action.operation.type}'
});
const urn_comunica_default_query_process_actors_sequential = new (require('@comunica/actor-query-process-sequential').ActorQueryProcessSequential)({
  'mediatorContextPreprocess': urn_comunica_default_context_preprocess_mediators_main,
  'mediatorQueryParse': urn_comunica_default_query_parse_mediators_main,
  'mediatorOptimizeQueryOperation': urn_comunica_default_optimize_query_operation_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'mediatorMergeBindingsContext': urn_comunica_default_merge_bindings_context_mediators_main,
  'name': 'urn:comunica:default:query-process/actors#sequential',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_process__4_0_0_components_ActorQueryProcess_jsonld_ActorQueryProcess_default_bus,
  'busFailMessage': 'Query processing failed: none of the configured actor were process to the query "${action.query}"'
});
const urn_comunica_default_query_source_identify_actors_hypermedia = new (require('@comunica/actor-query-source-identify-hypermedia').ActorQuerySourceIdentifyHypermedia)({
  'cacheSize': 100,
  'maxIterators': 64,
  'aggregateTraversalStore': true,
  'mediatorDereferenceRdf': urn_comunica_default_dereference_rdf_mediators_main,
  'mediatorMetadata': urn_comunica_default_rdf_metadata_mediators_main,
  'mediatorMetadataExtract': urn_comunica_default_rdf_metadata_extract_mediators_main,
  'mediatorMetadataAccumulate': urn_comunica_default_rdf_metadata_accumulate_mediators_main,
  'mediatorQuerySourceIdentifyHypermedia': urn_comunica_default_query_source_identify_hypermedia_mediators_main,
  'mediatorRdfResolveHypermediaLinks': urn_comunica_default_rdf_resolve_hypermedia_links_mediators_main,
  'mediatorRdfResolveHypermediaLinksQueue': urn_comunica_default_rdf_resolve_hypermedia_links_queue_mediators_main,
  'mediatorMergeBindingsContext': urn_comunica_default_merge_bindings_context_mediators_main,
  'name': 'urn:comunica:default:query-source-identify/actors#hypermedia',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_source_identify__4_0_0_components_ActorQuerySourceIdentify_jsonld_ActorQuerySourceIdentify_default_bus,
  'busFailMessage': 'Query source identification failed: none of the configured actors were able to identify ${action.querySourceUnidentified.value}'
});
const urn_comunica_default_rdf_join_actors_inner_none = new (require('@comunica/actor-rdf-join-inner-none').ActorRdfJoinNone)({
  'mediatorMergeBindingsContext': urn_comunica_default_merge_bindings_context_mediators_main,
  'mediatorJoinSelectivity': urn_comunica_default_rdf_join_selectivity_mediators_main,
  'name': 'urn:comunica:default:rdf-join/actors#inner-none',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus,
  'busFailMessage': 'RDF joining failed: none of the configured actors were able to handle the join type ${action.type}'
});
const urn_comunica_default_rdf_join_actors_optional_bind = new (require('@comunica/actor-rdf-join-optional-bind').ActorRdfJoinOptionalBind)({
  'bindOrder': 'depth-first',
  'selectivityModifier': 0.000001,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'mediatorMergeBindingsContext': urn_comunica_default_merge_bindings_context_mediators_main,
  'mediatorJoinSelectivity': urn_comunica_default_rdf_join_selectivity_mediators_main,
  'name': 'urn:comunica:default:rdf-join/actors#optional-bind',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus,
  'busFailMessage': 'RDF joining failed: none of the configured actors were able to handle the join type ${action.type}'
});
const urn_comunica_default_term_comparator_factory_actors_expression_evaluator = new (require('@comunica/actor-term-comparator-factory-expression-evaluator').ActorTermComparatorFactoryExpressionEvaluator)({
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'mediatorFunctionFactory': urn_comunica_default_function_factory_mediators_main,
  'mediatorMergeBindingsContext': urn_comunica_default_merge_bindings_context_mediators_main,
  'name': 'urn:comunica:default:term-comparator-factory/actors#expression-evaluator',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_term_comparator_factory__4_0_0_components_ActorTermComparatorFactory_jsonld_ActorTermComparatorFactory_default_bus,
  'busFailMessage': 'Creation of term comparator failed'
});
const urn_comunica_default_rdf_join_actors_inner_multi_bind = new (require('@comunica/actor-rdf-join-inner-multi-bind').ActorRdfJoinMultiBind)({
  'bindOrder': 'depth-first',
  'selectivityModifier': 0.0001,
  'minMaxCardinalityRatio': 60,
  'mediatorJoinEntriesSort': urn_comunica_default_rdf_join_entries_sort_mediators_main,
  'mediatorQueryOperation': urn_comunica_default_query_operation_mediators_main,
  'mediatorMergeBindingsContext': urn_comunica_default_merge_bindings_context_mediators_main,
  'mediatorJoinSelectivity': urn_comunica_default_rdf_join_selectivity_mediators_main,
  'name': 'urn:comunica:default:rdf-join/actors#inner-multi-bind',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus,
  'busFailMessage': 'RDF joining failed: none of the configured actors were able to handle the join type ${action.type}',
  'beforeActors': [
  urn_comunica_default_rdf_join_actors_inner_multi_smallest,
  urn_comunica_default_rdf_join_actors_inner_hash_def,
  urn_comunica_default_rdf_join_actors_inner_hash_undef,
  urn_comunica_default_rdf_join_actors_inner_symmetric_hash,
  urn_comunica_default_rdf_join_actors_inner_nested_loop
]
});
const urn_comunica_default_rdf_join_actors_inner_multi_smallest_filter_bindings = new (require('@comunica/actor-rdf-join-inner-multi-smallest-filter-bindings').ActorRdfJoinMultiSmallestFilterBindings)({
  'selectivityModifier': 0.0001,
  'blockSize': 64,
  'mediatorJoinEntriesSort': urn_comunica_default_rdf_join_entries_sort_mediators_main,
  'mediatorJoin': urn_comunica_default_rdf_join_mediators_main,
  'mediatorJoinSelectivity': urn_comunica_default_rdf_join_selectivity_mediators_main,
  'name': 'urn:comunica:default:rdf-join/actors#inner-multi-smallest-filter-bindings',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus,
  'busFailMessage': 'RDF joining failed: none of the configured actors were able to handle the join type ${action.type}',
  'beforeActors': [
  urn_comunica_default_rdf_join_actors_inner_multi_smallest,
  urn_comunica_default_rdf_join_actors_inner_hash_def,
  urn_comunica_default_rdf_join_actors_inner_hash_undef,
  urn_comunica_default_rdf_join_actors_inner_symmetric_hash,
  urn_comunica_default_rdf_join_actors_inner_nested_loop
]
});
const urn_comunica_default_query_result_serialize_actors_sparql_json = new (require('@comunica/actor-query-result-serialize-sparql-json').ActorQueryResultSerializeSparqlJson)({
  'emitMetadata': true,
  'httpObserver': https___linkedsoftwaredependencies_org_bundles_npm__comunica_actor_query_result_serialize_sparql_json__4_0_0_components_ActorQueryResultSerializeSparqlJson_jsonld_ActorQueryResultSerializeSparqlJson_default_observer,
  'mediaTypePriorities': {"application/sparql-results+json":0.8},
  'mediaTypeFormats': {"application/sparql-results+json":"http://www.w3.org/ns/formats/SPARQL_Results_JSON"},
  'name': 'urn:comunica:default:query-result-serialize/actors#sparql-json',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_result_serialize__4_0_0_components_ActorQueryResultSerialize_jsonld_ActorQueryResultSerialize_default_bus,
  'busFailMessage': 'Query result serialization failed: none of the configured actors were able to serialize for type ${action.handle.type}'
});
const urn_comunica_default_query_result_serialize_actors_stats = new (require('@comunica/actor-query-result-serialize-stats').ActorQueryResultSerializeStats)({
  'httpObserver': https___linkedsoftwaredependencies_org_bundles_npm__comunica_actor_query_result_serialize_stats__4_0_0_components_ActorQueryResultSerializeStats_jsonld_ActorQueryResultSerializeStats_default_observer,
  'mediaTypePriorities': {"stats":0.5},
  'mediaTypeFormats': {"stats":"https://comunica.linkeddatafragments.org/#results_stats"},
  'name': 'urn:comunica:default:query-result-serialize/actors#stats',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_result_serialize__4_0_0_components_ActorQueryResultSerialize_jsonld_ActorQueryResultSerialize_default_bus,
  'busFailMessage': 'Query result serialization failed: none of the configured actors were able to serialize for type ${action.handle.type}'
});
const urn_comunica_default_query_process_actors_explain_parsed = new (require('@comunica/actor-query-process-explain-parsed').ActorQueryProcessExplainParsed)({
  'queryProcessor': urn_comunica_default_query_process_actors_sequential,
  'name': 'urn:comunica:default:query-process/actors#explain-parsed',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_process__4_0_0_components_ActorQueryProcess_jsonld_ActorQueryProcess_default_bus,
  'busFailMessage': 'Query processing failed: none of the configured actor were process to the query "${action.query}"'
});
const urn_comunica_default_query_process_actors_explain_logical = new (require('@comunica/actor-query-process-explain-logical').ActorQueryProcessExplainLogical)({
  'queryProcessor': urn_comunica_default_query_process_actors_sequential,
  'name': 'urn:comunica:default:query-process/actors#explain-logical',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_process__4_0_0_components_ActorQueryProcess_jsonld_ActorQueryProcess_default_bus,
  'busFailMessage': 'Query processing failed: none of the configured actor were process to the query "${action.query}"'
});
const urn_comunica_default_query_process_actors_explain_physical = new (require('@comunica/actor-query-process-explain-physical').ActorQueryProcessExplainPhysical)({
  'queryProcessor': urn_comunica_default_query_process_actors_sequential,
  'name': 'urn:comunica:default:query-process/actors#explain-physical',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_process__4_0_0_components_ActorQueryProcess_jsonld_ActorQueryProcess_default_bus,
  'busFailMessage': 'Query processing failed: none of the configured actor were process to the query "${action.query}"'
});
const urn_comunica_default_optimize_query_operation_actors_prune_empty_source_operations = new (require('@comunica/actor-optimize-query-operation-prune-empty-source-operations').ActorOptimizeQueryOperationPruneEmptySourceOperations)({
  'useAskIfSupported': false,
  'name': 'urn:comunica:default:optimize-query-operation/actors#prune-empty-source-operations',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_optimize_query_operation__4_0_0_components_ActorOptimizeQueryOperation_jsonld_ActorOptimizeQueryOperation_default_bus,
  'busFailMessage': 'Query optimization failed: none of the configured actors were able to optimize',
  'beforeActors': [
  urn_comunica_default_optimize_query_operation_actors_filter_pushdown
]
});
const urn_comunica_default_http_actors_retry = new (require('@comunica/actor-http-retry').ActorHttpRetry)({
  'mediatorHttp': urn_comunica_default_http_mediators_main,
  'httpInvalidator': https___linkedsoftwaredependencies_org_bundles_npm__comunica_actor_http_retry__4_0_0_components_ActorHttpRetry_jsonld_IActorHttpQueueArgs_default_invalidator,
  'name': 'urn:comunica:default:http/actors#retry',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_http__4_0_0_components_ActorHttp_jsonld_ActorHttp_default_bus,
  'busFailMessage': 'HTTP request failed: none of the configured actors were able to handle ${action.input}',
  'beforeActors': [
  urn_comunica_default_http_actors_proxy
]
});
const urn_comunica_default_query_source_identify_actors_rdfjs = new (require('@comunica/actor-query-source-identify-rdfjs').ActorQuerySourceIdentifyRdfJs)({
  'mediatorMergeBindingsContext': urn_comunica_default_merge_bindings_context_mediators_main,
  'name': 'urn:comunica:default:query-source-identify/actors#rdfjs',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_source_identify__4_0_0_components_ActorQuerySourceIdentify_jsonld_ActorQuerySourceIdentify_default_bus,
  'busFailMessage': 'Query source identification failed: none of the configured actors were able to identify ${action.querySourceUnidentified.value}',
  'beforeActors': [
  urn_comunica_default_query_source_identify_actors_hypermedia
]
});
const urn_comunica_default_query_source_identify_actors_serialized = new (require('@comunica/actor-query-source-identify-serialized').ActorQuerySourceIdentifySerialized)({
  'mediatorRdfParse': urn_comunica_default_rdf_parse_mediators_parse,
  'mediatorQuerySourceIdentify': urn_comunica_default_query_source_identify_mediators_main,
  'name': 'urn:comunica:default:query-source-identify/actors#serialized',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_query_source_identify__4_0_0_components_ActorQuerySourceIdentify_jsonld_ActorQuerySourceIdentify_default_bus,
  'busFailMessage': 'Query source identification failed: none of the configured actors were able to identify ${action.querySourceUnidentified.value}',
  'beforeActors': [
  urn_comunica_default_query_source_identify_actors_hypermedia
]
});
const urn_comunica_default_rdf_join_actors_inner_multi_bind_source = new (require('@comunica/actor-rdf-join-inner-multi-bind-source').ActorRdfJoinMultiBindSource)({
  'selectivityModifier': 0.0001,
  'blockSize': 16,
  'mediatorJoinEntriesSort': urn_comunica_default_rdf_join_entries_sort_mediators_main,
  'mediatorJoinSelectivity': urn_comunica_default_rdf_join_selectivity_mediators_main,
  'name': 'urn:comunica:default:rdf-join/actors#inner-multi-bind-source',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_rdf_join__4_0_0_components_ActorRdfJoin_jsonld_ActorRdfJoin_default_bus,
  'busFailMessage': 'RDF joining failed: none of the configured actors were able to handle the join type ${action.type}',
  'beforeActors': [
  urn_comunica_default_rdf_join_actors_inner_multi_smallest,
  urn_comunica_default_rdf_join_actors_inner_multi_bind,
  urn_comunica_default_rdf_join_actors_inner_hash_def,
  urn_comunica_default_rdf_join_actors_inner_hash_undef,
  urn_comunica_default_rdf_join_actors_inner_symmetric_hash,
  urn_comunica_default_rdf_join_actors_inner_nested_loop
]
});
const urn_comunica_default_optimize_query_operation_actors_join_connected = new (require('@comunica/actor-optimize-query-operation-join-connected').ActorOptimizeQueryOperationJoinConnected)({
  'name': 'urn:comunica:default:optimize-query-operation/actors#join-connected',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_optimize_query_operation__4_0_0_components_ActorOptimizeQueryOperation_jsonld_ActorOptimizeQueryOperation_default_bus,
  'busFailMessage': 'Query optimization failed: none of the configured actors were able to optimize',
  'beforeActors': [
  urn_comunica_default_optimize_query_operation_actors_prune_empty_source_operations
]
});
const urn_comunica_default_optimize_query_operation_actors_bgp_to_join = new (require('@comunica/actor-optimize-query-operation-bgp-to-join').ActorOptimizeQueryOperationBgpToJoin)({
  'name': 'urn:comunica:default:optimize-query-operation/actors#bgp-to-join',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_optimize_query_operation__4_0_0_components_ActorOptimizeQueryOperation_jsonld_ActorOptimizeQueryOperation_default_bus,
  'busFailMessage': 'Query optimization failed: none of the configured actors were able to optimize',
  'beforeActors': [
  urn_comunica_default_optimize_query_operation_actors_join_connected
]
});
const urn_comunica_default_optimize_query_operation_actors_join_bgp = new (require('@comunica/actor-optimize-query-operation-join-bgp').ActorOptimizeQueryOperationJoinBgp)({
  'name': 'urn:comunica:default:optimize-query-operation/actors#join-bgp',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_optimize_query_operation__4_0_0_components_ActorOptimizeQueryOperation_jsonld_ActorOptimizeQueryOperation_default_bus,
  'busFailMessage': 'Query optimization failed: none of the configured actors were able to optimize',
  'beforeActors': [
  urn_comunica_default_optimize_query_operation_actors_bgp_to_join
]
});
const urn_comunica_default_optimize_query_operation_actors_assign_sources_exhaustive = new (require('@comunica/actor-optimize-query-operation-assign-sources-exhaustive').ActorOptimizeQueryOperationAssignSourcesExhaustive)({
  'name': 'urn:comunica:default:optimize-query-operation/actors#assign-sources-exhaustive',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_optimize_query_operation__4_0_0_components_ActorOptimizeQueryOperation_jsonld_ActorOptimizeQueryOperation_default_bus,
  'busFailMessage': 'Query optimization failed: none of the configured actors were able to optimize',
  'beforeActors': [
  urn_comunica_default_optimize_query_operation_actors_join_bgp
]
});
const urn_comunica_default_optimize_query_operation_actors_describe_to_constructs_subject = new (require('@comunica/actor-optimize-query-operation-describe-to-constructs-subject').ActorOptimizeQueryOperationDescribeToConstructsSubject)({
  'name': 'urn:comunica:default:optimize-query-operation/actors#describe-to-constructs-subject',
  'bus': https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_optimize_query_operation__4_0_0_components_ActorOptimizeQueryOperation_jsonld_ActorOptimizeQueryOperation_default_bus,
  'busFailMessage': 'Query optimization failed: none of the configured actors were able to optimize',
  'beforeActors': [
  urn_comunica_default_optimize_query_operation_actors_assign_sources_exhaustive
]
});
const urn_comunica_default_Runner = (https___linkedsoftwaredependencies_org_bundles_npm__comunica_bus_init__4_0_0_components_ActorInit_jsonld_ActorInit_default_bus, [
  urn_comunica_default_context_preprocess_actors_convert_shortcuts,
  urn_comunica_default_context_preprocess_actors_set_defaults,
  urn_comunica_default_context_preprocess_actors_source_to_destination,
  urn_comunica_default_context_preprocess_actors_query_source_identify,
  urn_comunica_default_context_preprocess_actors_query_source_skolemize,
  urn_comunica_default_hash_bindings_actors_murmur,
  urn_comunica_default_hash_quads_actors_murmur,
  urn_comunica_default_init_actors_query,
  urn_comunica_default_optimize_query_operation_actors_rewrite_copy,
  urn_comunica_default_optimize_query_operation_actors_rewrite_move,
  urn_comunica_default_optimize_query_operation_actors_rewrite_add,
  urn_comunica_default_optimize_query_operation_actors_describe_to_constructs_subject,
  urn_comunica_default_optimize_query_operation_actors_assign_sources_exhaustive,
  urn_comunica_default_optimize_query_operation_actors_join_bgp,
  urn_comunica_default_optimize_query_operation_actors_bgp_to_join,
  urn_comunica_default_optimize_query_operation_actors_join_connected,
  urn_comunica_default_optimize_query_operation_actors_prune_empty_source_operations,
  urn_comunica_default_optimize_query_operation_actors_filter_pushdown,
  urn_comunica_default_optimize_query_operation_actors_group_sources,
  urn_comunica_default_optimize_query_operation_actors_construct_distinct,
  urn_comunica_default_query_parse_actors_sparql,
  urn_comunica_default_query_parse_actors_graphql,
  urn_comunica_default_query_result_serialize_actors_json,
  urn_comunica_default_query_result_serialize_actors_rdf,
  urn_comunica_default_query_result_serialize_actors_simple,
  urn_comunica_default_query_result_serialize_actors_csv,
  urn_comunica_default_query_result_serialize_actors_sparql_json,
  urn_comunica_default_query_result_serialize_actors_sparql_tsv,
  urn_comunica_default_query_result_serialize_actors_sparql_xml,
  urn_comunica_default_query_result_serialize_actors_stats,
  urn_comunica_default_query_result_serialize_actors_table,
  urn_comunica_default_query_result_serialize_actors_tree,
  urn_comunica_default_query_source_identify_hypermedia_actors_qpf,
  urn_comunica_default_rdf_resolve_quad_pattern_actors_sparql,
  urn_comunica_default_query_source_identify_hypermedia_actors_none,
  urn_comunica_default_dereference_actors_http,
  urn_comunica_default_dereference_actors_fallback,
  urn_comunica_default_dereference_rdf_actors_parse,
  urn_comunica_default_rdf_join_entries_sort_actors_cardinality,
  urn_comunica_default_rdf_join_selectivity_actors_variable_counting,
  urn_comunica_default_rdf_metadata_actors_primary_topic,
  urn_comunica_default_rdf_metadata_actors_all,
  urn_comunica_default_rdf_metadata_accumulate_actors_cardinality,
  urn_comunica_default_rdf_metadata_accumulate_actors_pagesize,
  urn_comunica_default_rdf_metadata_accumulate_actors_requesttime,
  urn_comunica_default_rdf_metadata_extract_actors_hydra_controls,
  urn_comunica_default_rdf_metadata_extract_actors_hydra_count,
  urn_comunica_default_rdf_metadata_extract_actors_hydra_pagesize,
  urn_comunica_default_rdf_metadata_extract_actors_request_time,
  urn_comunica_default_rdf_metadata_extract_actors_allow_http_methods,
  urn_comunica_default_rdf_metadata_extract_actors_put_accepted,
  urn_comunica_default_rdf_metadata_extract_actors_patch_sparql_update,
  urn_comunica_default_rdf_metadata_extract_actors_sparql_service,
  urn_comunica_default_rdf_parse_actors_n3,
  urn_comunica_default_rdf_parse_actors_jsonld,
  urn_comunica_default_rdf_parse_actors_rdfxml,
  urn_comunica_default_rdf_parse_actors_xmlrdfa,
  urn_comunica_default_rdf_parse_actors_html,
  urn_comunica_default_rdf_parse_actors_shaclc,
  urn_comunica_default_rdf_parse_html_actors_microdata,
  urn_comunica_default_rdf_parse_html_actors_rdfa,
  urn_comunica_default_rdf_parse_html_actors_script,
  urn_comunica_default_rdf_resolve_hypermedia_links_actors_next,
  urn_comunica_default_rdf_resolve_hypermedia_links_queue_actors_fifo,
  urn_comunica_default_rdf_serialize_actors_n3,
  urn_comunica_default_rdf_serialize_actors_jsonld,
  urn_comunica_default_rdf_serialize_actors_shaclc,
  urn_comunica_default_rdf_update_hypermedia_actors_patch_sparql_update,
  urn_comunica_default_rdf_update_hypermedia_actors_put_ldp,
  urn_comunica_default_rdf_update_hypermedia_actors_sparql,
  urn_comunica_default_rdf_update_quads_actors_hypermedia,
  urn_comunica_default_rdf_update_quads_actors_rdfjs_store,
  urn_comunica_default_bindings_aggregator_factory_actors_average,
  urn_comunica_default_bindings_aggregator_factory_actors_count,
  urn_comunica_default_bindings_aggregator_factory_actors_group_concat,
  urn_comunica_default_bindings_aggregator_factory_actors_sample,
  urn_comunica_default_bindings_aggregator_factory_actors_min,
  urn_comunica_default_bindings_aggregator_factory_actors_max,
  urn_comunica_default_bindings_aggregator_factory_actors_sum,
  urn_comunica_default_bindings_aggregator_factory_actors_wildcard_count,
  urn_comunica_default_expression_evaluator_factory_actors_default,
  urn_comunica_default_function_factory_actors_expression_function_bound,
  urn_comunica_default_function_factory_actors_expression_function_bnode,
  urn_comunica_default_function_factory_actors_expression_function_concat,
  urn_comunica_default_function_factory_actors_expression_function_coalesce,
  urn_comunica_default_function_factory_actors_expression_function_extensions,
  urn_comunica_default_function_factory_actors_expression_function_if,
  urn_comunica_default_function_factory_actors_expression_function_in,
  urn_comunica_default_function_factory_actors_expression_function_logical_and,
  urn_comunica_default_function_factory_actors_expression_function_logical_or,
  urn_comunica_default_function_factory_actors_expression_function_not_in,
  urn_comunica_default_function_factory_actors_expression_function_same_term,
  urn_comunica_default_function_factory_actors_term_function_abs,
  urn_comunica_default_function_factory_actors_term_function_addition,
  urn_comunica_default_function_factory_actors_term_function_ceil,
  urn_comunica_default_function_factory_actors_term_function_contains,
  urn_comunica_default_function_factory_actors_term_function_datatype,
  urn_comunica_default_function_factory_actors_term_function_day,
  urn_comunica_default_function_factory_actors_term_function_division,
  urn_comunica_default_function_factory_actors_term_function_encode_for_uri,
  urn_comunica_default_function_factory_actors_term_function_equality,
  urn_comunica_default_function_factory_actors_term_function_floor,
  urn_comunica_default_function_factory_actors_term_function_hours,
  urn_comunica_default_function_factory_actors_term_function_greater_than,
  urn_comunica_default_function_factory_actors_term_function_greater_than_equal,
  urn_comunica_default_function_factory_actors_term_function_inequality,
  urn_comunica_default_function_factory_actors_term_function_iri,
  urn_comunica_default_function_factory_actors_term_function_is_blank,
  urn_comunica_default_function_factory_actors_term_function_is_iri,
  urn_comunica_default_function_factory_actors_term_function_is_literal,
  urn_comunica_default_function_factory_actors_term_function_is_numeric,
  urn_comunica_default_function_factory_actors_term_function_is_triple,
  urn_comunica_default_function_factory_actors_term_function_lang,
  urn_comunica_default_function_factory_actors_term_function_langmatches,
  urn_comunica_default_function_factory_actors_term_function_lcase,
  urn_comunica_default_function_factory_actors_term_function_lesser_than_equal,
  urn_comunica_default_function_factory_actors_term_function_md5,
  urn_comunica_default_function_factory_actors_term_function_lesser_than,
  urn_comunica_default_function_factory_actors_term_function_minutes,
  urn_comunica_default_function_factory_actors_term_function_month,
  urn_comunica_default_function_factory_actors_term_function_multiplication,
  urn_comunica_default_function_factory_actors_term_function_not,
  urn_comunica_default_function_factory_actors_term_function_predicate,
  urn_comunica_default_function_factory_actors_term_function_now,
  urn_comunica_default_function_factory_actors_term_function_object,
  urn_comunica_default_function_factory_actors_term_function_rand,
  urn_comunica_default_function_factory_actors_term_function_regex,
  urn_comunica_default_function_factory_actors_term_function_replace,
  urn_comunica_default_function_factory_actors_term_function_round,
  urn_comunica_default_function_factory_actors_term_function_seconds,
  urn_comunica_default_function_factory_actors_term_function_sha256,
  urn_comunica_default_function_factory_actors_term_function_sha1,
  urn_comunica_default_function_factory_actors_term_function_sha512,
  urn_comunica_default_function_factory_actors_term_function_sha384,
  urn_comunica_default_function_factory_actors_term_function_str_after,
  urn_comunica_default_function_factory_actors_term_function_str_before,
  urn_comunica_default_function_factory_actors_term_function_str_dt,
  urn_comunica_default_function_factory_actors_term_function_str_ends,
  urn_comunica_default_function_factory_actors_term_function_str_lang,
  urn_comunica_default_function_factory_actors_term_function_str_len,
  urn_comunica_default_function_factory_actors_term_function_str_starts,
  urn_comunica_default_function_factory_actors_term_function_str_uuid,
  urn_comunica_default_function_factory_actors_term_function_str,
  urn_comunica_default_function_factory_actors_term_function_sub_str,
  urn_comunica_default_function_factory_actors_term_function_subject,
  urn_comunica_default_function_factory_actors_term_function_subtraction,
  urn_comunica_default_function_factory_actors_term_function_timezone,
  urn_comunica_default_function_factory_actors_term_function_triple,
  urn_comunica_default_function_factory_actors_term_function_tz,
  urn_comunica_default_function_factory_actors_term_function_unary_minus,
  urn_comunica_default_function_factory_actors_term_function_ucase,
  urn_comunica_default_function_factory_actors_term_function_unary_plus,
  urn_comunica_default_function_factory_actors_term_function_uuid,
  urn_comunica_default_function_factory_actors_term_function_xsd_to_boolean,
  urn_comunica_default_function_factory_actors_term_function_xsd_to_date,
  urn_comunica_default_function_factory_actors_term_function_xsd_to_datetime,
  urn_comunica_default_function_factory_actors_term_function_xsd_to_day_time_duration,
  urn_comunica_default_function_factory_actors_term_function_xsd_to_decimal,
  urn_comunica_default_function_factory_actors_term_function_xsd_to_double,
  urn_comunica_default_function_factory_actors_term_function_xsd_to_duration,
  urn_comunica_default_function_factory_actors_term_function_xsd_to_float,
  urn_comunica_default_function_factory_actors_term_function_xsd_to_integer,
  urn_comunica_default_function_factory_actors_term_function_xsd_to_string,
  urn_comunica_default_function_factory_actors_term_function_xsd_to_time,
  urn_comunica_default_function_factory_actors_term_function_xsd_to_year_month_duration,
  urn_comunica_default_function_factory_actors_term_function_year,
  urn_comunica_default_http_actors_retry,
  urn_comunica_default_http_actors_proxy,
  urn_comunica_default_http_actors_fetch,
  urn_comunica_default_http_actors_wayback,
  urn_comunica_default_query_operation_actors_ask,
  urn_comunica_default_query_operation_actors_bgp,
  urn_comunica_default_query_operation_actors_construct,
  urn_comunica_default_query_operation_actors_distinct,
  urn_comunica_default_query_operation_actors_extend,
  urn_comunica_default_query_operation_actors_filter,
  urn_comunica_default_query_operation_actors_from,
  urn_comunica_default_query_operation_actors_group,
  urn_comunica_default_query_operation_actors_join,
  urn_comunica_default_query_operation_actors_leftjoin,
  urn_comunica_default_query_operation_actors_minus,
  urn_comunica_default_query_operation_actors_nop,
  urn_comunica_default_query_operation_actors_orderby,
  urn_comunica_default_query_operation_actors_project,
  urn_comunica_default_query_operation_actors_reduced,
  urn_comunica_default_query_operation_actors_service,
  urn_comunica_default_query_operation_actors_slice,
  urn_comunica_default_query_operation_actors_source,
  urn_comunica_default_query_operation_actors_union,
  urn_comunica_default_query_operation_actors_values,
  urn_comunica_default_query_operation_actors_path_alt,
  urn_comunica_default_query_operation_actors_path_inv,
  urn_comunica_default_query_operation_actors_path_link,
  urn_comunica_default_query_operation_actors_path_nps,
  urn_comunica_default_query_operation_actors_path_one_or_more,
  urn_comunica_default_query_operation_actors_path_seq,
  urn_comunica_default_query_operation_actors_path_zero_or_more,
  urn_comunica_default_query_operation_actors_path_zero_or_one,
  urn_comunica_default_query_operation_actors_update_clear,
  urn_comunica_default_query_operation_actors_update_composite,
  urn_comunica_default_query_operation_actors_update_create,
  urn_comunica_default_query_operation_actors_update_delete_insert,
  urn_comunica_default_query_operation_actors_update_drop,
  urn_comunica_default_query_operation_actors_update_load,
  urn_comunica_default_query_process_actors_sequential,
  urn_comunica_default_query_process_actors_explain_parsed,
  urn_comunica_default_query_process_actors_explain_logical,
  urn_comunica_default_query_process_actors_explain_physical,
  urn_comunica_default_query_source_identify_actors_hypermedia,
  urn_comunica_default_query_source_identify_actors_rdfjs,
  urn_comunica_default_query_source_identify_actors_serialized,
  urn_comunica_default_rdf_join_actors_inner_none,
  urn_comunica_default_rdf_join_actors_inner_single,
  urn_comunica_default_rdf_join_actors_inner_multi_empty,
  urn_comunica_default_rdf_join_actors_inner_multi_bind_source,
  urn_comunica_default_rdf_join_actors_inner_multi_bind,
  urn_comunica_default_rdf_join_actors_inner_hash_def,
  urn_comunica_default_rdf_join_actors_inner_hash_undef,
  urn_comunica_default_rdf_join_actors_inner_symmetric_hash,
  urn_comunica_default_rdf_join_actors_inner_nested_loop,
  urn_comunica_default_rdf_join_actors_inner_multi_smallest,
  urn_comunica_default_rdf_join_actors_inner_multi_smallest_filter_bindings,
  urn_comunica_default_rdf_join_actors_minus_hash_def,
  urn_comunica_default_rdf_join_actors_minus_hash_undef,
  urn_comunica_default_rdf_join_actors_optional_bind,
  urn_comunica_default_rdf_join_actors_optional_hash_def_nonblocking,
  urn_comunica_default_rdf_join_actors_optional_hash_def_blocking,
  urn_comunica_default_rdf_join_actors_optional_hash_undef_nonblocking,
  urn_comunica_default_rdf_join_actors_optional_hash_undef_blocking,
  urn_comunica_default_rdf_join_actors_optional_nested_loop,
  urn_comunica_default_term_comparator_factory_actors_expression_evaluator
]);
return urn_comunica_default_init_actors_query;
}

