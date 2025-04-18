import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { MediatorQuerySourceIdentify } from '@comunica/bus-query-source-identify';
import type { MediatorRdfUpdateQuads } from '@comunica/bus-rdf-update-quads';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQueryOperationResult } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A [Query Operation](https://github.com/comunica/comunica/tree/master/packages/bus-query-operation) actor
 * that handles SPARQL load operations.
 */
export declare class ActorQueryOperationLoad extends ActorQueryOperationTypedMediated<Algebra.Load> {
    readonly mediatorUpdateQuads: MediatorRdfUpdateQuads;
    readonly mediatorQuerySourceIdentify: MediatorQuerySourceIdentify;
    constructor(args: IActorQueryOperationLoadArgs);
    testOperation(operation: Algebra.Load, context: IActionContext): Promise<TestResult<IActorTest>>;
    runOperation(operation: Algebra.Load, context: IActionContext): Promise<IQueryOperationResult>;
}
export interface IActorQueryOperationLoadArgs extends IActorQueryOperationTypedMediatedArgs {
    /**
     * The RDF Update Quads mediator
     */
    mediatorUpdateQuads: MediatorRdfUpdateQuads;
    /**
     * Mediator for identifying load sources.
     */
    mediatorQuerySourceIdentify: MediatorQuerySourceIdentify;
}
