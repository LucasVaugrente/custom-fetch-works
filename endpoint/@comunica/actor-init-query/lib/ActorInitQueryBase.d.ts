import type { MediatorHttpInvalidate } from '@comunica/bus-http-invalidate';
import type { IActionInit, IActorInitArgs, IActorOutputInit } from '@comunica/bus-init';
import { ActorInit } from '@comunica/bus-init';
import type { MediatorQueryProcess } from '@comunica/bus-query-process';
import type { MediatorQueryResultSerializeHandle, MediatorQueryResultSerializeMediaTypes, MediatorQueryResultSerializeMediaTypeFormats } from '@comunica/bus-query-result-serialize';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A browser-safe comunica Query Init Actor.
 */
export declare class ActorInitQueryBase extends ActorInit implements IActorInitQueryBaseArgs {
    readonly mediatorQueryResultSerialize: MediatorQueryResultSerializeHandle;
    readonly mediatorQueryResultSerializeMediaTypeCombiner: MediatorQueryResultSerializeMediaTypes;
    readonly mediatorQueryResultSerializeMediaTypeFormatCombiner: MediatorQueryResultSerializeMediaTypeFormats;
    readonly mediatorHttpInvalidate: MediatorHttpInvalidate;
    readonly mediatorQueryProcess: MediatorQueryProcess;
    readonly queryString?: string;
    readonly defaultQueryInputFormat?: string;
    readonly allowNoSources?: boolean;
    readonly context?: string;
    test(_action: IActionInit): Promise<TestResult<IActorTest>>;
    run(_action: IActionInit): Promise<IActorOutputInit>;
}
export interface IActorInitQueryBaseArgs extends IActorInitArgs {
    /**
     * The query process mediator
     */
    mediatorQueryProcess: MediatorQueryProcess;
    /**
     * The query serialize mediator
     */
    mediatorQueryResultSerialize: MediatorQueryResultSerializeHandle;
    /**
     * The query serialize media type combinator
     */
    mediatorQueryResultSerializeMediaTypeCombiner: MediatorQueryResultSerializeMediaTypes;
    /**
     * The query serialize media type format combinator
     */
    mediatorQueryResultSerializeMediaTypeFormatCombiner: MediatorQueryResultSerializeMediaTypeFormats;
    /**
     * The HTTP cache invalidation mediator
     */
    mediatorHttpInvalidate: MediatorHttpInvalidate;
    /**
     * A SPARQL query string
     */
    queryString?: string;
    /**
     * The default query input format
     * @default {sparql}
     */
    defaultQueryInputFormat?: string;
    /**
     * If it should be allowed that the user passes no sources.
     * @default {false}
     */
    allowNoSources?: boolean;
    /**
     * A JSON string of a query operation context
     */
    context?: string;
}
