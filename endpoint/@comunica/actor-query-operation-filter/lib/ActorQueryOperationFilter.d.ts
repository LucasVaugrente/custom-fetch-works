import type { MediatorExpressionEvaluatorFactory } from '@comunica/bus-expression-evaluator-factory';
import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQueryOperationResult } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Filter Sparqlee Query Operation Actor.
 */
export declare class ActorQueryOperationFilter extends ActorQueryOperationTypedMediated<Algebra.Filter> {
    private readonly mediatorExpressionEvaluatorFactory;
    constructor(args: IActorQueryOperationFilterSparqleeArgs);
    testOperation(): Promise<TestResult<IActorTest>>;
    runOperation(operation: Algebra.Filter, context: IActionContext): Promise<IQueryOperationResult>;
}
export interface IActorQueryOperationFilterSparqleeArgs extends IActorQueryOperationTypedMediatedArgs {
    mediatorExpressionEvaluatorFactory: MediatorExpressionEvaluatorFactory;
}
