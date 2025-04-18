import type { IActorTest, TestResult } from '@comunica/core';
import type { IQueryOperationResult, IActionContext } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
import type { IActionQueryOperation, IActorQueryOperationArgs } from './ActorQueryOperation';
import { ActorQueryOperation } from './ActorQueryOperation';
/**
 * A base implementation for query operation actors for a specific operation type.
 */
export declare abstract class ActorQueryOperationTyped<O extends Algebra.Operation, TS = undefined> extends ActorQueryOperation<TS> {
    readonly operationName: string;
    protected constructor(args: IActorQueryOperationArgs<TS>, operationName: string);
    test(action: IActionQueryOperation): Promise<TestResult<IActorTest, TS>>;
    run(action: IActionQueryOperation, sideData: TS): Promise<IQueryOperationResult>;
    protected abstract testOperation(operation: O, context: IActionContext): Promise<TestResult<IActorTest, TS>>;
    protected abstract runOperation(operation: O, context: IActionContext, sideData: TS): Promise<IQueryOperationResult>;
}
