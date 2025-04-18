import type { IActionOptimizeQueryOperation, IActorOptimizeQueryOperationOutput } from '@comunica/bus-optimize-query-operation';
import { ActorOptimizeQueryOperation } from '@comunica/bus-optimize-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica BGP to Join Optimize Query Operation Actor.
 */
export declare class ActorOptimizeQueryOperationBgpToJoin extends ActorOptimizeQueryOperation {
    test(_action: IActionOptimizeQueryOperation): Promise<TestResult<IActorTest>>;
    run(action: IActionOptimizeQueryOperation): Promise<IActorOptimizeQueryOperationOutput>;
}
