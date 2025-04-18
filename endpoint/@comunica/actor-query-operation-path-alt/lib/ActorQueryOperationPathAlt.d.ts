import { ActorAbstractPath } from '@comunica/actor-abstract-path';
import type { IActorQueryOperationTypedMediatedArgs } from '@comunica/bus-query-operation';
import type { MediatorRdfMetadataAccumulate } from '@comunica/bus-rdf-metadata-accumulate';
import type { IQueryOperationResult, IActionContext } from '@comunica/types';
import { Algebra } from 'sparqlalgebrajs';
/**
 * A comunica Path Alt Query Operation Actor.
 */
export declare class ActorQueryOperationPathAlt extends ActorAbstractPath {
    readonly mediatorRdfMetadataAccumulate: MediatorRdfMetadataAccumulate;
    constructor(args: IActorQueryOperationPathAltArgs);
    runOperation(operation: Algebra.Path, context: IActionContext): Promise<IQueryOperationResult>;
}
export interface IActorQueryOperationPathAltArgs extends IActorQueryOperationTypedMediatedArgs {
    mediatorRdfMetadataAccumulate: MediatorRdfMetadataAccumulate;
}
