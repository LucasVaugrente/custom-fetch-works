import type { IActionRdfJoin, IActorRdfJoinArgs, MediatorRdfJoin, IActorRdfJoinOutputInner, IActorRdfJoinTestSideData } from '@comunica/bus-rdf-join';
import { ActorRdfJoin } from '@comunica/bus-rdf-join';
import type { MediatorRdfJoinEntriesSort } from '@comunica/bus-rdf-join-entries-sort';
import type { TestResult } from '@comunica/core';
import type { IMediatorTypeJoinCoefficients } from '@comunica/mediatortype-join-coefficients';
import type { IActionContext, IJoinEntryWithMetadata } from '@comunica/types';
/**
 * A comunica Inner Multi Smallest Filter Bindings RDF Join Actor.
 */
export declare class ActorRdfJoinMultiSmallestFilterBindings extends ActorRdfJoin {
    readonly selectivityModifier: number;
    readonly blockSize: number;
    readonly mediatorJoinEntriesSort: MediatorRdfJoinEntriesSort;
    readonly mediatorJoin: MediatorRdfJoin;
    constructor(args: IActorRdfJoinMultiSmallestFilterBindingsArgs);
    /**
     * Order the given join entries using the join-entries-sort bus.
     * @param {IJoinEntryWithMetadata[]} entries An array of join entries.
     * @param context The action context.
     * @return {IJoinEntryWithMetadata[]} The sorted join entries.
     */
    sortJoinEntries(entries: IJoinEntryWithMetadata[], context: IActionContext): Promise<TestResult<{
        first: IJoinEntryWithMetadata;
        second: IJoinEntryWithMetadata;
        remaining: IJoinEntryWithMetadata[];
    }>>;
    getOutput(action: IActionRdfJoin): Promise<IActorRdfJoinOutputInner>;
    getJoinCoefficients(action: IActionRdfJoin, sideData: IActorRdfJoinTestSideData): Promise<TestResult<IMediatorTypeJoinCoefficients, IActorRdfJoinTestSideData>>;
}
export interface IActorRdfJoinMultiSmallestFilterBindingsArgs extends IActorRdfJoinArgs {
    /**
     * Multiplier for selectivity values
     * @range {double}
     * @default {0.0001}
     */
    selectivityModifier: number;
    /**
     * The maximum amount of bindings to send to the source per block.
     * @default {64}
     */
    blockSize: number;
    /**
     * The join entries sort mediator
     */
    mediatorJoinEntriesSort: MediatorRdfJoinEntriesSort;
    /**
     * A mediator for joining Bindings streams
     */
    mediatorJoin: MediatorRdfJoin;
}
