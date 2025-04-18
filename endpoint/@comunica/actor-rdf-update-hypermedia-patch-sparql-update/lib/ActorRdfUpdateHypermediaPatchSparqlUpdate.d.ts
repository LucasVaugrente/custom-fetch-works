import type { MediatorHttp } from '@comunica/bus-http';
import type { IActionRdfUpdateHypermedia, IActorRdfUpdateHypermediaArgs, IActorRdfUpdateHypermediaOutput } from '@comunica/bus-rdf-update-hypermedia';
import { ActorRdfUpdateHypermedia } from '@comunica/bus-rdf-update-hypermedia';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Patch SPARQL Update RDF Update Hypermedia Actor.
 */
export declare class ActorRdfUpdateHypermediaPatchSparqlUpdate extends ActorRdfUpdateHypermedia {
    readonly mediatorHttp: MediatorHttp;
    constructor(args: IActorRdfUpdateHypermediaPatchSparqlUpdateArgs);
    testMetadata(action: IActionRdfUpdateHypermedia): Promise<TestResult<IActorTest>>;
    run(action: IActionRdfUpdateHypermedia): Promise<IActorRdfUpdateHypermediaOutput>;
}
export interface IActorRdfUpdateHypermediaPatchSparqlUpdateArgs extends IActorRdfUpdateHypermediaArgs {
    /**
     * The HTTP mediator
     */
    mediatorHttp: MediatorHttp;
}
