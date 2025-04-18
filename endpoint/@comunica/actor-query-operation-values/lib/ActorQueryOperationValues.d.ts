import type { MediatorMergeBindingsContext } from '@comunica/bus-merge-bindings-context';
import type { IActionQueryOperation } from '@comunica/bus-query-operation';
import { ActorQueryOperationTyped } from '@comunica/bus-query-operation';
import type { IActorArgs, IActorTest, TestResult } from '@comunica/core';
import type { IQueryOperationResult, IActionContext } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Values Query Operation Actor.
 */
export declare class ActorQueryOperationValues extends ActorQueryOperationTyped<Algebra.Values> {
    readonly mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    constructor(args: IActorQueryOperationUpdateDeleteInsertArgs);
    testOperation(_operation: Algebra.Values, _context: IActionContext): Promise<TestResult<IActorTest>>;
    runOperation(operation: Algebra.Values, context: IActionContext): Promise<IQueryOperationResult>;
}
export interface IActorQueryOperationUpdateDeleteInsertArgs extends IActorArgs<IActionQueryOperation, IActorTest, IQueryOperationResult> {
    /**
     * A mediator for creating binding context merge handlers
     */
    mediatorMergeBindingsContext: MediatorMergeBindingsContext;
}
