import type { IActionQueryOperation, IActorQueryOperationArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperation } from '@comunica/bus-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IQueryOperationResult } from '@comunica/types';
/**
 * A comunica Source Query Operation Actor.
 */
export declare class ActorQueryOperationSource extends ActorQueryOperation {
    constructor(args: IActorQueryOperationArgs);
    test(action: IActionQueryOperation): Promise<TestResult<IActorTest>>;
    run(action: IActionQueryOperation): Promise<IQueryOperationResult>;
}
