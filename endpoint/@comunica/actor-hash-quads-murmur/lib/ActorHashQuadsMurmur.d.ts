import type { IActionHashQuads, IActorHashQuadsOutput } from '@comunica/bus-hash-quads';
import { ActorHashQuads } from '@comunica/bus-hash-quads';
import type { TestResult, IActorTest } from '@comunica/core';
/**
 * A comunica Murmur Hash Quads Actor.
 */
export declare class ActorHashQuadsMurmur extends ActorHashQuads {
    test(_action: IActionHashQuads): Promise<TestResult<IActorTest>>;
    run(_action: IActionHashQuads): Promise<IActorHashQuadsOutput>;
}
