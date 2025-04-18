import type { MediatorMergeBindingsContext } from '@comunica/bus-merge-bindings-context';
import type { IActionQuerySourceIdentifyHypermedia, IActorQuerySourceIdentifyHypermediaOutput, IActorQuerySourceIdentifyHypermediaArgs, IActorQuerySourceIdentifyHypermediaTest, MediatorQuerySourceIdentifyHypermedia } from '@comunica/bus-query-source-identify-hypermedia';
import { ActorQuerySourceIdentifyHypermedia } from '@comunica/bus-query-source-identify-hypermedia';
import type { TestResult } from '@comunica/core';
import { ActionContextKey } from '@comunica/core';
/**
 * A comunica None Query Source Identify Hypermedia Actor.
 */
export declare class ActorQuerySourceIdentifyHypermediaAnnotateSource extends ActorQuerySourceIdentifyHypermedia {
    readonly mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    readonly mediatorQuerySourceIdentifyHypermedia: MediatorQuerySourceIdentifyHypermedia;
    constructor(args: IActorQuerySourceIdentifyHypermediaAnnotateSourceArgs);
    testMetadata(action: IActionQuerySourceIdentifyHypermedia): Promise<TestResult<IActorQuerySourceIdentifyHypermediaTest>>;
    run(action: IActionQuerySourceIdentifyHypermedia): Promise<IActorQuerySourceIdentifyHypermediaOutput>;
}
export interface IActorQuerySourceIdentifyHypermediaAnnotateSourceArgs extends IActorQuerySourceIdentifyHypermediaArgs {
    /**
     * A mediator for creating binding context merge handlers
     */
    mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    /**
     * A mediator to create the wrapped query source
     */
    mediatorQuerySourceIdentifyHypermedia: MediatorQuerySourceIdentifyHypermedia;
}
export declare const KEY_CONTEXT_WRAPPED: ActionContextKey<boolean>;
