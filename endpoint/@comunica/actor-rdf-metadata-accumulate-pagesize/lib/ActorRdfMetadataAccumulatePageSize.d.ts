import type { IActionRdfMetadataAccumulate, IActorRdfMetadataAccumulateOutput, IActorRdfMetadataAccumulateArgs } from '@comunica/bus-rdf-metadata-accumulate';
import { ActorRdfMetadataAccumulate } from '@comunica/bus-rdf-metadata-accumulate';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica PageSize RDF Metadata Accumulate Actor.
 */
export declare class ActorRdfMetadataAccumulatePageSize extends ActorRdfMetadataAccumulate {
    constructor(args: IActorRdfMetadataAccumulateArgs);
    test(_action: IActionRdfMetadataAccumulate): Promise<TestResult<IActorTest>>;
    run(action: IActionRdfMetadataAccumulate): Promise<IActorRdfMetadataAccumulateOutput>;
}
