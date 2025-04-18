import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { MediatorRdfUpdateQuads } from '@comunica/bus-rdf-update-quads';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQueryOperationResult } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A [Query Operation](https://github.com/comunica/comunica/tree/master/packages/bus-query-operation) actor
 * that handles SPARQL drop operations.
 */
export declare class ActorQueryOperationDrop extends ActorQueryOperationTypedMediated<Algebra.Drop> {
    readonly mediatorUpdateQuads: MediatorRdfUpdateQuads;
    constructor(args: IActorQueryOperationDropArgs);
    testOperation(operation: Algebra.Drop, context: IActionContext): Promise<TestResult<IActorTest>>;
    runOperation(operation: Algebra.Drop, context: IActionContext): Promise<IQueryOperationResult>;
}
export interface IActorQueryOperationDropArgs extends IActorQueryOperationTypedMediatedArgs {
    /**
     * The RDF Update Quads mediator
     */
    mediatorUpdateQuads: MediatorRdfUpdateQuads;
}
