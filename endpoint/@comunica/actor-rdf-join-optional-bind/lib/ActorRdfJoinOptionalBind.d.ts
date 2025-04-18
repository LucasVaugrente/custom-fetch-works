import type { BindOrder } from '@comunica/actor-rdf-join-inner-multi-bind';
import type { MediatorMergeBindingsContext } from '@comunica/bus-merge-bindings-context';
import type { MediatorQueryOperation } from '@comunica/bus-query-operation';
import type { IActionRdfJoin, IActorRdfJoinOutputInner, IActorRdfJoinArgs, IActorRdfJoinTestSideData } from '@comunica/bus-rdf-join';
import { ActorRdfJoin } from '@comunica/bus-rdf-join';
import type { TestResult } from '@comunica/core';
import type { IMediatorTypeJoinCoefficients } from '@comunica/mediatortype-join-coefficients';
/**
 * A comunica Optional Bind RDF Join Actor.
 */
export declare class ActorRdfJoinOptionalBind extends ActorRdfJoin {
    readonly bindOrder: BindOrder;
    readonly selectivityModifier: number;
    readonly mediatorQueryOperation: MediatorQueryOperation;
    readonly mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    constructor(args: IActorRdfJoinOptionalBindArgs);
    protected getOutput(action: IActionRdfJoin): Promise<IActorRdfJoinOutputInner>;
    getJoinCoefficients(action: IActionRdfJoin, sideData: IActorRdfJoinTestSideData): Promise<TestResult<IMediatorTypeJoinCoefficients, IActorRdfJoinTestSideData>>;
}
export interface IActorRdfJoinOptionalBindArgs extends IActorRdfJoinArgs {
    /**
     * The order in which elements should be bound
     * @default {depth-first}
     */
    bindOrder: BindOrder;
    /**
     * Multiplier for selectivity values
     * @range {double}
     * @default {0.000001}
     */
    selectivityModifier: number;
    /**
     * The query operation mediator
     */
    mediatorQueryOperation: MediatorQueryOperation;
    /**
     * A mediator for creating binding context merge handlers
     */
    mediatorMergeBindingsContext: MediatorMergeBindingsContext;
}
