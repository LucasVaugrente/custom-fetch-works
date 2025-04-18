import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQueryOperationResult } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Project Query Operation Actor.
 */
export declare class ActorQueryOperationProject extends ActorQueryOperationTypedMediated<Algebra.Project> {
    constructor(args: IActorQueryOperationTypedMediatedArgs);
    testOperation(_operation: Algebra.Project, _context: IActionContext): Promise<TestResult<IActorTest>>;
    runOperation(operation: Algebra.Project, context: IActionContext): Promise<IQueryOperationResult>;
}
