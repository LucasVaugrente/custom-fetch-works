import type { IActorContextPreprocessOutput, IActorContextPreprocessArgs, MediatorContextPreprocess } from '@comunica/bus-context-preprocess';
import { ActorContextPreprocess } from '@comunica/bus-context-preprocess';
import type { ActorHttpInvalidateListenable } from '@comunica/bus-http-invalidate';
import type { MediatorQuerySourceIdentify } from '@comunica/bus-query-source-identify';
import type { IAction, IActorTest, TestResult } from '@comunica/core';
import type { IQuerySourceWrapper, QuerySourceUnidentified, QuerySourceUnidentifiedExpanded, IActionContext } from '@comunica/types';
import { LRUCache } from 'lru-cache';
/**
 * A comunica Query Source Identify Context Preprocess Actor.
 */
export declare class ActorContextPreprocessQuerySourceIdentify extends ActorContextPreprocess {
    readonly cacheSize: number;
    readonly httpInvalidator: ActorHttpInvalidateListenable;
    readonly mediatorQuerySourceIdentify: MediatorQuerySourceIdentify;
    readonly mediatorContextPreprocess: MediatorContextPreprocess;
    readonly cache?: LRUCache<string, Promise<IQuerySourceWrapper>>;
    constructor(args: IActorContextPreprocessQuerySourceIdentifyArgs);
    test(_action: IAction): Promise<TestResult<IActorTest>>;
    run(action: IAction): Promise<IActorContextPreprocessOutput>;
    expandSource(querySource: QuerySourceUnidentified): Promise<QuerySourceUnidentifiedExpanded>;
    identifySource(querySourceUnidentified: QuerySourceUnidentifiedExpanded, context: IActionContext): Promise<IQuerySourceWrapper>;
}
export interface IActorContextPreprocessQuerySourceIdentifyArgs extends IActorContextPreprocessArgs {
    /**
     * The maximum number of entries in the LRU cache, set to 0 to disable.
     * @range {integer}
     * @default {100}
     */
    cacheSize: number;
    /**
     * An actor that listens to HTTP invalidation events
     * @default {<default_invalidator> a <npmd:@comunica/bus-http-invalidate/^4.0.0/components/ActorHttpInvalidateListenable.jsonld#ActorHttpInvalidateListenable>}
     */
    httpInvalidator: ActorHttpInvalidateListenable;
    /**
     * Mediator for identifying query sources.
     */
    mediatorQuerySourceIdentify: MediatorQuerySourceIdentify;
    /**
     * The context processing combinator
     */
    mediatorContextPreprocess: MediatorContextPreprocess;
}
