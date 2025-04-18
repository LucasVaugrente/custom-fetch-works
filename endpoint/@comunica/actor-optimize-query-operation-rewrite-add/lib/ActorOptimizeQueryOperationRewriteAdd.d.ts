import type { IActionOptimizeQueryOperation, IActorOptimizeQueryOperationOutput, IActorOptimizeQueryOperationArgs } from '@comunica/bus-optimize-query-operation';
import { ActorOptimizeQueryOperation } from '@comunica/bus-optimize-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Rewrite Add Optimize Query Operation Actor.
 */
export declare class ActorOptimizeQueryOperationRewriteAdd extends ActorOptimizeQueryOperation {
    constructor(args: IActorOptimizeQueryOperationArgs);
    test(_action: IActionOptimizeQueryOperation): Promise<TestResult<IActorTest>>;
    run(action: IActionOptimizeQueryOperation): Promise<IActorOptimizeQueryOperationOutput>;
}
