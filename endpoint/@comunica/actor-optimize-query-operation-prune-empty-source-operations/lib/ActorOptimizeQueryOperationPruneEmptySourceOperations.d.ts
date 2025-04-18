import type { IActionOptimizeQueryOperation, IActorOptimizeQueryOperationOutput, IActorOptimizeQueryOperationArgs } from '@comunica/bus-optimize-query-operation';
import { ActorOptimizeQueryOperation } from '@comunica/bus-optimize-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQuerySourceWrapper } from '@comunica/types';
import { Algebra, Factory } from 'sparqlalgebrajs';
/**
 * A comunica Prune Empty Source Operations Optimize Query Operation Actor.
 */
export declare class ActorOptimizeQueryOperationPruneEmptySourceOperations extends ActorOptimizeQueryOperation {
    private readonly useAskIfSupported;
    constructor(args: IActorOptimizeQueryOperationPruneEmptySourceOperationsArgs);
    test(action: IActionOptimizeQueryOperation): Promise<TestResult<IActorTest>>;
    run(action: IActionOptimizeQueryOperation): Promise<IActorOptimizeQueryOperationOutput>;
    protected static hasEmptyOperation(operation: Algebra.Operation): boolean;
    protected collectMultiOperationInputs(inputs: Algebra.Operation[], collectedOperations: (Algebra.Pattern | Algebra.Link)[], inputType: (Algebra.Pattern | Algebra.Link)['type']): void;
    protected mapMultiOperation<O extends Algebra.Union | Algebra.Alt>(operation: O, emptyOperations: Set<Algebra.Operation>, multiOperationFactory: (input: O['input']) => Algebra.Operation): {
        result: Algebra.Operation;
        recurse: boolean;
    };
    /**
     * Check if the given query operation will produce at least one result in the given source.
     * @param algebraFactory The algebra factory.
     * @param source A query source.
     * @param input A query operation.
     * @param context The query context.
     */
    hasSourceResults(algebraFactory: Factory, source: IQuerySourceWrapper, input: Algebra.Operation, context: IActionContext): Promise<boolean>;
}
export interface IActorOptimizeQueryOperationPruneEmptySourceOperationsArgs extends IActorOptimizeQueryOperationArgs {
    /**
     * If true, ASK queries will be sent to the source instead of COUNT queries to check emptiness for patterns.
     * This will only be done for sources that accept ASK queries.
     * @default {false}
     */
    useAskIfSupported: boolean;
}
