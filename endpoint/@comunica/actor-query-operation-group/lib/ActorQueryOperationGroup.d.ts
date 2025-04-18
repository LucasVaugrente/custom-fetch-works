import type { MediatorBindingsAggregatorFactory } from '@comunica/bus-bindings-aggregator-factory';
import type { MediatorMergeBindingsContext } from '@comunica/bus-merge-bindings-context';
import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQueryOperationResult } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Group Query Operation Actor.
 */
export declare class ActorQueryOperationGroup extends ActorQueryOperationTypedMediated<Algebra.Group> {
    readonly mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    private readonly mediatorBindingsAggregatorFactory;
    constructor(args: IActorQueryOperationGroupArgs);
    testOperation(): Promise<TestResult<IActorTest>>;
    runOperation(operation: Algebra.Group, context: IActionContext): Promise<IQueryOperationResult>;
}
export interface IActorQueryOperationGroupArgs extends IActorQueryOperationTypedMediatedArgs {
    /**
     * A mediator for creating binding context merge handlers
     */
    mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    mediatorBindingsAggregatorFactory: MediatorBindingsAggregatorFactory;
}
