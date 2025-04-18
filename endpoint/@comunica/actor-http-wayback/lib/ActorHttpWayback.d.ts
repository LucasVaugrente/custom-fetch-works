import type { IActionHttp, IActorHttpArgs, IActorHttpOutput, MediatorHttp } from '@comunica/bus-http';
import { ActorHttp } from '@comunica/bus-http';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A Comunica actor to intercept HTTP requests to recover broken links using the WayBack Machine
 */
export declare class ActorHttpWayback extends ActorHttp {
    readonly mediatorHttp: MediatorHttp;
    constructor(args: IActorHttpWaybackArgs);
    test(_action: IActionHttp): Promise<TestResult<IActorTest>>;
    run(action: IActionHttp): Promise<IActorHttpOutput>;
}
export interface IActorHttpWaybackArgs extends IActorHttpArgs {
    mediatorHttp: MediatorHttp;
}
