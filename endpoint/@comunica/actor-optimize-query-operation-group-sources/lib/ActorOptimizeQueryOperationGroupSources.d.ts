import type { IActionOptimizeQueryOperation, IActorOptimizeQueryOperationOutput, IActorOptimizeQueryOperationArgs } from '@comunica/bus-optimize-query-operation';
import { ActorOptimizeQueryOperation } from '@comunica/bus-optimize-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQuerySourceWrapper } from '@comunica/types';
import { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Group Sources Optimize Query Operation Actor.
 */
export declare class ActorOptimizeQueryOperationGroupSources extends ActorOptimizeQueryOperation {
    constructor(args: IActorOptimizeQueryOperationArgs);
    test(action: IActionOptimizeQueryOperation): Promise<TestResult<IActorTest>>;
    run(action: IActionOptimizeQueryOperation): Promise<IActorOptimizeQueryOperationOutput>;
    /**
     * Group operations belonging to the same source together, only if that source accepts the grouped operations.
     * This grouping will be done recursively for the whole operation tree.
     * Operations annotated with sources are considered leaves in the tree.
     * @param operation An operation to group.
     * @param context The action context.
     */
    groupOperation(operation: Algebra.Operation, context: IActionContext): Promise<Algebra.Operation>;
    protected groupOperationMulti(clusters: Algebra.Operation[][], factoryMethod: (children: Algebra.Operation[], flatten: boolean) => Algebra.Operation, context: IActionContext): Promise<Algebra.Operation>;
    /**
     * Cluster the given operations by equal source annotations.
     * @param operationsIn An array of operations to cluster.
     */
    clusterOperationsWithEqualSources(operationsIn: Algebra.Operation[]): Algebra.Operation[][];
    /**
     * If the given source accepts the grouped operation, annotate the grouped operation with the source,
     * and remove the source annotation from the seperate input operations.
     * Otherwise, return the grouped operation unchanged.
     * @param operation A grouped operation consisting of all given input operations.
     * @param inputs An array of operations that share the same source annotation.
     * @param source The common source.
     * @param context The action context.
     */
    moveSourceAnnotationUpwardsIfPossible<O extends Algebra.Operation>(operation: O, inputs: Algebra.Operation[], source: IQuerySourceWrapper | undefined, context: IActionContext): Promise<O>;
}
