import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQueryOperationResult } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A [Query Operation](https://github.com/comunica/comunica/tree/master/packages/bus-query-operation) actor
 * that handles SPARQL BGP operations by rewriting it as a join operator.
 */
export declare class ActorQueryOperationBgpJoin extends ActorQueryOperationTypedMediated<Algebra.Bgp> {
    constructor(args: IActorQueryOperationTypedMediatedArgs);
    testOperation(_operation: Algebra.Bgp, _context: IActionContext): Promise<TestResult<IActorTest>>;
    runOperation(operation: Algebra.Bgp, context: IActionContext): Promise<IQueryOperationResult>;
}
