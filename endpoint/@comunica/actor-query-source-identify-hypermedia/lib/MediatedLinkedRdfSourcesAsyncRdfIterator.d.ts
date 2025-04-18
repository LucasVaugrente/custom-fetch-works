import type { MediatorRdfMetadataAccumulate } from '@comunica/bus-rdf-metadata-accumulate';
import type { MediatorRdfResolveHypermediaLinks } from '@comunica/bus-rdf-resolve-hypermedia-links';
import type { ILinkQueue, MediatorRdfResolveHypermediaLinksQueue } from '@comunica/bus-rdf-resolve-hypermedia-links-queue';
import type { ComunicaDataFactory, IActionContext, IAggregatedStore, IQueryBindingsOptions, MetadataBindings, ILink } from '@comunica/types';
import type { Algebra, Factory } from 'sparqlalgebrajs';
import type { SourceStateGetter, ISourceState } from './LinkedRdfSourcesAsyncRdfIterator';
import { LinkedRdfSourcesAsyncRdfIterator } from './LinkedRdfSourcesAsyncRdfIterator';
/**
 * An quad iterator that can iterate over consecutive RDF sources
 * that are determined using the rdf-resolve-hypermedia-links bus.
 *
 * @see LinkedRdfSourcesAsyncRdfIterator
 */
export declare class MediatedLinkedRdfSourcesAsyncRdfIterator extends LinkedRdfSourcesAsyncRdfIterator {
    private readonly mediatorMetadataAccumulate;
    private readonly mediatorRdfResolveHypermediaLinks;
    private readonly mediatorRdfResolveHypermediaLinksQueue;
    private readonly forceSourceType?;
    private readonly handledUrls;
    private readonly aggregatedStore;
    private readonly dataFactory;
    private readonly algebraFactory;
    private linkQueue;
    private wasForcefullyClosed;
    constructor(cacheSize: number, operation: Algebra.Operation, queryBindingsOptions: IQueryBindingsOptions | undefined, context: IActionContext, forceSourceType: string | undefined, firstUrl: string, maxIterators: number, sourceStateGetter: SourceStateGetter, aggregatedStore: IAggregatedStore | undefined, mediatorMetadataAccumulate: MediatorRdfMetadataAccumulate, mediatorRdfResolveHypermediaLinks: MediatorRdfResolveHypermediaLinks, mediatorRdfResolveHypermediaLinksQueue: MediatorRdfResolveHypermediaLinksQueue, dataFactory: ComunicaDataFactory, algebraFactory: Factory);
    close(): void;
    destroy(cause?: Error): void;
    protected isCloseable(linkQueue: ILinkQueue, requireQueueEmpty: boolean): boolean;
    protected canStartNewIterator(): boolean;
    protected canStartNewIteratorConsiderReadable(): boolean;
    protected isRunning(): boolean;
    getLinkQueue(): Promise<ILinkQueue>;
    protected getSourceLinks(metadata: Record<string, any>, startSource: ISourceState): Promise<ILink[]>;
    protected startIterator(startSource: ISourceState): void;
    accumulateMetadata(accumulatedMetadata: MetadataBindings, appendingMetadata: MetadataBindings): Promise<MetadataBindings>;
    protected updateMetadata(metadataNew: MetadataBindings): void;
}
