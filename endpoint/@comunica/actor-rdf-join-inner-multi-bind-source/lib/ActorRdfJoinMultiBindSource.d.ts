import type { IActionRdfJoin, IActorRdfJoinArgs, IActorRdfJoinOutputInner, IActorRdfJoinTestSideData } from '@comunica/bus-rdf-join';
import { ActorRdfJoin } from '@comunica/bus-rdf-join';
import type { MediatorRdfJoinEntriesSort } from '@comunica/bus-rdf-join-entries-sort';
import type { TestResult } from '@comunica/core';
import type { IMediatorTypeJoinCoefficients } from '@comunica/mediatortype-join-coefficients';
import type { IJoinEntryWithMetadata, IActionContext } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
import { Factory } from 'sparqlalgebrajs';
/**
 * A comunica Inner Multi Bind Source RDF Join Actor.
 */
export declare class ActorRdfJoinMultiBindSource extends ActorRdfJoin<IActorRdfJoinMultiBindSourceTestSideData> {
    readonly selectivityModifier: number;
    readonly blockSize: number;
    readonly mediatorJoinEntriesSort: MediatorRdfJoinEntriesSort;
    constructor(args: IActorRdfJoinInnerMultiBindSourceArgs);
    getOutput(action: IActionRdfJoin, sideData: IActorRdfJoinMultiBindSourceTestSideData): Promise<IActorRdfJoinOutputInner>;
    protected sortJoinEntries(entries: IJoinEntryWithMetadata[], context: IActionContext): Promise<TestResult<IJoinEntryWithMetadata[]>>;
    getJoinCoefficients(action: IActionRdfJoin, sideData: IActorRdfJoinTestSideData): Promise<TestResult<IMediatorTypeJoinCoefficients, IActorRdfJoinMultiBindSourceTestSideData>>;
    createOperationFromEntries(algebraFactory: Factory, remainingEntries: IJoinEntryWithMetadata[]): Algebra.Operation;
}
export interface IActorRdfJoinInnerMultiBindSourceArgs extends IActorRdfJoinArgs<IActorRdfJoinMultiBindSourceTestSideData> {
    /**
     * Multiplier for selectivity values
     * @range {double}
     * @default {0.0001}
     */
    selectivityModifier: number;
    /**
     * The maximum amount of bindings to send to the source per block.
     * @default {16}
     */
    blockSize: number;
    /**
     * The join entries sort mediator
     */
    mediatorJoinEntriesSort: MediatorRdfJoinEntriesSort;
}
export interface IActorRdfJoinMultiBindSourceTestSideData extends IActorRdfJoinTestSideData {
    entriesUnsorted: IJoinEntryWithMetadata[];
    entriesSorted: IJoinEntryWithMetadata[];
}
