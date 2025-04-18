import type { ActionIteratorTransform, IActionIteratorTransformBindings, IActionIteratorTransformQuads, IActorIteratorTransformArgs, ITransformIteratorOutput } from '@comunica/bus-iterator-transform';
import { ActorIteratorTransform } from '@comunica/bus-iterator-transform';
import type { IActorTest, TestResult } from '@comunica/core';
import type { MetadataBindings, MetadataQuads } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { AsyncIterator } from 'asynciterator';
/**
 * A comunica Record Intermediate Results Iterator Transform Actor.
 * This actor updates the intermediate result statistic when an intermediate result is produced.
 */
export declare class ActorIteratorTransformRecordIntermediateResults extends ActorIteratorTransform {
    constructor(args: IActorIteratorTransformArgs);
    transformIteratorBindings(action: IActionIteratorTransformBindings): Promise<ITransformIteratorOutput<AsyncIterator<RDF.Bindings>, MetadataBindings>>;
    transformIteratorQuads(action: IActionIteratorTransformQuads): Promise<ITransformIteratorOutput<AsyncIterator<RDF.Quad>, MetadataQuads>>;
    testIteratorTransform(_action: ActionIteratorTransform): Promise<TestResult<IActorTest>>;
}
