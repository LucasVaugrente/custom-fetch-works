import { ActorAbstractPath } from '@comunica/actor-abstract-path';
import type { MediatorMergeBindingsContext } from '@comunica/bus-merge-bindings-context';
import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import type { IQueryOperationResult, IActionContext } from '@comunica/types';
import { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Path OneOrMore Query Operation Actor.
 */
export declare class ActorQueryOperationPathOneOrMore extends ActorAbstractPath {
    readonly mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    constructor(args: IActorQueryOperationPathOneOrMoreArgs);
    runOperation(operation: Algebra.Path, context: IActionContext): Promise<IQueryOperationResult>;
}
export interface IActorQueryOperationPathOneOrMoreArgs extends IActorQueryOperationTypedMediatedArgs {
    /**
     * A mediator for creating binding context merge handlers
     */
    mediatorMergeBindingsContext: MediatorMergeBindingsContext;
}
