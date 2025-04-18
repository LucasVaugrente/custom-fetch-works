import type { MediatorExpressionEvaluatorFactory } from '@comunica/bus-expression-evaluator-factory';
import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { MediatorRdfJoin } from '@comunica/bus-rdf-join';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQueryOperationResult } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica LeftJoin Query Operation Actor.
 */
export declare class ActorQueryOperationLeftJoin extends ActorQueryOperationTypedMediated<Algebra.LeftJoin> {
    readonly mediatorJoin: MediatorRdfJoin;
    private readonly mediatorExpressionEvaluatorFactory;
    constructor(args: IActorQueryOperationLeftJoinArgs);
    testOperation(_operation: Algebra.LeftJoin, _context: IActionContext): Promise<TestResult<IActorTest>>;
    runOperation(operationOriginal: Algebra.LeftJoin, context: IActionContext): Promise<IQueryOperationResult>;
}
export interface IActorQueryOperationLeftJoinArgs extends IActorQueryOperationTypedMediatedArgs {
    /**
     * A mediator for joining Bindings streams
     */
    mediatorJoin: MediatorRdfJoin;
    mediatorExpressionEvaluatorFactory: MediatorExpressionEvaluatorFactory;
}
