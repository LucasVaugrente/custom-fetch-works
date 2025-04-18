import type { IActionRdfMetadataExtract, IActorRdfMetadataExtractArgs, IActorRdfMetadataExtractOutput } from '@comunica/bus-rdf-metadata-extract';
import { ActorRdfMetadataExtract } from '@comunica/bus-rdf-metadata-extract';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Allow HTTP Methods RDF Metadata Extract Actor.
 */
export declare class ActorRdfMetadataExtractAllowHttpMethods extends ActorRdfMetadataExtract {
    constructor(args: IActorRdfMetadataExtractArgs);
    test(_action: IActionRdfMetadataExtract): Promise<TestResult<IActorTest>>;
    run(action: IActionRdfMetadataExtract): Promise<IActorRdfMetadataExtractOutput>;
}
