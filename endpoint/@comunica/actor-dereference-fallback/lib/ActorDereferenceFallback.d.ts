import type { IActionDereference, IActorDereferenceOutput, IActorDereferenceArgs } from '@comunica/bus-dereference';
import { ActorDereference } from '@comunica/bus-dereference';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Fallback Dereference Actor.
 */
export declare class ActorDereferenceFallback extends ActorDereference {
    constructor(args: IActorDereferenceArgs);
    test(_action: IActionDereference): Promise<TestResult<IActorTest>>;
    run(action: IActionDereference): Promise<IActorDereferenceOutput>;
}
