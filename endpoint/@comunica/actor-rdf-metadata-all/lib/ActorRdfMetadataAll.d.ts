import type { IActionRdfMetadata, IActorRdfMetadataArgs, IActorRdfMetadataOutput } from '@comunica/bus-rdf-metadata';
import { ActorRdfMetadata } from '@comunica/bus-rdf-metadata';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica All RDF Metadata Actor.
 */
export declare class ActorRdfMetadataAll extends ActorRdfMetadata {
    constructor(args: IActorRdfMetadataArgs);
    test(_action: IActionRdfMetadata): Promise<TestResult<IActorTest>>;
    run(action: IActionRdfMetadata): Promise<IActorRdfMetadataOutput>;
}
