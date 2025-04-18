import type { MediatorContextPreprocess } from '@comunica/bus-context-preprocess';
import type { MediatorMergeBindingsContext } from '@comunica/bus-merge-bindings-context';
import type { MediatorOptimizeQueryOperation } from '@comunica/bus-optimize-query-operation';
import type { MediatorQueryOperation } from '@comunica/bus-query-operation';
import type { MediatorQueryParse } from '@comunica/bus-query-parse';
import type { IActionQueryProcess, IActorQueryProcessOutput, IActorQueryProcessArgs, IQueryProcessSequential, IQueryProcessSequentialOutput } from '@comunica/bus-query-process';
import { ActorQueryProcess } from '@comunica/bus-query-process';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQueryOperationResult, QueryFormatType } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Sequential Query Process Actor.
 */
export declare class ActorQueryProcessSequential extends ActorQueryProcess implements IQueryProcessSequential {
    readonly mediatorContextPreprocess: MediatorContextPreprocess;
    readonly mediatorQueryParse: MediatorQueryParse;
    readonly mediatorOptimizeQueryOperation: MediatorOptimizeQueryOperation;
    readonly mediatorQueryOperation: MediatorQueryOperation;
    readonly mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    constructor(args: IActorQueryProcessSequentialArgs);
    test(action: IActionQueryProcess): Promise<TestResult<IActorTest>>;
    run(action: IActionQueryProcess): Promise<IActorQueryProcessOutput>;
    parse(query: QueryFormatType, context: IActionContext): Promise<IQueryProcessSequentialOutput>;
    optimize(operation: Algebra.Operation, context: IActionContext): Promise<IQueryProcessSequentialOutput>;
    evaluate(operation: Algebra.Operation, context: IActionContext): Promise<IQueryOperationResult>;
}
export interface IActorQueryProcessSequentialArgs extends IActorQueryProcessArgs {
    /**
     * The context processing combinator
     */
    mediatorContextPreprocess: MediatorContextPreprocess;
    /**
     * The query parse mediator
     */
    mediatorQueryParse: MediatorQueryParse;
    /**
     * The query operation optimize mediator
     */
    mediatorOptimizeQueryOperation: MediatorOptimizeQueryOperation;
    /**
     * The query operation mediator
     */
    mediatorQueryOperation: MediatorQueryOperation;
    /**
     * A mediator for creating binding context merge handlers
     */
    mediatorMergeBindingsContext: MediatorMergeBindingsContext;
}
