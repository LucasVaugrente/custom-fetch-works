import type { MediatorMergeBindingsContext } from '@comunica/bus-merge-bindings-context';
import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { MediatorQuerySourceIdentify } from '@comunica/bus-query-source-identify';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQueryOperationResult } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Service Query Operation Actor.
 * It unwraps the SERVICE operation and executes it on the given source.
 */
export declare class ActorQueryOperationService extends ActorQueryOperationTypedMediated<Algebra.Service> {
    readonly forceSparqlEndpoint: boolean;
    readonly mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    readonly mediatorQuerySourceIdentify: MediatorQuerySourceIdentify;
    constructor(args: IActorQueryOperationServiceArgs);
    testOperation(operation: Algebra.Service, _context: IActionContext): Promise<TestResult<IActorTest>>;
    runOperation(operation: Algebra.Service, context: IActionContext): Promise<IQueryOperationResult>;
}
export interface IActorQueryOperationServiceArgs extends IActorQueryOperationTypedMediatedArgs {
    /**
     * If the SERVICE target should be assumed to be a SPARQL endpoint.
     * @default {false}
     */
    forceSparqlEndpoint: boolean;
    /**
     * A mediator for creating binding context merge handlers
     */
    mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    /**
     * The mediator for identifying query sources.
     */
    mediatorQuerySourceIdentify: MediatorQuerySourceIdentify;
}
