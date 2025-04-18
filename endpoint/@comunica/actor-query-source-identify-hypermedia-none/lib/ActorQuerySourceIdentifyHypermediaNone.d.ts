import type { MediatorMergeBindingsContext } from '@comunica/bus-merge-bindings-context';
import type { IActionQuerySourceIdentifyHypermedia, IActorQuerySourceIdentifyHypermediaOutput, IActorQuerySourceIdentifyHypermediaArgs, IActorQuerySourceIdentifyHypermediaTest } from '@comunica/bus-query-source-identify-hypermedia';
import { ActorQuerySourceIdentifyHypermedia } from '@comunica/bus-query-source-identify-hypermedia';
import type { TestResult } from '@comunica/core';
/**
 * A comunica None Query Source Identify Hypermedia Actor.
 */
export declare class ActorQuerySourceIdentifyHypermediaNone extends ActorQuerySourceIdentifyHypermedia {
    readonly mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    constructor(args: IActorQuerySourceIdentifyHypermediaNoneArgs);
    testMetadata(_action: IActionQuerySourceIdentifyHypermedia): Promise<TestResult<IActorQuerySourceIdentifyHypermediaTest>>;
    run(action: IActionQuerySourceIdentifyHypermedia): Promise<IActorQuerySourceIdentifyHypermediaOutput>;
}
export interface IActorQuerySourceIdentifyHypermediaNoneArgs extends IActorQuerySourceIdentifyHypermediaArgs {
    /**
     * A mediator for creating binding context merge handlers
     */
    mediatorMergeBindingsContext: MediatorMergeBindingsContext;
}
