import type { MediatorMergeBindingsContext } from '@comunica/bus-merge-bindings-context';
import type { IActionQuerySourceIdentify, IActorQuerySourceIdentifyOutput, IActorQuerySourceIdentifyArgs } from '@comunica/bus-query-source-identify';
import { ActorQuerySourceIdentify } from '@comunica/bus-query-source-identify';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica RDFJS Query Source Identify Actor.
 */
export declare class ActorQuerySourceIdentifyRdfJs extends ActorQuerySourceIdentify {
    readonly mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    constructor(args: IActorQuerySourceIdentifyRdfJsArgs);
    test(action: IActionQuerySourceIdentify): Promise<TestResult<IActorTest>>;
    run(action: IActionQuerySourceIdentify): Promise<IActorQuerySourceIdentifyOutput>;
}
export interface IActorQuerySourceIdentifyRdfJsArgs extends IActorQuerySourceIdentifyArgs {
    /**
     * A mediator for creating binding context merge handlers
     */
    mediatorMergeBindingsContext: MediatorMergeBindingsContext;
}
