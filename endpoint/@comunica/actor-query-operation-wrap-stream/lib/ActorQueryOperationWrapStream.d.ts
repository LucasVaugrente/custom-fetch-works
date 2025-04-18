import type { MediatorIteratorTransform } from '@comunica/bus-iterator-transform';
import type { IActionQueryOperation, IActorQueryOperationArgs, MediatorQueryOperation } from '@comunica/bus-query-operation';
import { ActorQueryOperation } from '@comunica/bus-query-operation';
import { ActionContextKey } from '@comunica/core';
import type { TestResult, IActorTest } from '@comunica/core';
import type { IActionContext, IQueryOperationResult } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Wrap Stream Query Operation Actor.
 */
export declare class ActorQueryOperationWrapStream extends ActorQueryOperation {
    readonly mediatorIteratorTransform: MediatorIteratorTransform;
    readonly mediatorQueryOperation: MediatorQueryOperation;
    constructor(args: IActorQueryOperationWrapStreamArgs);
    test(action: IActionQueryOperation): Promise<TestResult<IActorTest>>;
    run(action: IActionQueryOperation): Promise<IQueryOperationResult>;
    /**
     * Sets KEY_CONTEXT_WRAPPED_QUERY_OPERATION to the operation being executed.
     * @param operation The query operation.
     * @param context The current action context.
     * @returns A new action context with the operation marked as wrapped.
     */
    setContextWrapped(operation: Algebra.Operation, context: IActionContext): IActionContext;
}
export interface IActorQueryOperationWrapStreamArgs extends IActorQueryOperationArgs {
    /**
     * Mediator that runs all transforms defined by user over the output stream of the query operation
     */
    mediatorIteratorTransform: MediatorIteratorTransform;
    /**
     * Mediator that runs the next query operation
     */
    mediatorQueryOperation: MediatorQueryOperation;
}
/**
 * Key that that stores the last executed operation
 */
export declare const KEY_CONTEXT_WRAPPED_QUERY_OPERATION: ActionContextKey<Algebra.Operation>;
