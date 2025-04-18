"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingStoreMetadata = void 0;
const utils_iterator_1 = require("@comunica/utils-iterator");
const utils_metadata_1 = require("@comunica/utils-metadata");
const rdf_streaming_store_1 = require("rdf-streaming-store");
/**
 * A StreamingStore that returns an AsyncIterator with a valid MetadataQuads property.
 */
class StreamingStoreMetadata extends rdf_streaming_store_1.StreamingStore {
    constructor(store, metadataAccumulator) {
        super(store);
        this.started = false;
        this.containedSources = new Set();
        this.runningIterators = new Set();
        this.iteratorCreatedListeners = new Set();
        this.baseMetadata = {
            state: new utils_metadata_1.MetadataValidationState(),
            cardinality: { type: 'exact', value: 0 },
            variables: [],
        };
        this.metadataAccumulator = metadataAccumulator;
    }
    import(stream) {
        if (!this.ended) {
            super.import(stream);
        }
        return stream;
    }
    hasRunningIterators() {
        return this.runningIterators.size > 0;
    }
    match(subject, predicate, object, graph) {
        // Wrap the raw stream in an AsyncIterator
        const rawStream = super.match(subject, predicate, object, graph);
        const iterator = new utils_iterator_1.ClosableTransformIterator(rawStream, {
            autoStart: false,
            onClose: () => {
                // Running iterators are deleted once closed or destroyed
                this.runningIterators.delete(iterator);
            },
        });
        // Expose the metadata property containing the cardinality
        let count = this.getStore().countQuads(subject, predicate, object, graph);
        const metadata = {
            state: new utils_metadata_1.MetadataValidationState(),
            cardinality: {
                type: 'estimate',
                value: count,
            },
        };
        iterator.setProperty('metadata', metadata);
        iterator.setProperty('lastCount', count);
        // Every time a new quad is pushed into the iterator, update the metadata
        rawStream.on('quad', () => {
            iterator.setProperty('lastCount', ++count);
            this.updateMetadataState(iterator, count);
        });
        // Store all running iterators until they close or are destroyed
        this.runningIterators.add(iterator);
        // Invoke creation listeners
        for (const listener of this.iteratorCreatedListeners) {
            listener();
        }
        return iterator;
    }
    setBaseMetadata(metadata, updateStates) {
        this.baseMetadata = { ...metadata };
        this.baseMetadata.cardinality = { type: 'exact', value: 0 };
        if (updateStates) {
            for (const iterator of this.runningIterators) {
                const count = iterator.getProperty('lastCount');
                this.updateMetadataState(iterator, count);
            }
        }
    }
    updateMetadataState(iterator, count) {
        // Append the given cardinality to the base metadata
        const metadataNew = {
            state: new utils_metadata_1.MetadataValidationState(),
            cardinality: {
                type: 'estimate',
                value: count,
            },
            variables: [],
        };
        this.metadataAccumulator(this.baseMetadata, metadataNew)
            .then((accumulatedMetadata) => {
            accumulatedMetadata.state = new utils_metadata_1.MetadataValidationState();
            // Set the new metadata, and invalidate the previous state
            const metadataToInvalidate = iterator.getProperty('metadata');
            iterator.setProperty('metadata', accumulatedMetadata);
            metadataToInvalidate?.state.invalidate();
        })
            .catch(() => {
            // Void errors
        });
    }
    addIteratorCreatedListener(listener) {
        this.iteratorCreatedListeners.add(listener);
    }
    removeIteratorCreatedListener(listener) {
        this.iteratorCreatedListeners.delete(listener);
    }
}
exports.StreamingStoreMetadata = StreamingStoreMetadata;
//# sourceMappingURL=StreamingStoreMetadata.js.map