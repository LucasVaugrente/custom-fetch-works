import type { MediatorMergeBindingsContext } from '@comunica/bus-merge-bindings-context';
import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { MediatorRdfUpdateQuads } from '@comunica/bus-rdf-update-quads';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IQueryOperationResult, IActionContext } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Update DeleteInsert Query Operation Actor.
 */
export declare class ActorQueryOperationUpdateDeleteInsert extends ActorQueryOperationTypedMediated<Algebra.DeleteInsert> {
    readonly mediatorUpdateQuads: MediatorRdfUpdateQuads;
    readonly mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    protected blankNodeCounter: number;
    constructor(args: IActorQueryOperationUpdateDeleteInsertArgs);
    testOperation(operation: Algebra.DeleteInsert, context: IActionContext): Promise<TestResult<IActorTest>>;
    runOperation(operation: Algebra.DeleteInsert, context: IActionContext): Promise<IQueryOperationResult>;
}
export interface IActorQueryOperationUpdateDeleteInsertArgs extends IActorQueryOperationTypedMediatedArgs {
    /**
     * The RDF Update Quads mediator
     */
    mediatorUpdateQuads: MediatorRdfUpdateQuads;
    /**
     * A mediator for creating binding context merge handlers
     */
    mediatorMergeBindingsContext: MediatorMergeBindingsContext;
}
