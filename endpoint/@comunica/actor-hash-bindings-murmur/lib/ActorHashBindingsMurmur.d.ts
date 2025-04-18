import type { IActionHashBindings, IActorHashBindingsOutput } from '@comunica/bus-hash-bindings';
import { ActorHashBindings } from '@comunica/bus-hash-bindings';
import type { TestResult, IActorTest } from '@comunica/core';
/**
 * A comunica Murmur Hash Bindings Actor.
 */
export declare class ActorHashBindingsMurmur extends ActorHashBindings {
    test(_action: IActionHashBindings): Promise<TestResult<IActorTest>>;
    run(_action: IActionHashBindings): Promise<IActorHashBindingsOutput>;
}
