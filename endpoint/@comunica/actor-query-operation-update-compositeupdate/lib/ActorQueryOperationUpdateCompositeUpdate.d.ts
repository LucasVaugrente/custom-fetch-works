import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQueryOperationResult } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Update CompositeUpdate Query Operation Actor.
 */
export declare class ActorQueryOperationUpdateCompositeUpdate extends ActorQueryOperationTypedMediated<Algebra.CompositeUpdate> {
    constructor(args: IActorQueryOperationTypedMediatedArgs);
    testOperation(operation: Algebra.CompositeUpdate, context: IActionContext): Promise<TestResult<IActorTest>>;
    runOperation(operationOriginal: Algebra.CompositeUpdate, context: IActionContext): Promise<IQueryOperationResult>;
}
