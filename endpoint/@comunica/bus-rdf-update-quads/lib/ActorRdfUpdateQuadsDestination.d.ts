import type { IActorTest, TestResult } from '@comunica/core';
import type { ComunicaDataFactory, IActionContext } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { AsyncIterator } from 'asynciterator';
import type { IActionRdfUpdateQuads, IActorRdfUpdateQuadsOutput } from './ActorRdfUpdateQuads';
import { ActorRdfUpdateQuads } from './ActorRdfUpdateQuads';
import type { IQuadDestination } from './IQuadDestination';
export declare function deskolemizeStream(dataFactory: ComunicaDataFactory, stream: AsyncIterator<RDF.Quad> | undefined, id: string): AsyncIterator<RDF.Quad> | undefined;
export declare function deskolemize(action: IActionRdfUpdateQuads): IActionRdfUpdateQuads;
/**
 * A base implementation for rdf-update-quads events
 * that wraps around an {@link IQuadDestination}.
 *
 * @see IQuadDestination
 */
export declare abstract class ActorRdfUpdateQuadsDestination extends ActorRdfUpdateQuads {
    test(_action: IActionRdfUpdateQuads): Promise<TestResult<IActorTest>>;
    run(action: IActionRdfUpdateQuads): Promise<IActorRdfUpdateQuadsOutput>;
    /**
     * Get the output of the given action on a destination.
     * @param {IQuadDestination} destination A quad destination, possibly lazy.
     * @param {IActionRdfUpdateQuads} action The action.
     */
    protected getOutput(destination: IQuadDestination, action: IActionRdfUpdateQuads): Promise<IActorRdfUpdateQuadsOutput>;
    /**
     * Get a destination instance for the given context.
     * @param {ActionContext} context Optional context data.
     * @return {Promise<IQuadDestination>} A promise that resolves to a destination.
     */
    protected abstract getDestination(context: IActionContext): Promise<IQuadDestination>;
}
