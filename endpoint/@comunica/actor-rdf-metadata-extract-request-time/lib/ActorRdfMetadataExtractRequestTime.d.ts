import type { IActionRdfMetadataExtract, IActorRdfMetadataExtractOutput, IActorRdfMetadataExtractArgs } from '@comunica/bus-rdf-metadata-extract';
import { ActorRdfMetadataExtract } from '@comunica/bus-rdf-metadata-extract';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Request Time RDF Metadata Extract Actor.
 */
export declare class ActorRdfMetadataExtractRequestTime extends ActorRdfMetadataExtract {
    constructor(args: IActorRdfMetadataExtractArgs);
    test(_action: IActionRdfMetadataExtract): Promise<TestResult<IActorTest>>;
    run(action: IActionRdfMetadataExtract): Promise<IActorRdfMetadataExtractOutput>;
}
