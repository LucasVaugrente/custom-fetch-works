import type { MediatorHashBindings } from '@comunica/bus-hash-bindings';
import type { IActionRdfJoin, IActorRdfJoinOutputInner, IActorRdfJoinArgs, IActorRdfJoinTestSideData } from '@comunica/bus-rdf-join';
import { ActorRdfJoin } from '@comunica/bus-rdf-join';
import type { TestResult } from '@comunica/core';
import type { IMediatorTypeJoinCoefficients } from '@comunica/mediatortype-join-coefficients';
/**
 * A comunica Hash RDF Join Actor.
 */
export declare class ActorRdfJoinSymmetricHash extends ActorRdfJoin {
    readonly mediatorHashBindings: MediatorHashBindings;
    constructor(args: IActorRdfJoinSymmetricHashArgs);
    getOutput(action: IActionRdfJoin): Promise<IActorRdfJoinOutputInner>;
    protected getJoinCoefficients(action: IActionRdfJoin, sideData: IActorRdfJoinTestSideData): Promise<TestResult<IMediatorTypeJoinCoefficients, IActorRdfJoinTestSideData>>;
}
export interface IActorRdfJoinSymmetricHashArgs extends IActorRdfJoinArgs {
    /**
     * The mediator for hashing bindings.
     */
    mediatorHashBindings: MediatorHashBindings;
}
