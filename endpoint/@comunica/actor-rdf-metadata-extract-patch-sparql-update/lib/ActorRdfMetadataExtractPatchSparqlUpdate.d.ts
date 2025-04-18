import type { IActionRdfMetadataExtract, IActorRdfMetadataExtractOutput, IActorRdfMetadataExtractArgs } from '@comunica/bus-rdf-metadata-extract';
import { ActorRdfMetadataExtract } from '@comunica/bus-rdf-metadata-extract';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Patch SPARQL Update RDF Metadata Extract Actor.
 */
export declare class ActorRdfMetadataExtractPatchSparqlUpdate extends ActorRdfMetadataExtract {
    constructor(args: IActorRdfMetadataExtractArgs);
    test(_action: IActionRdfMetadataExtract): Promise<TestResult<IActorTest>>;
    run(action: IActionRdfMetadataExtract): Promise<IActorRdfMetadataExtractOutput>;
}
