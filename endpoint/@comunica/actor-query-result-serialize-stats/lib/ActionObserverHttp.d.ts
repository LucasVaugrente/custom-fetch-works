import type { IActionHttp, IActorHttpOutput } from '@comunica/bus-http';
import type { ActorHttpInvalidateListenable } from '@comunica/bus-http-invalidate';
import type { Actor, IActionObserverArgs, IActorTest } from '@comunica/core';
import { ActionObserver } from '@comunica/core';
/**
 * Observes HTTP actions, and maintains a counter of the number of requests.
 */
export declare class ActionObserverHttp extends ActionObserver<IActionHttp, IActorHttpOutput> {
    readonly httpInvalidator: ActorHttpInvalidateListenable;
    requests: number;
    /**
     * @param args - @defaultNested {<npmd:@comunica/bus-http/^4.0.0/components/ActorHttp.jsonld#ActorHttp_default_bus>} bus
     */
    constructor(args: IActionObserverHttpArgs);
    onRun(_actor: Actor<IActionHttp, IActorTest, IActorHttpOutput, undefined>, _action: IActionHttp, _output: Promise<IActorHttpOutput>): void;
}
export interface IActionObserverHttpArgs extends IActionObserverArgs<IActionHttp, IActorHttpOutput> {
    /**
     * An actor that listens to HTTP invalidation events
     * @default {<default_invalidator> a <npmd:@comunica/bus-http-invalidate/^4.0.0/components/ActorHttpInvalidateListenable.jsonld#ActorHttpInvalidateListenable>}
     */
    httpInvalidator: ActorHttpInvalidateListenable;
}
