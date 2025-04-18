import type { MediatorExpressionEvaluatorFactory } from '@comunica/bus-expression-evaluator-factory';
import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { MediatorTermComparatorFactory } from '@comunica/bus-term-comparator-factory';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQueryOperationResult } from '@comunica/types';
import { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica OrderBy Query Operation Actor.
 */
export declare class ActorQueryOperationOrderBy extends ActorQueryOperationTypedMediated<Algebra.OrderBy> {
    private readonly window;
    private readonly mediatorExpressionEvaluatorFactory;
    private readonly mediatorTermComparatorFactory;
    constructor(args: IActorQueryOperationOrderBySparqleeArgs);
    testOperation(): Promise<TestResult<IActorTest>>;
    runOperation(operation: Algebra.OrderBy, context: IActionContext): Promise<IQueryOperationResult>;
    private extractSortExpression;
    private isAscending;
}
/**
 * The window parameter determines how many of the elements to consider when sorting.
 */
export interface IActorQueryOperationOrderBySparqleeArgs extends IActorQueryOperationTypedMediatedArgs {
    /**
     * The size of the window for the sort iterator.
     * @range {integer}
     */
    window?: number;
    mediatorExpressionEvaluatorFactory: MediatorExpressionEvaluatorFactory;
    mediatorTermComparatorFactory: MediatorTermComparatorFactory;
}
