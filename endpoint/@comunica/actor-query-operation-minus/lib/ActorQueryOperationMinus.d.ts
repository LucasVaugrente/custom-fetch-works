import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { MediatorRdfJoin } from '@comunica/bus-rdf-join';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQueryOperationResult } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Minus Query Operation Actor.
 */
export declare class ActorQueryOperationMinus extends ActorQueryOperationTypedMediated<Algebra.Minus> {
    readonly mediatorJoin: MediatorRdfJoin;
    constructor(args: IActorQueryOperationMinusArgs);
    testOperation(_operation: Algebra.Minus, _context: IActionContext): Promise<TestResult<IActorTest>>;
    runOperation(operationOriginal: Algebra.Minus, context: IActionContext): Promise<IQueryOperationResult>;
}
export interface IActorQueryOperationMinusArgs extends IActorQueryOperationTypedMediatedArgs {
    /**
     * A mediator for joining Bindings streams
     */
    mediatorJoin: MediatorRdfJoin;
}
