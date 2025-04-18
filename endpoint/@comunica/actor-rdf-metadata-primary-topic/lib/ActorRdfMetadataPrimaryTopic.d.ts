import type { IActionRdfMetadata, IActorRdfMetadataArgs, IActorRdfMetadataOutput } from '@comunica/bus-rdf-metadata';
import { ActorRdfMetadata } from '@comunica/bus-rdf-metadata';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * An RDF Metadata Actor that splits off the metadata based on the existence of a 'foaf:primaryTopic' link.
 * Only non-triple quad streams are supported.
 */
export declare class ActorRdfMetadataPrimaryTopic extends ActorRdfMetadata {
    private readonly metadataToData;
    private readonly dataToMetadataOnInvalidMetadataGraph;
    constructor(args: IActorRdfMetadataPrimaryTopicArgs);
    test(action: IActionRdfMetadata): Promise<TestResult<IActorTest>>;
    run(action: IActionRdfMetadata): Promise<IActorRdfMetadataOutput>;
}
export interface IActorRdfMetadataPrimaryTopicArgs extends IActorRdfMetadataArgs {
    /**
     * If detected metadata triples should also be emitted as data triples
     * @default {false}
     */
    metadataToData: boolean;
    /**
     * If all data should also be seen as metadata when no metadata graph was detected
     * @default {true}
     */
    dataToMetadataOnInvalidMetadataGraph: boolean;
}
