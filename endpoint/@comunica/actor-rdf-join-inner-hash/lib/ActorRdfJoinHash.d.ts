import type { MediatorHashBindings } from '@comunica/bus-hash-bindings';
import type { IActionRdfJoin, IActorRdfJoinOutputInner, IActorRdfJoinArgs, IActorRdfJoinTestSideData } from '@comunica/bus-rdf-join';
import { ActorRdfJoin } from '@comunica/bus-rdf-join';
import type { TestResult } from '@comunica/core';
import type { IMediatorTypeJoinCoefficients } from '@comunica/mediatortype-join-coefficients';
import type { IJoinEntry } from '@comunica/types';
/**
 * A comunica Hash RDF Join Actor.
 */
export declare class ActorRdfJoinHash extends ActorRdfJoin<IActorRdfJoinHashTestSideData> {
    readonly mediatorHashBindings: MediatorHashBindings;
    constructor(args: IActorRdfJoinHashArgs);
    getOutput(action: IActionRdfJoin, sideData: IActorRdfJoinHashTestSideData): Promise<IActorRdfJoinOutputInner>;
    protected getJoinCoefficients(action: IActionRdfJoin, sideData: IActorRdfJoinTestSideData): Promise<TestResult<IMediatorTypeJoinCoefficients, IActorRdfJoinHashTestSideData>>;
}
export interface IActorRdfJoinHashArgs extends IActorRdfJoinArgs<IActorRdfJoinHashTestSideData> {
    /**
     * The mediator for hashing bindings.
     */
    mediatorHashBindings: MediatorHashBindings;
    /**
     * If this actor can handle undefined values.
     * If false, performance will be slightly better.
     */
    canHandleUndefs: boolean;
}
export interface IActorRdfJoinHashTestSideData extends IActorRdfJoinTestSideData {
    entriesSorted: IJoinEntry[];
}
