import { ActorAbstractPath } from '@comunica/actor-abstract-path';
import type { MediatorMergeBindingsContext } from '@comunica/bus-merge-bindings-context';
import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import type { IQueryOperationResult, IActionContext } from '@comunica/types';
import { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Path ZeroOrOne Query Operation Actor.
 */
export declare class ActorQueryOperationPathZeroOrOne extends ActorAbstractPath {
    readonly mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    constructor(args: IActorQueryOperationPathZeroOrOneArgs);
    runOperation(operation: Algebra.Path, context: IActionContext): Promise<IQueryOperationResult>;
}
export interface IActorQueryOperationPathZeroOrOneArgs extends IActorQueryOperationTypedMediatedArgs {
    /**
     * A mediator for creating binding context merge handlers
     */
    mediatorMergeBindingsContext: MediatorMergeBindingsContext;
}
