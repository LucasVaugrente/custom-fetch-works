import type { IActionOptimizeQueryOperation, IActorOptimizeQueryOperationOutput, IActorOptimizeQueryOperationArgs } from '@comunica/bus-optimize-query-operation';
import { ActorOptimizeQueryOperation } from '@comunica/bus-optimize-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Construct Distinct Optimize Query Operation Actor.
 */
export declare class ActorOptimizeQueryOperationConstructDistinct extends ActorOptimizeQueryOperation {
    constructor(args: IActorOptimizeQueryOperationArgs);
    test(action: IActionOptimizeQueryOperation): Promise<TestResult<IActorTest>>;
    run(action: IActionOptimizeQueryOperation): Promise<IActorOptimizeQueryOperationOutput>;
}
