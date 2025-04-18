import type { IActionOptimizeQueryOperation, IActorOptimizeQueryOperationOutput, IActorOptimizeQueryOperationArgs } from '@comunica/bus-optimize-query-operation';
import { ActorOptimizeQueryOperation } from '@comunica/bus-optimize-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IQuerySourceWrapper } from '@comunica/types';
import { Algebra, Factory } from 'sparqlalgebrajs';
/**
 * A comunica Assign Sources Exhaustive Optimize Query Operation Actor.
 */
export declare class ActorOptimizeQueryOperationAssignSourcesExhaustive extends ActorOptimizeQueryOperation {
    constructor(args: IActorOptimizeQueryOperationArgs);
    test(_action: IActionOptimizeQueryOperation): Promise<TestResult<IActorTest>>;
    run(action: IActionOptimizeQueryOperation): Promise<IActorOptimizeQueryOperationOutput>;
    /**
     * Assign the given sources to the leaves in the given query operation.
     * Leaves will be wrapped in a union operation and duplicated for every source.
     * The input operation will not be modified.
     * @param algebraFactory The algebra factory.
     * @param operation The input operation.
     * @param sources The sources to assign.
     */
    assignExhaustive(algebraFactory: Factory, operation: Algebra.Operation, sources: IQuerySourceWrapper[]): Algebra.Operation;
}
