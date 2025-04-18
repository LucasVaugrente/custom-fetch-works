import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { MediatorRdfJoin } from '@comunica/bus-rdf-join';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IQueryOperationResult, IActionContext } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Join Query Operation Actor.
 */
export declare class ActorQueryOperationJoin extends ActorQueryOperationTypedMediated<Algebra.Join> {
    readonly mediatorJoin: MediatorRdfJoin;
    constructor(args: IActorQueryOperationJoinArgs);
    testOperation(_operation: Algebra.Join, _context: IActionContext): Promise<TestResult<IActorTest>>;
    runOperation(operationOriginal: Algebra.Join, context: IActionContext): Promise<IQueryOperationResult>;
}
export interface IActorQueryOperationJoinArgs extends IActorQueryOperationTypedMediatedArgs {
    /**
     * A mediator for joining Bindings streams
     */
    mediatorJoin: MediatorRdfJoin;
}
