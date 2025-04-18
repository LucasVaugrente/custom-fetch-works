import type { IActionDereference, IActorDereferenceArgs, IActorDereferenceOutput } from '@comunica/bus-dereference';
import { ActorDereference } from '@comunica/bus-dereference';
import type { MediatorHttp } from '@comunica/bus-http';
import type { IActorTest, TestResult } from '@comunica/core';
export declare function mediaTypesToAcceptString(mediaTypes: Record<string, number>, maxLength: number): string;
/**
 * An actor that listens on the 'dereference' bus.
 *
 * It resolves the URL using the HTTP bus using an accept header compiled from the available media types.
 */
export declare abstract class ActorDereferenceHttpBase extends ActorDereference implements IActorDereferenceHttpArgs {
    readonly mediatorHttp: MediatorHttp;
    readonly maxAcceptHeaderLength: number;
    readonly maxAcceptHeaderLengthBrowser: number;
    constructor(args: IActorDereferenceHttpArgs);
    test({ url }: IActionDereference): Promise<TestResult<IActorTest>>;
    run(action: IActionDereference): Promise<IActorDereferenceOutput>;
    protected abstract getMaxAcceptHeaderLength(): number;
}
export interface IActorDereferenceHttpArgs extends IActorDereferenceArgs {
    /**
     * The HTTP mediator.
     */
    mediatorHttp: MediatorHttp;
    /**
     * The maximum allowed accept header value length for non-browser environments.
     * @range {integer}
     * @default {1024}
     */
    maxAcceptHeaderLength: number;
    /**
     * The maximum allowed accept header value length for browser environments.
     * @range {integer}
     * @default {128}
     */
    maxAcceptHeaderLengthBrowser: number;
}
