import type { IActionHttp, IActorHttpArgs, IActorHttpOutput, MediatorHttp } from '@comunica/bus-http';
import { ActorHttp } from '@comunica/bus-http';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Memento Http Actor.
 */
export declare class ActorHttpMemento extends ActorHttp {
    readonly mediatorHttp: MediatorHttp;
    constructor(args: IActorHttpMementoArgs);
    test(action: IActionHttp): Promise<TestResult<IActorTest>>;
    run(action: IActionHttp): Promise<IActorHttpOutput>;
}
export interface IActorHttpMementoArgs extends IActorHttpArgs {
    /**
     * The HTTP mediator
     */
    mediatorHttp: MediatorHttp;
}
