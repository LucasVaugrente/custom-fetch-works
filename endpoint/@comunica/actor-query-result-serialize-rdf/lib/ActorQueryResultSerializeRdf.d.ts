import type { IActorQueryResultSerializeArgs, IActorQueryResultSerializeOutput, IActionSparqlSerialize } from '@comunica/bus-query-result-serialize';
import { ActorQueryResultSerialize } from '@comunica/bus-query-result-serialize';
import type { MediatorRdfSerializeHandle, MediatorRdfSerializeMediaTypeFormats, MediatorRdfSerializeMediaTypes } from '@comunica/bus-rdf-serialize';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext } from '@comunica/types';
/**
 * A comunica RDF Query Result Serialize Actor.
 *
 * It serializes quad streams (for example resulting from a CONSTRUCT query)
 * to an RDF syntax.
 */
export declare class ActorQueryResultSerializeRdf extends ActorQueryResultSerialize implements IActorQueryResultSerializeRdfArgs {
    readonly mediatorRdfSerialize: MediatorRdfSerializeHandle;
    readonly mediatorMediaTypeCombiner: MediatorRdfSerializeMediaTypes;
    readonly mediatorMediaTypeFormatCombiner: MediatorRdfSerializeMediaTypeFormats;
    constructor(args: IActorQueryResultSerializeRdfArgs);
    testHandle(action: IActionSparqlSerialize, mediaType: string, context: IActionContext): Promise<TestResult<IActorTest>>;
    runHandle(action: IActionSparqlSerialize, mediaType: string, context: IActionContext): Promise<IActorQueryResultSerializeOutput>;
    testMediaType(_context: IActionContext): Promise<TestResult<boolean>>;
    getMediaTypes(context: IActionContext): Promise<Record<string, number>>;
    testMediaTypeFormats(_context: IActionContext): Promise<TestResult<boolean>>;
    getMediaTypeFormats(context: IActionContext): Promise<Record<string, string>>;
}
export interface IActorQueryResultSerializeRdfArgs extends IActorQueryResultSerializeArgs {
    mediatorRdfSerialize: MediatorRdfSerializeHandle;
    mediatorMediaTypeCombiner: MediatorRdfSerializeMediaTypes;
    mediatorMediaTypeFormatCombiner: MediatorRdfSerializeMediaTypeFormats;
}
