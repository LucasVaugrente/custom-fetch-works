import type { IActionRdfJoin, IActorRdfJoinOutputInner, IActorRdfJoinArgs, MediatorRdfJoin, IActorRdfJoinTestSideData } from '@comunica/bus-rdf-join';
import { ActorRdfJoin } from '@comunica/bus-rdf-join';
import type { MediatorRdfJoinEntriesSort } from '@comunica/bus-rdf-join-entries-sort';
import type { TestResult } from '@comunica/core';
import type { IMediatorTypeJoinCoefficients } from '@comunica/mediatortype-join-coefficients';
import type { IActionContext, IJoinEntryWithMetadata } from '@comunica/types';
/**
 * A Multi Smallest RDF Join Actor.
 * It accepts 3 or more streams, joins the smallest two, and joins the result with the remaining streams.
 */
export declare class ActorRdfJoinMultiSmallest extends ActorRdfJoin<IActorRdfJoinMultiSmallestTestSideData> {
    readonly mediatorJoinEntriesSort: MediatorRdfJoinEntriesSort;
    readonly mediatorJoin: MediatorRdfJoin;
    constructor(args: IActorRdfJoinMultiSmallestArgs);
    /**
     * Order the given join entries using the join-entries-sort bus.
     * @param {IJoinEntryWithMetadata[]} entries An array of join entries.
     * @param context The action context.
     * @return {IJoinEntryWithMetadata[]} The sorted join entries.
     */
    sortJoinEntries(entries: IJoinEntryWithMetadata[], context: IActionContext): Promise<IJoinEntryWithMetadata[]>;
    protected getOutput(action: IActionRdfJoin, sideData: IActorRdfJoinMultiSmallestTestSideData): Promise<IActorRdfJoinOutputInner>;
    protected getJoinCoefficients(action: IActionRdfJoin, sideData: IActorRdfJoinTestSideData): Promise<TestResult<IMediatorTypeJoinCoefficients, IActorRdfJoinMultiSmallestTestSideData>>;
}
export interface IActorRdfJoinMultiSmallestArgs extends IActorRdfJoinArgs<IActorRdfJoinMultiSmallestTestSideData> {
    /**
     * The join entries sort mediator
     */
    mediatorJoinEntriesSort: MediatorRdfJoinEntriesSort;
    /**
     * A mediator for joining Bindings streams
     */
    mediatorJoin: MediatorRdfJoin;
}
export interface IActorRdfJoinMultiSmallestTestSideData extends IActorRdfJoinTestSideData {
    sortedEntries: IJoinEntryWithMetadata[];
}
