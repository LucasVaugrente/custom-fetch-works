import type { IActionRdfUpdateQuads, IActorRdfUpdateQuadsArgs, IQuadDestination } from '@comunica/bus-rdf-update-quads';
import { ActorRdfUpdateQuadsDestination } from '@comunica/bus-rdf-update-quads';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext } from '@comunica/types';
/**
 * A comunica RDFJS Store RDF Update Quads Actor.
 */
export declare class ActorRdfUpdateQuadsRdfJsStore extends ActorRdfUpdateQuadsDestination {
    constructor(args: IActorRdfUpdateQuadsArgs);
    test(action: IActionRdfUpdateQuads): Promise<TestResult<IActorTest>>;
    protected getDestination(context: IActionContext): Promise<IQuadDestination>;
}
