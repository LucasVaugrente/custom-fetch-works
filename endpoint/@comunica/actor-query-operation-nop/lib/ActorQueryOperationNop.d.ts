import type { MediatorMergeBindingsContext } from '@comunica/bus-merge-bindings-context';
import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQueryOperationResult } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A [Query Operation](https://github.com/comunica/comunica/tree/master/packages/bus-query-operation)
 * actor that handles SPARQL nop operations.
 */
export declare class ActorQueryOperationNop extends ActorQueryOperationTypedMediated<Algebra.Nop> {
    readonly mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    constructor(args: IActorQueryOperationNopArgs);
    testOperation(_operation: Algebra.Nop, _context: IActionContext): Promise<TestResult<IActorTest>>;
    runOperation(operation: Algebra.Nop, context: IActionContext): Promise<IQueryOperationResult>;
}
export interface IActorQueryOperationNopArgs extends IActorQueryOperationTypedMediatedArgs {
    /**
     * A mediator for creating binding context merge handlers
     */
    mediatorMergeBindingsContext: MediatorMergeBindingsContext;
}
