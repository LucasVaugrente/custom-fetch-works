import type { IActionDereference, IActorDereferenceArgs, IActorDereferenceOutput } from '@comunica/bus-dereference';
import { ActorDereference } from '@comunica/bus-dereference';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica File Dereference Actor.
 */
export declare class ActorDereferenceFile extends ActorDereference {
    constructor(args: IActorDereferenceArgs);
    test({ url }: IActionDereference): Promise<TestResult<IActorTest>>;
    private static isURI;
    run({ url }: IActionDereference): Promise<IActorDereferenceOutput>;
}
