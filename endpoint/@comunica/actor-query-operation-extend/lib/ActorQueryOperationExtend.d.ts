import type { MediatorExpressionEvaluatorFactory } from '@comunica/bus-expression-evaluator-factory';
import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQueryOperationResult } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Extend Query Operation Actor.
 *
 * See https://www.w3.org/TR/sparql11-query/#sparqlAlgebra;
 */
export declare class ActorQueryOperationExtend extends ActorQueryOperationTypedMediated<Algebra.Extend> {
    private readonly mediatorExpressionEvaluatorFactory;
    constructor(args: IActorQueryOperationExtendArgs);
    testOperation(): Promise<TestResult<IActorTest>>;
    runOperation(operation: Algebra.Extend, context: IActionContext): Promise<IQueryOperationResult>;
}
export interface IActorQueryOperationExtendArgs extends IActorQueryOperationTypedMediatedArgs {
    mediatorExpressionEvaluatorFactory: MediatorExpressionEvaluatorFactory;
}
