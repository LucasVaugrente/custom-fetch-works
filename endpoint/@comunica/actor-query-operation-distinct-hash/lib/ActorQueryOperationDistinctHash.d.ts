import type { MediatorHashBindings } from '@comunica/bus-hash-bindings';
import type { MediatorHashQuads } from '@comunica/bus-hash-quads';
import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { Bindings, IActionContext, IQueryOperationResult } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Distinct Hash Query Operation Actor.
 */
export declare class ActorQueryOperationDistinctHash extends ActorQueryOperationTypedMediated<Algebra.Distinct> {
    readonly mediatorHashBindings: MediatorHashBindings;
    readonly mediatorHashQuads: MediatorHashQuads;
    constructor(args: IActorQueryOperationDistinctHashArgs);
    testOperation(_operation: Algebra.Distinct, _context: IActionContext): Promise<TestResult<IActorTest>>;
    runOperation(operation: Algebra.Distinct, context: IActionContext): Promise<IQueryOperationResult>;
    /**
     * Create a new distinct filter function.
     * This will maintain an internal hash datastructure so that every bindings object only returns true once.
     * @param context The action context.
     * @param variables The variables to take into account while hashing.
     * @return {(bindings: Bindings) => boolean} A distinct filter for bindings.
     */
    newHashFilter(context: IActionContext, variables: RDF.Variable[]): Promise<(bindings: Bindings) => boolean>;
    /**
     * Create a new distinct filter function to hash quads.
     * This will maintain an internal hash datastructure so that every quad object only returns true once.
     * @param context The action context.
     * @return {(quad: RDF.Quad) => boolean} A distinct filter for quads.
     */
    newHashFilterQuads(context: IActionContext): Promise<(quad: RDF.Quad) => boolean>;
}
export interface IActorQueryOperationDistinctHashArgs extends IActorQueryOperationTypedMediatedArgs {
    mediatorHashBindings: MediatorHashBindings;
    mediatorHashQuads: MediatorHashQuads;
}
