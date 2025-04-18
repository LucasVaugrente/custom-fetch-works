import type { MediatorHttp } from '@comunica/bus-http';
import type { MediatorMergeBindingsContext } from '@comunica/bus-merge-bindings-context';
import type { IActionQuerySourceIdentifyHypermedia, IActorQuerySourceIdentifyHypermediaOutput, IActorQuerySourceIdentifyHypermediaArgs, IActorQuerySourceIdentifyHypermediaTest } from '@comunica/bus-query-source-identify-hypermedia';
import { ActorQuerySourceIdentifyHypermedia } from '@comunica/bus-query-source-identify-hypermedia';
import type { TestResult } from '@comunica/core';
/**
 * A comunica SPARQL Query Source Identify Hypermedia Actor.
 */
export declare class ActorQuerySourceIdentifyHypermediaSparql extends ActorQuerySourceIdentifyHypermedia {
    readonly mediatorHttp: MediatorHttp;
    readonly mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    readonly checkUrlSuffix: boolean;
    readonly forceHttpGet: boolean;
    readonly cacheSize: number;
    readonly bindMethod: BindMethod;
    readonly countTimeout: number;
    constructor(args: IActorQuerySourceIdentifyHypermediaSparqlArgs);
    testMetadata(action: IActionQuerySourceIdentifyHypermedia): Promise<TestResult<IActorQuerySourceIdentifyHypermediaTest>>;
    run(action: IActionQuerySourceIdentifyHypermedia): Promise<IActorQuerySourceIdentifyHypermediaOutput>;
}
export interface IActorQuerySourceIdentifyHypermediaSparqlArgs extends IActorQuerySourceIdentifyHypermediaArgs {
    /**
     * The HTTP mediator
     */
    mediatorHttp: MediatorHttp;
    /**
     * A mediator for creating binding context merge handlers
     */
    mediatorMergeBindingsContext: MediatorMergeBindingsContext;
    /**
     * If URLs ending with '/sparql' should also be considered SPARQL endpoints.
     * @default {true}
     */
    checkUrlSuffix: boolean;
    /**
     * If non-update queries should be sent via HTTP GET instead of POST
     * @default {false}
     */
    forceHttpGet: boolean;
    /**
     * The cache size for COUNT queries.
     * @range {integer}
     * @default {1024}
     */
    cacheSize?: number;
    /**
     * The query operation for communicating bindings.
     * @default {values}
     */
    bindMethod: BindMethod;
    /**
     * Timeout in ms of how long count queries are allowed to take.
     * If the timeout is reached, an infinity cardinality is returned.
     * @default {3000}
     */
    countTimeout: number;
}
export type BindMethod = 'values' | 'union' | 'filter';
