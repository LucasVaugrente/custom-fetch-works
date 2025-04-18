import type { MediatorHttp } from '@comunica/bus-http';
import type { IActionRdfUpdateHypermedia, IActorRdfUpdateHypermediaOutput, IActorRdfUpdateHypermediaArgs } from '@comunica/bus-rdf-update-hypermedia';
import { ActorRdfUpdateHypermedia } from '@comunica/bus-rdf-update-hypermedia';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica SPARQL RDF Update Hypermedia Actor.
 */
export declare class ActorRdfUpdateHypermediaSparql extends ActorRdfUpdateHypermedia {
    readonly mediatorHttp: MediatorHttp;
    readonly checkUrlSuffixSparql: boolean;
    readonly checkUrlSuffixUpdate: boolean;
    constructor(args: IActorRdfUpdateHypermediaSparqlArgs);
    testMetadata(action: IActionRdfUpdateHypermedia): Promise<TestResult<IActorTest>>;
    run(action: IActionRdfUpdateHypermedia): Promise<IActorRdfUpdateHypermediaOutput>;
}
export interface IActorRdfUpdateHypermediaSparqlArgs extends IActorRdfUpdateHypermediaArgs {
    /**
     * The HTTP mediator
     */
    mediatorHttp: MediatorHttp;
    /**
     * If URLs ending with '/sparql' should also be considered SPARQL endpoints.
     * @default {true}
     */
    checkUrlSuffixSparql: boolean;
    /**
     * If URLs ending with '/update' should also be considered SPARQL endpoints.
     * @default {true}
     */
    checkUrlSuffixUpdate: boolean;
}
