import { ActorRdfJoin } from '@comunica/bus-rdf-join';
import type { IActionRdfJoin, IActorRdfJoinArgs, IActorRdfJoinOutputInner, IActorRdfJoinTestSideData } from '@comunica/bus-rdf-join';
import type { TestResult } from '@comunica/core';
import type { IMediatorTypeJoinCoefficients } from '@comunica/mediatortype-join-coefficients';
import type { MetadataVariable } from '@comunica/types';
import type { IBindingsIndex } from '@comunica/utils-bindings-index';
/**
 * A comunica Optional Hash RDF Join Actor.
 */
export declare class ActorRdfJoinOptionalHash extends ActorRdfJoin {
    private readonly blocking;
    constructor(args: IActorRdfJoinOptionalHashArgs);
    static constructIndex<V>(undef: boolean, commonVariables: MetadataVariable[]): IBindingsIndex<V>;
    getOutput(action: IActionRdfJoin): Promise<IActorRdfJoinOutputInner>;
    protected getJoinCoefficients(action: IActionRdfJoin, sideData: IActorRdfJoinTestSideData): Promise<TestResult<IMediatorTypeJoinCoefficients, IActorRdfJoinTestSideData>>;
}
export interface IActorRdfJoinOptionalHashArgs extends IActorRdfJoinArgs {
    /**
     * If this actor can handle undefined values.
     * If false, performance will be slightly better.
     */
    canHandleUndefs: boolean;
    /**
     * If the join will block when collecting the optional stream.
     * If true, performance will be better.
     */
    blocking: boolean;
}
