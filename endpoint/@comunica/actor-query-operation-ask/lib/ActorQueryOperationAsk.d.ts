import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQueryOperationResult } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Ask Query Operation Actor.
 */
export declare class ActorQueryOperationAsk extends ActorQueryOperationTypedMediated<Algebra.Ask> {
    constructor(args: IActorQueryOperationTypedMediatedArgs);
    testOperation(_operation: Algebra.Ask, _context: IActionContext): Promise<TestResult<IActorTest>>;
    runOperation(operation: Algebra.Ask, context: IActionContext): Promise<IQueryOperationResult>;
}
