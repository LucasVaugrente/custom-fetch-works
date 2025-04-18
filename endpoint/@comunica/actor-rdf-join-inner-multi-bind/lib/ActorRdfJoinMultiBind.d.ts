import type { MediatorMergeBindingsContext } from '@comunica/bus-merge-bindings-context';
import type { MediatorQueryOperation } from '@comunica/bus-query-operation';
import type { IActionRdfJoin, IActorRdfJoinOutputInner, IActorRdfJoinArgs, IActorRdfJoinTestSideData } from '@comunica/bus-rdf-join';
import { ActorRdfJoin } from '@comunica/bus-rdf-join';
import type { MediatorRdfJoinEntriesSort } from '@comunica/bus-rdf-join-entries-sort';
import type { TestResult } from '@comunica/core';
import type { IMediatorTypeJoinCoefficients } from '@comunica/mediatortype-join-coefficients';
import type { Bindings, BindingsStream, IJoinEntryWithMetadata } from '@comunica/types';
import { BindingsFactory } from '@comunica/utils-bindings-factory';
import { Factory, Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Multi-way Bind RDF Join Actor.
 */
export declare class ActorRdfJoinMultiBind extends ActorRdfJoin<IActorRdfJoinMultiBindTestSideData> {
    readonly bindOrder: BindOrder;
    readonly selectivityModifier: number;
    readonly minMaxCardinalityRatio: number;
    readonly mediatorJoinEntriesSort: MediatorRdfJoinEntriesSort;
    readonly mediatorQueryOperation: MediatorQueryOperation;
    readonly mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    constructor(args: IActorRdfJoinMultiBindArgs);
    /**
     * Create a new bindings stream that takes every binding of the base stream
     * and binds it to the remaining patterns, evaluates those patterns, and emits all their bindings.
     *
     * @param bindOrder The order in which elements should be bound.
     * @param baseStream The base stream.
     * @param operations The operations to bind with each binding of the base stream.
     * @param operationBinder A callback to retrieve the bindings stream of bound operations.
     * @param optional If the original bindings should be emitted when the resulting bindings stream is empty.
     * @return {BindingsStream}
     */
    static createBindStream(bindOrder: BindOrder, baseStream: BindingsStream, operations: Algebra.Operation[], operationBinder: (boundOperations: Algebra.Operation[], operationBindings: Bindings) => Promise<BindingsStream>, optional: boolean, algebraFactory: Factory, bindingsFactory: BindingsFactory): BindingsStream;
    getOutput(action: IActionRdfJoin, sideData: IActorRdfJoinMultiBindTestSideData): Promise<IActorRdfJoinOutputInner>;
    canBindWithOperation(operation: Algebra.Operation): boolean;
    getJoinCoefficients(action: IActionRdfJoin, sideData: IActorRdfJoinTestSideData): Promise<TestResult<IMediatorTypeJoinCoefficients, IActorRdfJoinMultiBindTestSideData>>;
}
export interface IActorRdfJoinMultiBindArgs extends IActorRdfJoinArgs<IActorRdfJoinMultiBindTestSideData> {
    /**
     * The order in which elements should be bound
     * @default {depth-first}
     */
    bindOrder: BindOrder;
    /**
     * Multiplier for selectivity values
     * @range {double}
     * @default {0.0001}
     */
    selectivityModifier: number;
    /**
     * The number of times the smallest cardinality should fit in the maximum cardinality.
     * @range {double}
     * @default {60}
     */
    minMaxCardinalityRatio: number;
    /**
     * The join entries sort mediator
     */
    mediatorJoinEntriesSort: MediatorRdfJoinEntriesSort;
    /**
     * The query operation mediator
     */
    mediatorQueryOperation: MediatorQueryOperation;
    /**
     * A mediator for creating binding context merge handlers
     */
    mediatorMergeBindingsContext: MediatorMergeBindingsContext;
}
export type BindOrder = 'depth-first' | 'breadth-first';
export interface IActorRdfJoinMultiBindTestSideData extends IActorRdfJoinTestSideData {
    entriesUnsorted: IJoinEntryWithMetadata[];
    entriesSorted: IJoinEntryWithMetadata[];
}
