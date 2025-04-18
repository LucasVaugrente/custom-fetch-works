import type { MediatorHashBindings } from '@comunica/bus-hash-bindings';
import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { IActorTest, TestResult } from '@comunica/core';
import type { Bindings, IActionContext, IQueryOperationResult } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Reduced Hash Query Operation Actor.
 */
export declare class ActorQueryOperationReducedHash extends ActorQueryOperationTypedMediated<Algebra.Reduced> {
    readonly mediatorHashBindings: MediatorHashBindings;
    readonly cacheSize: number;
    constructor(args: IActorQueryOperationReducedHashArgs);
    testOperation(_operation: Algebra.Reduced, _context: IActionContext): Promise<TestResult<IActorTest>>;
    runOperation(operation: Algebra.Reduced, context: IActionContext): Promise<IQueryOperationResult>;
    /**
     * Create a new distinct filter function.
     * This will maintain an internal hash datastructure so that every bindings object only returns true once.
     * @param context The action context.
     * @param variables The variables to take into account while hashing.
     * @return {(bindings: Bindings) => boolean} A distinct filter for bindings.
     */
    newHashFilter(context: IActionContext, variables: RDF.Variable[]): Promise<(bindings: Bindings) => boolean>;
}
export interface IActorQueryOperationReducedHashArgs extends IActorQueryOperationTypedMediatedArgs {
    mediatorHashBindings: MediatorHashBindings;
    /**
     * @range {integer}
     * @default {100}
     */
    cacheSize: number;
}
