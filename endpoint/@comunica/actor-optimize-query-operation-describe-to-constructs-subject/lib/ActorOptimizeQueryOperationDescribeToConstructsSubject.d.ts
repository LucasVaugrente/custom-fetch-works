import type { IActionOptimizeQueryOperation, IActorOptimizeQueryOperationOutput, IActorOptimizeQueryOperationArgs } from '@comunica/bus-optimize-query-operation';
import { ActorOptimizeQueryOperation } from '@comunica/bus-optimize-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Describe To Constructs Subject Optimize Query Operation Actor.
 */
export declare class ActorOptimizeQueryOperationDescribeToConstructsSubject extends ActorOptimizeQueryOperation {
    constructor(args: IActorOptimizeQueryOperationArgs);
    test(action: IActionOptimizeQueryOperation): Promise<TestResult<IActorTest>>;
    run(action: IActionOptimizeQueryOperation): Promise<IActorOptimizeQueryOperationOutput>;
}
