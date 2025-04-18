import type { IActionRdfJoin, IActorRdfJoinOutputInner, IActorRdfJoinArgs, IActorRdfJoinTestSideData } from '@comunica/bus-rdf-join';
import { ActorRdfJoin } from '@comunica/bus-rdf-join';
import type { TestResult } from '@comunica/core';
import type { IMediatorTypeJoinCoefficients } from '@comunica/mediatortype-join-coefficients';
/**
 * A comunica NestedLoop RDF Join Actor.
 */
export declare class ActorRdfJoinNestedLoop extends ActorRdfJoin {
    constructor(args: IActorRdfJoinArgs);
    protected getOutput(action: IActionRdfJoin): Promise<IActorRdfJoinOutputInner>;
    protected getJoinCoefficients(action: IActionRdfJoin, sideData: IActorRdfJoinTestSideData): Promise<TestResult<IMediatorTypeJoinCoefficients, IActorRdfJoinTestSideData>>;
}
