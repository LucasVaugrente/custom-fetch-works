import type { MediatorDereferenceRdf } from '@comunica/bus-dereference-rdf';
import type { MediatorMergeBindingsContext } from '@comunica/bus-merge-bindings-context';
import type { IActionQuerySourceIdentifyHypermedia, IActorQuerySourceIdentifyHypermediaOutput, IActorQuerySourceIdentifyHypermediaArgs, IActorQuerySourceIdentifyHypermediaTest } from '@comunica/bus-query-source-identify-hypermedia';
import { ActorQuerySourceIdentifyHypermedia } from '@comunica/bus-query-source-identify-hypermedia';
import type { MediatorRdfMetadata } from '@comunica/bus-rdf-metadata';
import type { MediatorRdfMetadataExtract } from '@comunica/bus-rdf-metadata-extract';
import type { TestResult } from '@comunica/core';
import type { IActionContext } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import { QuerySourceQpf } from './QuerySourceQpf';
/**
 * A comunica QPF Query Source Identify Hypermedia Actor.
 */
export declare class ActorQuerySourceIdentifyHypermediaQpf extends ActorQuerySourceIdentifyHypermedia implements IActorQuerySourceIdentifyHypermediaQpfArgs {
    readonly mediatorMetadata: MediatorRdfMetadata;
    readonly mediatorMetadataExtract: MediatorRdfMetadataExtract;
    readonly mediatorDereferenceRdf: MediatorDereferenceRdf;
    readonly mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    readonly subjectUri: string;
    readonly predicateUri: string;
    readonly objectUri: string;
    readonly graphUri?: string;
    constructor(args: IActorQuerySourceIdentifyHypermediaQpfArgs);
    test(action: IActionQuerySourceIdentifyHypermedia): Promise<TestResult<IActorQuerySourceIdentifyHypermediaTest>>;
    testMetadata(action: IActionQuerySourceIdentifyHypermedia): Promise<TestResult<IActorQuerySourceIdentifyHypermediaTest>>;
    /**
     * Look for the search form
     * @param {IActionRdfResolveHypermedia} action the metadata to look for the form.
     * @return {Promise<IActorRdfResolveHypermediaOutput>} A promise resolving to a hypermedia form.
     */
    run(action: IActionQuerySourceIdentifyHypermedia): Promise<IActorQuerySourceIdentifyHypermediaOutput>;
    protected createSource(url: string, metadata: Record<string, any>, context: IActionContext, bindingsRestricted: boolean, quads?: RDF.Stream): Promise<QuerySourceQpf>;
}
export interface IActorQuerySourceIdentifyHypermediaQpfArgs extends IActorQuerySourceIdentifyHypermediaArgs {
    /**
     * The metadata mediator
     */
    mediatorMetadata: MediatorRdfMetadata;
    /**
     * The metadata extract mediator
     */
    mediatorMetadataExtract: MediatorRdfMetadataExtract;
    /**
     * The RDF dereference mediator
     */
    mediatorDereferenceRdf: MediatorDereferenceRdf;
    /**
     * A mediator for creating binding context merge handlers
     */
    mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    /**
     * The URI that should be interpreted as subject URI
     * @default {http://www.w3.org/1999/02/22-rdf-syntax-ns#subject}
     */
    subjectUri: string;
    /**
     * The URI that should be interpreted as predicate URI
     * @default {http://www.w3.org/1999/02/22-rdf-syntax-ns#predicate}
     */
    predicateUri: string;
    /**
     * The URI that should be interpreted as object URI
     * @default {http://www.w3.org/1999/02/22-rdf-syntax-ns#object}
     */
    objectUri: string;
    /**
     * The URI that should be interpreted as graph URI
     * @default {http://www.w3.org/ns/sparql-service-description#graph}
     */
    graphUri?: string;
}
