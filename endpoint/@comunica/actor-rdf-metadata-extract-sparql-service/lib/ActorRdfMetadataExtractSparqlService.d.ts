import type { IActionRdfMetadataExtract, IActorRdfMetadataExtractOutput, IActorRdfMetadataExtractArgs } from '@comunica/bus-rdf-metadata-extract';
import { ActorRdfMetadataExtract } from '@comunica/bus-rdf-metadata-extract';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * Comunica RDF metadata extract actor for SPARQL Service Descriptions.
 */
export declare class ActorRdfMetadataExtractSparqlService extends ActorRdfMetadataExtract {
    private readonly inferHttpsEndpoint;
    constructor(args: IActorRdfMetadataExtractSparqlServiceArgs);
    test(_action: IActionRdfMetadataExtract): Promise<TestResult<IActorTest>>;
    run(action: IActionRdfMetadataExtract): Promise<IActorRdfMetadataExtractOutput>;
}
export interface IActorRdfMetadataExtractSparqlServiceArgs extends IActorRdfMetadataExtractArgs {
    /**
     * If HTTPS endpoints should be forcefully used if the original URL was HTTPS-based
     * @default {true}
     */
    inferHttpsEndpoint: boolean;
}
