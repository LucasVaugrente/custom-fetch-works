import type { IActionOptimizeQueryOperation, IActorOptimizeQueryOperationOutput } from '@comunica/bus-optimize-query-operation';
import { ActorOptimizeQueryOperation } from '@comunica/bus-optimize-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { Algebra } from 'sparqlalgebrajs';
import { Factory } from 'sparqlalgebrajs';
/**
 * A comunica Join Connected Optimize Query Operation Actor.
 */
export declare class ActorOptimizeQueryOperationJoinConnected extends ActorOptimizeQueryOperation {
    test(_action: IActionOptimizeQueryOperation): Promise<TestResult<IActorTest>>;
    run(action: IActionOptimizeQueryOperation): Promise<IActorOptimizeQueryOperationOutput>;
    /**
     * Iteratively cluster join entries based on their overlapping variables.
     * @param op A join operation.
     * @param factory An algebra factory.
     */
    static cluster(op: Algebra.Join, factory: Factory): Algebra.Operation;
    /**
     * Perform a single clustering iteration.
     * Clusters will be joined if they have overlapping variables.
     * @param oldCluster
     */
    static clusterIteration(oldCluster: IJoinCluster[]): IJoinCluster[];
    /**
     * Check if the two given variable objects are overlapping.
     * @param variablesA A variables objects.
     * @param variablesB A variables objects.
     */
    static haveOverlappingVariables(variablesA: Record<string, boolean>, variablesB: Record<string, boolean>): boolean;
}
/**
 * A cluster of join entries.
 */
export interface IJoinCluster {
    /**
     * Union of all variables in scope within the join entries.
     */
    inScopeVariables: Record<string, boolean>;
    /**
     * Join entries
     */
    entries: Algebra.Operation[];
}
