import type { IActionRdfJoin, IActorRdfJoinOutputInner, IActorRdfJoinArgs, MediatorRdfJoin, IActorRdfJoinTestSideData } from '@comunica/bus-rdf-join';
import { ActorRdfJoin } from '@comunica/bus-rdf-join';
import type { TestResult } from '@comunica/core';
import type { IMediatorTypeJoinCoefficients } from '@comunica/mediatortype-join-coefficients';
/**
 * A comunica Optional Opt+ RDF Join Actor.
 */
export declare class ActorRdfJoinOptionalOptPlus extends ActorRdfJoin {
    readonly mediatorJoin: MediatorRdfJoin;
    constructor(args: IActorRdfJoinOptionalOptPlusJoinArgs);
    getOutput({ entries, context }: IActionRdfJoin): Promise<IActorRdfJoinOutputInner>;
    protected getJoinCoefficients(action: IActionRdfJoin, sideData: IActorRdfJoinTestSideData): Promise<TestResult<IMediatorTypeJoinCoefficients, IActorRdfJoinTestSideData>>;
}
export interface IActorRdfJoinOptionalOptPlusJoinArgs extends IActorRdfJoinArgs {
    /**
     * A mediator for joining Bindings streams
     */
    mediatorJoin: MediatorRdfJoin;
}
