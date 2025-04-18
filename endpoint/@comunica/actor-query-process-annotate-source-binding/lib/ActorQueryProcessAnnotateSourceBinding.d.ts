import type { IActionQueryProcess, IActorQueryProcessOutput, IActorQueryProcessArgs, MediatorQueryProcess } from '@comunica/bus-query-process';
import { ActorQueryProcess } from '@comunica/bus-query-process';
import type { IActorTest, TestResult } from '@comunica/core';
import { ActionContextKey } from '@comunica/core';
import type { BindingsStream } from '@comunica/types';
/**
 * A comunica Annotate Source Binding Query Process Actor.
 */
export declare class ActorQueryProcessAnnotateSourceBinding extends ActorQueryProcess {
    private readonly dataFactory;
    readonly mediatorQueryProcess: MediatorQueryProcess;
    constructor(args: IActorQueryProcessAnnotateSourceBindingArgs);
    test(action: IActionQueryProcess): Promise<TestResult<IActorTest>>;
    run(action: IActionQueryProcess): Promise<IActorQueryProcessOutput>;
    addSourcesToBindings(iterator: BindingsStream): BindingsStream;
}
export interface IActorQueryProcessAnnotateSourceBindingArgs extends IActorQueryProcessArgs {
    /**
     * The query process mediator so we can call our wrapped actor
     */
    mediatorQueryProcess: MediatorQueryProcess;
}
export declare const KEY_CONTEXT_WRAPPED: ActionContextKey<boolean>;
