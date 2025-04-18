import type { ILinkQueue } from '@comunica/bus-rdf-resolve-hypermedia-links-queue';
import type { ILink, IQuerySource, IActionContext, MetadataBindings, IQueryBindingsOptions } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { BufferedIteratorOptions } from 'asynciterator';
import { BufferedIterator } from 'asynciterator';
import type { Algebra } from 'sparqlalgebrajs';
export declare abstract class LinkedRdfSourcesAsyncRdfIterator extends BufferedIterator<RDF.Bindings> {
    protected readonly operation: Algebra.Operation;
    protected readonly queryBindingsOptions: IQueryBindingsOptions | undefined;
    protected readonly context: IActionContext;
    private readonly cacheSize;
    protected readonly firstUrl: string;
    private readonly maxIterators;
    private readonly sourceStateGetter;
    protected started: boolean;
    private readonly currentIterators;
    private iteratorsPendingCreation;
    private iteratorsPendingTermination;
    private accumulatedMetadata;
    private preflightMetadata;
    constructor(cacheSize: number, operation: Algebra.Operation, queryBindingsOptions: IQueryBindingsOptions | undefined, context: IActionContext, firstUrl: string, maxIterators: number, sourceStateGetter: SourceStateGetter, options?: BufferedIteratorOptions);
    /**
     * Start filling the buffer of this iterator.
     */
    kickstart(): void;
    getProperty<P>(propertyName: string, callback?: (value: P) => void): P | undefined;
    protected _end(destroy?: boolean): void;
    /**
     * Get the internal link queue.
     * The returned instance must always be the same.
     */
    abstract getLinkQueue(): Promise<ILinkQueue>;
    /**
     * Determine the links to be followed from the current source given its metadata.
     * @param metadata The metadata of a source.
     */
    protected abstract getSourceLinks(metadata: Record<string, any>, startSource: ISourceState): Promise<ILink[]>;
    _read(count: number, done: () => void): void;
    protected canStartNewIterator(): boolean;
    protected canStartNewIteratorConsiderReadable(): boolean;
    protected areIteratorsRunning(): boolean;
    /**
     * Append the fields from appendingMetadata into accumulatedMetadata.
     * @param accumulatedMetadata The fields to append to.
     * @param appendingMetadata The fields to append.
     * @protected
     */
    protected abstract accumulateMetadata(accumulatedMetadata: MetadataBindings, appendingMetadata: MetadataBindings): Promise<MetadataBindings>;
    /**
     * Start a new iterator for the given source.
     * Once the iterator is done, it will either determine a new source, or it will close the linked iterator.
     * @param {ISourceState} startSource The start source state.
     */
    protected startIterator(startSource: ISourceState): void;
    protected updateMetadata(metadataNew: MetadataBindings): void;
    protected isRunning(): boolean;
    /**
     * Check if a next URL is in the queue.
     * If yes, start a new iterator.
     * If no, close this iterator.
     * @param handledDatasets
     * @param canClose
     */
    protected startIteratorsForNextUrls(handledDatasets: Record<string, boolean>, canClose: boolean): void;
    protected isCloseable(linkQueue: ILinkQueue, _requireQueueEmpty: boolean): boolean;
}
/**
 * The current state of a source.
 * This is needed for following links within a source.
 */
export interface ISourceState {
    /**
     * The link to this source.
     */
    link: ILink;
    /**
     * A source.
     */
    source: IQuerySource;
    /**
     * The source's initial metadata.
     */
    metadata: MetadataBindings;
    /**
     * All dataset identifiers that have been passed for this source.
     */
    handledDatasets: Record<string, boolean>;
}
export type SourceStateGetter = (link: ILink, handledDatasets: Record<string, boolean>) => Promise<ISourceState>;
