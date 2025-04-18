import type { IActionRdfMetadataExtract, IActorRdfMetadataExtractOutput, IActorRdfMetadataExtractArgs } from '@comunica/bus-rdf-metadata-extract';
import { ActorRdfMetadataExtract } from '@comunica/bus-rdf-metadata-extract';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Hydra Pagesize RDF Metadata Extract Actor.
 */
export declare class ActorRdfMetadataExtractHydraPagesize extends ActorRdfMetadataExtract {
    readonly predicates: string[];
    constructor(args: IActorRdfMetadataExtractHydraPagesizeArgs);
    test(_action: IActionRdfMetadataExtract): Promise<TestResult<IActorTest>>;
    run(action: IActionRdfMetadataExtract): Promise<IActorRdfMetadataExtractOutput>;
}
export interface IActorRdfMetadataExtractHydraPagesizeArgs extends IActorRdfMetadataExtractArgs {
    /**
     * A predicate that provides the page size
     * @default {http://www.w3.org/ns/hydra/core#itemsPerPage}
     */
    predicates: string[];
}
