import type { MediatorIteratorTransform } from '@comunica/bus-iterator-transform';
import type { IActionRdfJoin, IActorRdfJoinOutputInner, IActorRdfJoinArgs, MediatorRdfJoin, IActorRdfJoinTestSideData } from '@comunica/bus-rdf-join';
import { ActorRdfJoin } from '@comunica/bus-rdf-join';
import type { TestResult } from '@comunica/core';
import { ActionContextKey } from '@comunica/core';
import type { IMediatorTypeJoinCoefficients } from '@comunica/mediatortype-join-coefficients';
import type { IActionContext, IJoinEntry } from '@comunica/types';
/**
 * A comunica Wrap Stream RDF Join Actor.
 */
export declare class ActorRdfJoinWrapStream extends ActorRdfJoin {
    readonly mediatorJoin: MediatorRdfJoin;
    readonly mediatorIteratorTransform: MediatorIteratorTransform;
    constructor(args: IActorRdfJoinWrapStreamArgs);
    test(action: IActionRdfJoin): Promise<TestResult<IMediatorTypeJoinCoefficients, IActorRdfJoinTestSideData>>;
    getOutput(action: IActionRdfJoin): Promise<IActorRdfJoinOutputInner>;
    protected getJoinCoefficients(_action: IActionRdfJoin, sideData: IActorRdfJoinTestSideData): Promise<TestResult<IMediatorTypeJoinCoefficients, IActorRdfJoinTestSideData>>;
    /**
     * Sets KEY_CONTEXT_WRAPPED_RDF_JOIN key in the context to the entries being joined.
     * @param action The join action being executed
     * @param context The ActionContext
     * @returns The updated ActionContext
     */
    setContextWrapped(action: IActionRdfJoin, context: IActionContext): IActionContext;
}
export interface IActorRdfJoinWrapStreamArgs extends IActorRdfJoinArgs {
    /**
     * Mediator that runs all transforms defined by user over the output stream of the query operation
     */
    mediatorIteratorTransform: MediatorIteratorTransform;
    /**
     * Mediator that calls next join to be wrapped
     */
    mediatorJoin: MediatorRdfJoin;
}
/**
 * Key that shows if the query operation has already been wrapped by a process iterator call
 */
export declare const KEY_CONTEXT_WRAPPED_RDF_JOIN: ActionContextKey<IJoinEntry[]>;
