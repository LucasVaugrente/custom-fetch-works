"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuerySourceHypermedia = void 0;
const actor_query_source_identify_rdfjs_1 = require("@comunica/actor-query-source-identify-rdfjs");
const context_entries_1 = require("@comunica/context-entries");
const asynciterator_1 = require("asynciterator");
const lru_cache_1 = require("lru-cache");
const readable_stream_1 = require("readable-stream");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
const MediatedLinkedRdfSourcesAsyncRdfIterator_1 = require("./MediatedLinkedRdfSourcesAsyncRdfIterator");
const StreamingStoreMetadata_1 = require("./StreamingStoreMetadata");
class QuerySourceHypermedia {
    constructor(cacheSize, firstUrl, forceSourceType, maxIterators, aggregateStore, mediators, logWarning, dataFactory, bindingsFactory) {
        this.referenceValue = firstUrl;
        this.cacheSize = cacheSize;
        this.firstUrl = firstUrl;
        this.forceSourceType = forceSourceType;
        this.maxIterators = maxIterators;
        this.mediators = mediators;
        this.aggregateStore = aggregateStore;
        this.logWarning = logWarning;
        this.dataFactory = dataFactory;
        this.bindingsFactory = bindingsFactory;
        this.sourcesState = new lru_cache_1.LRUCache({ max: this.cacheSize });
    }
    async getSelectorShape(context) {
        const source = await this.getSourceCached({ url: this.firstUrl }, {}, context, this.getAggregateStore(context));
        return source.source.getSelectorShape(context);
    }
    queryBindings(operation, context, options) {
        // Optimized match with aggregated store if enabled and started.
        const aggregatedStore = this.getAggregateStore(context);
        if (aggregatedStore && operation.type === 'pattern' && aggregatedStore.started) {
            return new actor_query_source_identify_rdfjs_1.QuerySourceRdfJs(aggregatedStore, context.getSafe(context_entries_1.KeysInitQuery.dataFactory), this.bindingsFactory).queryBindings(operation, context);
        }
        // Initialize the sources state on first call
        if (this.sourcesState.size === 0) {
            this.getSourceCached({ url: this.firstUrl }, {}, context, aggregatedStore)
                .catch(error => it.destroy(error));
        }
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const it = new MediatedLinkedRdfSourcesAsyncRdfIterator_1.MediatedLinkedRdfSourcesAsyncRdfIterator(this.cacheSize, operation, options, context, this.forceSourceType, this.firstUrl, this.maxIterators, (link, handledDatasets) => this.getSourceCached(link, handledDatasets, context, aggregatedStore), aggregatedStore, this.mediators.mediatorMetadataAccumulate, this.mediators.mediatorRdfResolveHypermediaLinks, this.mediators.mediatorRdfResolveHypermediaLinksQueue, dataFactory, algebraFactory);
        if (aggregatedStore) {
            aggregatedStore.started = true;
            // Kickstart this iterator when derived iterators are created from the aggregatedStore,
            // otherwise the traversal process will not start if this iterator is not the first one to be consumed.
            const listener = () => it.kickstart();
            aggregatedStore.addIteratorCreatedListener(listener);
            it.on('end', () => aggregatedStore.removeIteratorCreatedListener(listener));
        }
        return it;
    }
    queryQuads(operation, context) {
        return new asynciterator_1.TransformIterator(async () => {
            const source = await this.getSourceCached({ url: this.firstUrl }, {}, context, this.getAggregateStore(context));
            return source.source.queryQuads(operation, context);
        });
    }
    async queryBoolean(operation, context) {
        const source = await this.getSourceCached({ url: this.firstUrl }, {}, context, this.getAggregateStore(context));
        return await source.source.queryBoolean(operation, context);
    }
    async queryVoid(operation, context) {
        const source = await this.getSourceCached({ url: this.firstUrl }, {}, context, this.getAggregateStore(context));
        return await source.source.queryVoid(operation, context);
    }
    /**
     * Resolve a source for the given URL.
     * @param link A source link.
     * @param handledDatasets A hash of dataset identifiers that have already been handled.
     * @param context The action context.
     * @param aggregatedStore An optional aggregated store.
     */
    async getSource(link, handledDatasets, context, aggregatedStore) {
        // Include context entries from link
        if (link.context) {
            context = context.merge(link.context);
        }
        // Get the RDF representation of the given document
        let url = link.url;
        let quads;
        let metadata;
        try {
            const dereferenceRdfOutput = await this.mediators.mediatorDereferenceRdf
                .mediate({ context, url });
            url = dereferenceRdfOutput.url;
            // Determine the metadata
            const rdfMetadataOutput = await this.mediators.mediatorMetadata.mediate({ context, url, quads: dereferenceRdfOutput.data, triples: dereferenceRdfOutput.metadata?.triples });
            rdfMetadataOutput.data.on('error', () => {
                // Silence errors in the data stream,
                // as they will be emitted again in the metadata stream,
                // and will result in a promise rejection anyways.
                // If we don't do this, we end up with an unhandled error message
            });
            metadata = (await this.mediators.mediatorMetadataExtract.mediate({
                context,
                url,
                // The problem appears to be conflicting metadata keys here
                metadata: rdfMetadataOutput.metadata,
                headers: dereferenceRdfOutput.headers,
                requestTime: dereferenceRdfOutput.requestTime,
            })).metadata;
            quads = rdfMetadataOutput.data;
            // Optionally filter the resulting data
            if (link.transform) {
                quads = await link.transform(quads);
            }
        }
        catch (error) {
            // Make sure that dereference errors are only emitted once an actor really needs the read quads
            // This for example allows SPARQL endpoints that error on service description fetching to still be source-forcible
            quads = new readable_stream_1.Readable();
            quads.read = () => {
                setTimeout(() => quads.emit('error', error));
                return null;
            };
            ({ metadata } = await this.mediators.mediatorMetadataAccumulate.mediate({ context, mode: 'initialize' }));
            // Log as warning, because the quads above may not always be consumed (e.g. for SPARQL endpoints),
            // so the user would not be notified of something going wrong otherwise.
            this.logWarning(`Metadata extraction for ${url} failed: ${error.message}`);
        }
        // Aggregate all discovered quads into a store.
        aggregatedStore?.setBaseMetadata(metadata, false);
        aggregatedStore?.containedSources.add(link.url);
        aggregatedStore?.import(quads);
        // Determine the source
        const { source, dataset } = await this.mediators.mediatorQuerySourceIdentifyHypermedia.mediate({
            context,
            forceSourceType: link.url === this.firstUrl ? this.forceSourceType : undefined,
            handledDatasets,
            metadata,
            quads,
            url,
        });
        if (dataset) {
            // Mark the dataset as applied
            // This is needed to make sure that things like QPF search forms are only applied once,
            // and next page links are followed after that.
            handledDatasets[dataset] = true;
        }
        return { link, source, metadata: metadata, handledDatasets };
    }
    /**
     * Resolve a source for the given URL.
     * This will first try to retrieve the source from cache.
     * @param link A source ILink.
     * @param handledDatasets A hash of dataset identifiers that have already been handled.
     * @param context The action context.
     * @param aggregatedStore An optional aggregated store.
     */
    getSourceCached(link, handledDatasets, context, aggregatedStore) {
        let source = this.sourcesState.get(link.url);
        if (source) {
            return source;
        }
        source = this.getSource(link, handledDatasets, context, aggregatedStore);
        if (link.url === this.firstUrl || aggregatedStore === undefined) {
            this.sourcesState.set(link.url, source);
        }
        return source;
    }
    getAggregateStore(context) {
        let aggregatedStore;
        if (this.aggregateStore) {
            const aggregatedStores = context
                .get(context_entries_1.KeysQuerySourceIdentify.hypermediaSourcesAggregatedStores);
            if (aggregatedStores) {
                aggregatedStore = aggregatedStores.get(this.firstUrl);
                if (!aggregatedStore) {
                    aggregatedStore = new StreamingStoreMetadata_1.StreamingStoreMetadata(undefined, async (accumulatedMetadata, appendingMetadata) => (await this.mediators.mediatorMetadataAccumulate.mediate({
                        mode: 'append',
                        accumulatedMetadata,
                        appendingMetadata,
                        context,
                    })).metadata);
                    aggregatedStores.set(this.firstUrl, aggregatedStore);
                }
                return aggregatedStore;
            }
        }
    }
    toString() {
        return `QuerySourceHypermedia(${this.firstUrl})`;
    }
}
exports.QuerySourceHypermedia = QuerySourceHypermedia;
//# sourceMappingURL=QuerySourceHypermedia.js.map