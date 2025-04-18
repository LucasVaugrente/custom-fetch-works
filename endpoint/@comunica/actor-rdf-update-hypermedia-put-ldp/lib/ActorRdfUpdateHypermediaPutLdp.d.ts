import type { MediatorHttp } from '@comunica/bus-http';
import type { MediatorRdfSerializeHandle, MediatorRdfSerializeMediaTypes } from '@comunica/bus-rdf-serialize';
import type { IActionRdfUpdateHypermedia, IActorRdfUpdateHypermediaOutput, IActorRdfUpdateHypermediaArgs } from '@comunica/bus-rdf-update-hypermedia';
import { ActorRdfUpdateHypermedia } from '@comunica/bus-rdf-update-hypermedia';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Post LDP RDF Update Hypermedia Actor.
 */
export declare class ActorRdfUpdateHypermediaPutLdp extends ActorRdfUpdateHypermedia {
    readonly mediatorHttp: MediatorHttp;
    readonly mediatorRdfSerializeMediatypes: MediatorRdfSerializeMediaTypes;
    readonly mediatorRdfSerialize: MediatorRdfSerializeHandle;
    constructor(args: IActorRdfUpdateHypermediaPostLdpArgs);
    testMetadata(action: IActionRdfUpdateHypermedia): Promise<TestResult<IActorTest>>;
    run(action: IActionRdfUpdateHypermedia): Promise<IActorRdfUpdateHypermediaOutput>;
}
export interface IActorRdfUpdateHypermediaPostLdpArgs extends IActorRdfUpdateHypermediaArgs {
    /**
     * The HTTP mediator
     */
    mediatorHttp: MediatorHttp;
    /**
     * The RDF Serialize mediator for collecting media types
     */
    mediatorRdfSerializeMediatypes: MediatorRdfSerializeMediaTypes;
    /**
     * The RDF Serialize mediator for handling serialization
     */
    mediatorRdfSerialize: MediatorRdfSerializeHandle;
}
