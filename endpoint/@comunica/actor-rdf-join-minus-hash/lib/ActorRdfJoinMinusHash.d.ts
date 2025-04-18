import type { IActionRdfJoin, IActorRdfJoinOutputInner, IActorRdfJoinArgs, IActorRdfJoinTestSideData } from '@comunica/bus-rdf-join';
import { ActorRdfJoin } from '@comunica/bus-rdf-join';
import type { TestResult } from '@comunica/core';
import type { IMediatorTypeJoinCoefficients } from '@comunica/mediatortype-join-coefficients';
import type { MetadataVariable } from '@comunica/types';
import type { IBindingsIndex } from '@comunica/utils-bindings-index';
/**
 * A comunica Minus Hash RDF Join Actor.
 */
export declare class ActorRdfJoinMinusHash extends ActorRdfJoin {
    constructor(args: IActorRdfJoinMinusHashArgs);
    static constructIndex<V>(undef: boolean, commonVariables: MetadataVariable[]): IBindingsIndex<V>;
    getOutput(action: IActionRdfJoin): Promise<IActorRdfJoinOutputInner>;
    protected getJoinCoefficients(action: IActionRdfJoin, sideData: IActorRdfJoinTestSideData): Promise<TestResult<IMediatorTypeJoinCoefficients, IActorRdfJoinTestSideData>>;
}
export interface IActorRdfJoinMinusHashArgs extends IActorRdfJoinArgs {
    /**
     * If this actor can handle undefined values.
     * If false, performance will be slightly better.
     */
    canHandleUndefs: boolean;
}
