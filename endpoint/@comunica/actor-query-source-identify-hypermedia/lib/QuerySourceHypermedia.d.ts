import type { MediatorDereferenceRdf } from '@comunica/bus-dereference-rdf';
import type { MediatorQuerySourceIdentifyHypermedia } from '@comunica/bus-query-source-identify-hypermedia';
import type { MediatorRdfMetadata } from '@comunica/bus-rdf-metadata';
import type { MediatorRdfMetadataAccumulate } from '@comunica/bus-rdf-metadata-accumulate';
import type { MediatorRdfMetadataExtract } from '@comunica/bus-rdf-metadata-extract';
import type { MediatorRdfResolveHypermediaLinks } from '@comunica/bus-rdf-resolve-hypermedia-links';
import type { MediatorRdfResolveHypermediaLinksQueue } from '@comunica/bus-rdf-resolve-hypermedia-links-queue';
import type { BindingsStream, ComunicaDataFactory, FragmentSelectorShape, IActionContext, IAggregatedStore, IQueryBindingsOptions, IQuerySource, ILink } from '@comunica/types';
import type { BindingsFactory } from '@comunica/utils-bindings-factory';
import type * as RDF from '@rdfjs/types';
import type { AsyncIterator } from 'asynciterator';
import { LRUCache } from 'lru-cache';
import type { Algebra } from 'sparqlalgebrajs';
import type { ISourceState } from './LinkedRdfSourcesAsyncRdfIterator';
export declare class QuerySourceHypermedia implements IQuerySource {
    readonly referenceValue: string;
    readonly firstUrl: string;
    readonly forceSourceType?: string;
    readonly aggregateStore: boolean;
    readonly mediators: IMediatorArgs;
    readonly logWarning: (warningMessage: string) => void;
    readonly dataFactory: ComunicaDataFactory;
    readonly bindingsFactory: BindingsFactory;
    /**
     * A cache for source URLs to source states.
     */
    sourcesState: LRUCache<string, Promise<ISourceState>>;
    private readonly cacheSize;
    private readonly maxIterators;
    constructor(cacheSize: number, firstUrl: string, forceSourceType: string | undefined, maxIterators: number, aggregateStore: boolean, mediators: IMediatorArgs, logWarning: (warningMessage: string) => void, dataFactory: ComunicaDataFactory, bindingsFactory: BindingsFactory);
    getSelectorShape(context: IActionContext): Promise<FragmentSelectorShape>;
    queryBindings(operation: Algebra.Operation, context: IActionContext, options?: IQueryBindingsOptions): BindingsStream;
    queryQuads(operation: Algebra.Operation, context: IActionContext): AsyncIterator<RDF.Quad>;
    queryBoolean(operation: Algebra.Ask, context: IActionContext): Promise<boolean>;
    queryVoid(operation: Algebra.Update, context: IActionContext): Promise<void>;
    /**
     * Resolve a source for the given URL.
     * @param link A source link.
     * @param handledDatasets A hash of dataset identifiers that have already been handled.
     * @param context The action context.
     * @param aggregatedStore An optional aggregated store.
     */
    getSource(link: ILink, handledDatasets: Record<string, boolean>, context: IActionContext, aggregatedStore: IAggregatedStore | undefined): Promise<ISourceState>;
    /**
     * Resolve a source for the given URL.
     * This will first try to retrieve the source from cache.
     * @param link A source ILink.
     * @param handledDatasets A hash of dataset identifiers that have already been handled.
     * @param context The action context.
     * @param aggregatedStore An optional aggregated store.
     */
    protected getSourceCached(link: ILink, handledDatasets: Record<string, boolean>, context: IActionContext, aggregatedStore: IAggregatedStore | undefined): Promise<ISourceState>;
    getAggregateStore(context: IActionContext): IAggregatedStore | undefined;
    toString(): string;
}
export interface IMediatorArgs {
    mediatorDereferenceRdf: MediatorDereferenceRdf;
    mediatorMetadata: MediatorRdfMetadata;
    mediatorMetadataExtract: MediatorRdfMetadataExtract;
    mediatorMetadataAccumulate: MediatorRdfMetadataAccumulate;
    mediatorQuerySourceIdentifyHypermedia: MediatorQuerySourceIdentifyHypermedia;
    mediatorRdfResolveHypermediaLinks: MediatorRdfResolveHypermediaLinks;
    mediatorRdfResolveHypermediaLinksQueue: MediatorRdfResolveHypermediaLinksQueue;
}
