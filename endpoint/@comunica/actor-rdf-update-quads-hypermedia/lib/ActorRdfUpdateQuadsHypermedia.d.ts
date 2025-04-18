import type { MediatorDereferenceRdf } from '@comunica/bus-dereference-rdf';
import type { ActorHttpInvalidateListenable } from '@comunica/bus-http-invalidate';
import type { MediatorRdfMetadata } from '@comunica/bus-rdf-metadata';
import type { MediatorRdfMetadataExtract } from '@comunica/bus-rdf-metadata-extract';
import type { MediatorRdfUpdateHypermedia } from '@comunica/bus-rdf-update-hypermedia';
import { ActorRdfUpdateQuadsDestination } from '@comunica/bus-rdf-update-quads';
import type { IActionRdfUpdateQuads, IQuadDestination, IActorRdfUpdateQuadsArgs } from '@comunica/bus-rdf-update-quads';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext } from '@comunica/types';
import { LRUCache } from 'lru-cache';
/**
 * A comunica Hypermedia RDF Update Quads Actor.
 */
export declare class ActorRdfUpdateQuadsHypermedia extends ActorRdfUpdateQuadsDestination {
    readonly mediatorDereferenceRdf: MediatorDereferenceRdf;
    readonly mediatorMetadata: MediatorRdfMetadata;
    readonly mediatorMetadataExtract: MediatorRdfMetadataExtract;
    readonly mediatorRdfUpdateHypermedia: MediatorRdfUpdateHypermedia;
    readonly cacheSize: number;
    readonly cache?: LRUCache<string, Promise<IQuadDestination>>;
    readonly httpInvalidator: ActorHttpInvalidateListenable;
    constructor(args: IActorRdfUpdateQuadsHypermediaArgs);
    test(action: IActionRdfUpdateQuads): Promise<TestResult<IActorTest>>;
    getDestination(context: IActionContext): Promise<IQuadDestination>;
}
export interface IActorRdfUpdateQuadsHypermediaArgs extends IActorRdfUpdateQuadsArgs {
    /**
     * The maximum number of entries in the LRU cache, set to 0 to disable.
     * @range {integer}
     * @default {100}
     */
    cacheSize: number;
    /**
     * An actor that listens to HTTP invalidation events
     * @default {<default_invalidator> a <npmd:@comunica/bus-http-invalidate/^4.0.0/components/ActorHttpInvalidateListenable.jsonld#ActorHttpInvalidateListenable>}
     */
    httpInvalidator: ActorHttpInvalidateListenable;
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
     * The hypermedia resolver
     */
    mediatorRdfUpdateHypermedia: MediatorRdfUpdateHypermedia;
}
