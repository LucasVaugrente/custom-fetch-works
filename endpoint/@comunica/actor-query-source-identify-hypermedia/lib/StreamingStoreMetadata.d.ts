/// <reference types="node" />
import type { EventEmitter } from 'node:events';
import type { IAggregatedStore, MetadataBindings } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { AsyncIterator } from 'asynciterator';
import { StreamingStore } from 'rdf-streaming-store';
/**
 * A StreamingStore that returns an AsyncIterator with a valid MetadataQuads property.
 */
export declare class StreamingStoreMetadata extends StreamingStore implements IAggregatedStore {
    started: boolean;
    containedSources: Set<string>;
    readonly runningIterators: Set<AsyncIterator<RDF.Quad>>;
    protected readonly iteratorCreatedListeners: Set<() => void>;
    protected readonly metadataAccumulator: (accumulatedMetadata: MetadataBindings, appendingMetadata: MetadataBindings) => Promise<MetadataBindings>;
    protected baseMetadata: MetadataBindings;
    constructor(store: RDF.Store | undefined, metadataAccumulator: (accumulatedMetadata: MetadataBindings, appendingMetadata: MetadataBindings) => Promise<MetadataBindings>);
    import(stream: RDF.Stream): EventEmitter;
    hasRunningIterators(): boolean;
    match(subject?: RDF.Term | null, predicate?: RDF.Term | null, object?: RDF.Term | null, graph?: RDF.Term | null): AsyncIterator<RDF.Quad>;
    setBaseMetadata(metadata: MetadataBindings, updateStates: boolean): void;
    protected updateMetadataState(iterator: AsyncIterator<RDF.Quad>, count: number): void;
    addIteratorCreatedListener(listener: () => void): void;
    removeIteratorCreatedListener(listener: () => void): void;
}
