"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediatedLinkedRdfSourcesAsyncRdfIterator = void 0;
const context_entries_1 = require("@comunica/context-entries");
const LinkedRdfSourcesAsyncRdfIterator_1 = require("./LinkedRdfSourcesAsyncRdfIterator");
/**
 * An quad iterator that can iterate over consecutive RDF sources
 * that are determined using the rdf-resolve-hypermedia-links bus.
 *
 * @see LinkedRdfSourcesAsyncRdfIterator
 */
class MediatedLinkedRdfSourcesAsyncRdfIterator extends LinkedRdfSourcesAsyncRdfIterator_1.LinkedRdfSourcesAsyncRdfIterator {
    constructor(cacheSize, operation, queryBindingsOptions, context, forceSourceType, firstUrl, maxIterators, sourceStateGetter, aggregatedStore, mediatorMetadataAccumulate, mediatorRdfResolveHypermediaLinks, mediatorRdfResolveHypermediaLinksQueue, dataFactory, algebraFactory) {
        super(cacheSize, operation, queryBindingsOptions, context, firstUrl, maxIterators, sourceStateGetter, 
        // Buffersize must be infinite for an aggregated store because it must keep filling until there are no more
        // derived iterators in the aggregated store.
        aggregatedStore ? { maxBufferSize: Number.POSITIVE_INFINITY } : undefined);
        this.wasForcefullyClosed = false;
        this.forceSourceType = forceSourceType;
        this.mediatorMetadataAccumulate = mediatorMetadataAccumulate;
        this.mediatorRdfResolveHypermediaLinks = mediatorRdfResolveHypermediaLinks;
        this.mediatorRdfResolveHypermediaLinksQueue = mediatorRdfResolveHypermediaLinksQueue;
        this.handledUrls = { [firstUrl]: true };
        this.aggregatedStore = aggregatedStore;
        this.dataFactory = dataFactory;
        this.algebraFactory = algebraFactory;
    }
    // Mark the aggregated store as ended once we trigger the closing or destroying of this iterator.
    // We don't override _end, because that would mean that we have to wait
    // until the buffer of this iterator must be fully consumed, which will not always be the case.
    close() {
        if (!this.aggregatedStore) {
            super.close();
            return;
        }
        this.getLinkQueue()
            .then((linkQueue) => {
            if (this.isCloseable(linkQueue, false)) {
                // Wait a tick before ending the aggregatedStore, to ensure that pending match() calls to it have started.
                if (this.aggregatedStore) {
                    setTimeout(() => this.aggregatedStore.end());
                }
                super.close();
            }
            else {
                this.wasForcefullyClosed = true;
            }
        })
            .catch(error => super.destroy(error));
    }
    destroy(cause) {
        if (!this.aggregatedStore) {
            super.destroy(cause);
            return;
        }
        this.getLinkQueue()
            .then((linkQueue) => {
            if (cause ?? this.isCloseable(linkQueue, false)) {
                // Wait a tick before ending the aggregatedStore, to ensure that pending match() calls to it have started.
                if (this.aggregatedStore) {
                    setTimeout(() => this.aggregatedStore.end());
                }
                super.destroy(cause);
            }
            else {
                this.wasForcefullyClosed = true;
            }
        })
            .catch(error => super.destroy(error));
    }
    isCloseable(linkQueue, requireQueueEmpty) {
        return (requireQueueEmpty ? linkQueue.isEmpty() : this.wasForcefullyClosed || linkQueue.isEmpty()) &&
            !this.areIteratorsRunning();
    }
    canStartNewIterator() {
        // Also allow sub-iterators to be started if the aggregated store has at least one running iterator.
        // We need this because there are cases where these running iterators will be consumed before this linked iterator.
        return (!this.wasForcefullyClosed &&
            // eslint-disable-next-line ts/prefer-nullish-coalescing
            (this.aggregatedStore && this.aggregatedStore.hasRunningIterators())) || super.canStartNewIterator();
    }
    canStartNewIteratorConsiderReadable() {
        return !this.aggregatedStore;
    }
    isRunning() {
        // Same as above
        // eslint-disable-next-line ts/prefer-nullish-coalescing
        return (this.aggregatedStore && this.aggregatedStore.hasRunningIterators()) || !this.done;
    }
    getLinkQueue() {
        if (!this.linkQueue) {
            this.linkQueue = this.mediatorRdfResolveHypermediaLinksQueue
                .mediate({ firstUrl: this.firstUrl, context: this.context })
                .then(result => result.linkQueue);
        }
        return this.linkQueue;
    }
    async getSourceLinks(metadata, startSource) {
        try {
            const { links } = await this.mediatorRdfResolveHypermediaLinks.mediate({ context: this.context, metadata });
            // Update discovery event statistic if available
            const traversalTracker = this.context.get(context_entries_1.KeysStatistics.discoveredLinks);
            if (traversalTracker) {
                for (const link of links) {
                    traversalTracker.updateStatistic({ url: link.url, metadata: { ...link.metadata } }, startSource.link);
                }
            }
            // Filter URLs to avoid cyclic next-page loops
            return links.filter((link) => {
                if (this.handledUrls[link.url]) {
                    return false;
                }
                this.handledUrls[link.url] = true;
                return true;
            });
        }
        catch {
            // No next URLs may be available, for example when we've reached the end of a Hydra next-page sequence.
            return [];
        }
    }
    startIterator(startSource) {
        if (this.aggregatedStore && !this.aggregatedStore.containedSources.has(startSource.link.url)) {
            // A source that has been cached due to earlier query executions may not be part of the aggregated store yet.
            // In that case, we add all quads from that source to the aggregated store.
            this.aggregatedStore?.containedSources.add(startSource.link.url);
            const stream = startSource.source.queryBindings(this.algebraFactory.createPattern(this.dataFactory.variable('s'), this.dataFactory.variable('p'), this.dataFactory.variable('o'), this.dataFactory.variable('g')), this.context.set(context_entries_1.KeysQueryOperation.unionDefaultGraph, true)).map(bindings => this.dataFactory.quad(bindings.get('s'), bindings.get('p'), bindings.get('o'), bindings.get('g')));
            this.aggregatedStore.import(stream)
                .on('end', () => {
                super.startIterator(startSource);
            });
        }
        else {
            super.startIterator(startSource);
        }
    }
    async accumulateMetadata(accumulatedMetadata, appendingMetadata) {
        return (await this.mediatorMetadataAccumulate.mediate({
            mode: 'append',
            accumulatedMetadata,
            appendingMetadata,
            context: this.context,
        })).metadata;
    }
    updateMetadata(metadataNew) {
        super.updateMetadata(metadataNew);
        this.aggregatedStore?.setBaseMetadata(metadataNew, true);
    }
}
exports.MediatedLinkedRdfSourcesAsyncRdfIterator = MediatedLinkedRdfSourcesAsyncRdfIterator;
//# sourceMappingURL=MediatedLinkedRdfSourcesAsyncRdfIterator.js.map