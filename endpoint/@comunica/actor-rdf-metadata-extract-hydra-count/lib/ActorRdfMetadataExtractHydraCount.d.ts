import type { IActionRdfMetadataExtract, IActorRdfMetadataExtractOutput, IActorRdfMetadataExtractArgs } from '@comunica/bus-rdf-metadata-extract';
import { ActorRdfMetadataExtract } from '@comunica/bus-rdf-metadata-extract';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * An RDF Metadata Extract Actor that extracts total items counts from a metadata stream based on the given predicates.
 */
export declare class ActorRdfMetadataExtractHydraCount extends ActorRdfMetadataExtract implements IActorRdfParseFixedMediaTypesArgs {
    readonly predicates: string[];
    constructor(args: IActorRdfParseFixedMediaTypesArgs);
    test(_action: IActionRdfMetadataExtract): Promise<TestResult<IActorTest>>;
    run(action: IActionRdfMetadataExtract): Promise<IActorRdfMetadataExtractOutput>;
}
export interface IActorRdfParseFixedMediaTypesArgs extends IActorRdfMetadataExtractArgs {
    /**
     * A predicate that provides a count estimate
     * @default {http://www.w3.org/ns/hydra/core#totalItems}
     * @default {http://rdfs.org/ns/void#triples}
     */
    predicates: string[];
}
