import type { MediatorDereferenceRdf } from '@comunica/bus-dereference-rdf';
import type { MediatorMergeBindingsContext } from '@comunica/bus-merge-bindings-context';
import { ActorQuerySourceIdentify } from '@comunica/bus-query-source-identify';
import type { IActionQuerySourceIdentify, IActorQuerySourceIdentifyOutput, IActorQuerySourceIdentifyArgs } from '@comunica/bus-query-source-identify';
import type { MediatorQuerySourceIdentifyHypermedia } from '@comunica/bus-query-source-identify-hypermedia';
import type { MediatorRdfMetadata } from '@comunica/bus-rdf-metadata';
import type { MediatorRdfMetadataAccumulate } from '@comunica/bus-rdf-metadata-accumulate';
import type { MediatorRdfMetadataExtract } from '@comunica/bus-rdf-metadata-extract';
import type { MediatorRdfResolveHypermediaLinks } from '@comunica/bus-rdf-resolve-hypermedia-links';
import type { MediatorRdfResolveHypermediaLinksQueue } from '@comunica/bus-rdf-resolve-hypermedia-links-queue';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Hypermedia Query Source Identify Actor.
 */
export declare class ActorQuerySourceIdentifyHypermedia extends ActorQuerySourceIdentify {
    readonly mediatorDereferenceRdf: MediatorDereferenceRdf;
    readonly mediatorMetadata: MediatorRdfMetadata;
    readonly mediatorMetadataExtract: MediatorRdfMetadataExtract;
    readonly mediatorMetadataAccumulate: MediatorRdfMetadataAccumulate;
    readonly mediatorQuerySourceIdentifyHypermedia: MediatorQuerySourceIdentifyHypermedia;
    readonly mediatorRdfResolveHypermediaLinks: MediatorRdfResolveHypermediaLinks;
    readonly mediatorRdfResolveHypermediaLinksQueue: MediatorRdfResolveHypermediaLinksQueue;
    readonly mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    readonly cacheSize: number;
    readonly maxIterators: number;
    readonly aggregateTraversalStore: boolean;
    constructor(args: IActorQuerySourceIdentifyHypermediaArgs);
    test(action: IActionQuerySourceIdentify): Promise<TestResult<IActorTest>>;
    run(action: IActionQuerySourceIdentify): Promise<IActorQuerySourceIdentifyOutput>;
}
export interface IActorQuerySourceIdentifyHypermediaArgs extends IActorQuerySourceIdentifyArgs {
    /**
     * The maximum number of entries in the LRU cache, set to 0 to disable.
     * @range {integer}
     * @default {100}
     */
    cacheSize: number;
    /**
     * The maximum number of links that can be followed in parallel.
     * @default {64}
     */
    maxIterators: number;
    /**
     * If all discovered quads across all links from a traversal source should be indexed in an aggregated store,
     * to speed up later calls.
     * This only applies to sources annotated with KeysQuerySourceIdentify.traverse.
     * @default {true}
     */
    aggregateTraversalStore: boolean;
    /**
     * The RDF dereference mediator
     */
    mediatorDereferenceRdf: MediatorDereferenceRdf;
    /**
     * The metadata mediator
     */
    mediatorMetadata: MediatorRdfMetadata;
    /**
     * The metadata extract mediator
     */
    mediatorMetadataExtract: MediatorRdfMetadataExtract;
    /**
     * The metadata accumulate mediator
     */
    mediatorMetadataAccumulate?: MediatorRdfMetadataAccumulate;
    /**
     * The hypermedia resolve mediator
     */
    mediatorQuerySourceIdentifyHypermedia: MediatorQuerySourceIdentifyHypermedia;
    /**
     * The hypermedia links resolve mediator
     */
    mediatorRdfResolveHypermediaLinks: MediatorRdfResolveHypermediaLinks;
    /**
     * The hypermedia links queue resolve mediator
     */
    mediatorRdfResolveHypermediaLinksQueue: MediatorRdfResolveHypermediaLinksQueue;
    /**
     * A mediator for creating binding context merge handlers
     */
    mediatorMergeBindingsContext: MediatorMergeBindingsContext;
}
