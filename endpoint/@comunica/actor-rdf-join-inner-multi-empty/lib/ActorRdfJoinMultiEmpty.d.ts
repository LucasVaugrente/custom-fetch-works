import type { IActionRdfJoin, IActorRdfJoinOutputInner, IActorRdfJoinArgs, IActorRdfJoinTestSideData } from '@comunica/bus-rdf-join';
import { ActorRdfJoin } from '@comunica/bus-rdf-join';
import type { TestResult } from '@comunica/core';
import type { IMediatorTypeJoinCoefficients } from '@comunica/mediatortype-join-coefficients';
/**
 * A comunica Multi Empty RDF Join Actor.
 */
export declare class ActorRdfJoinMultiEmpty extends ActorRdfJoin {
    constructor(args: IActorRdfJoinArgs);
    test(action: IActionRdfJoin): Promise<TestResult<IMediatorTypeJoinCoefficients, IActorRdfJoinTestSideData>>;
    protected getOutput(action: IActionRdfJoin): Promise<IActorRdfJoinOutputInner>;
    protected getJoinCoefficients(action: IActionRdfJoin, sideData: IActorRdfJoinTestSideData): Promise<TestResult<IMediatorTypeJoinCoefficients, IActorRdfJoinTestSideData>>;
}
