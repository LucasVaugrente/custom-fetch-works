import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import { ActorQueryOperationTypedMediated } from '@comunica/bus-query-operation';
import type { MediatorRdfMetadataAccumulate } from '@comunica/bus-rdf-metadata-accumulate';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext, IQueryOperationResult, MetadataBindings, MetadataQuads, MetadataVariable } from '@comunica/types';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Union Query Operation Actor.
 */
export declare class ActorQueryOperationUnion extends ActorQueryOperationTypedMediated<Algebra.Union> {
    readonly mediatorRdfMetadataAccumulate: MediatorRdfMetadataAccumulate;
    constructor(args: IActorQueryOperationUnionArgs);
    /**
     * Takes the union of the given double array variables.
     * Uniqueness is guaranteed.
     * @param {string[][]} variables Double array of variables to take the union of.
     * @return {string[]} The union of the given variables.
     */
    static unionVariables(variables: MetadataVariable[][]): MetadataVariable[];
    /**
     * Takes the union of the given metadata array.
     * It will ensure that the cardinality metadata value is properly calculated.
     * @param {{[p: string]: any}[]} metadatas Array of metadata.
     * @param bindings If the union of the variables field should also be taken.
     * @param context The action context
     * @param mediatorRdfMetadataAccumulate Mediator for metadata accumulation
     * @return {{[p: string]: any}} Union of the metadata.
     */
    static unionMetadata<Bindings extends boolean, M extends (Bindings extends true ? MetadataBindings : MetadataQuads)>(metadatas: M[], bindings: Bindings, context: IActionContext, mediatorRdfMetadataAccumulate: MediatorRdfMetadataAccumulate): Promise<M>;
    testOperation(_operation: Algebra.Union, _context: IActionContext): Promise<TestResult<IActorTest>>;
    runOperation(operation: Algebra.Union, context: IActionContext): Promise<IQueryOperationResult>;
}
export interface IActorQueryOperationUnionArgs extends IActorQueryOperationTypedMediatedArgs {
    mediatorRdfMetadataAccumulate: MediatorRdfMetadataAccumulate;
}
