import type { IActionQuerySourceIdentify, IActorQuerySourceIdentifyOutput, IActorQuerySourceIdentifyArgs, MediatorQuerySourceIdentify } from '@comunica/bus-query-source-identify';
import { ActorQuerySourceIdentify } from '@comunica/bus-query-source-identify';
import type { MediatorRdfParseHandle } from '@comunica/bus-rdf-parse';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IQuerySourceSerialized, IActionContext } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
/**
 * A comunica Serialized Query Source Identify Actor.
 */
export declare class ActorQuerySourceIdentifySerialized extends ActorQuerySourceIdentify {
    readonly cacheSize: number;
    readonly mediatorRdfParse: MediatorRdfParseHandle;
    readonly mediatorQuerySourceIdentify: MediatorQuerySourceIdentify;
    constructor(args: IActorQuerySourceIdentifySerializedArgs);
    test(action: IActionQuerySourceIdentify): Promise<TestResult<IActorTest>>;
    run(action: IActionQuerySourceIdentify): Promise<IActorQuerySourceIdentifyOutput>;
    /**
     * Parses the string data source through the RDF parse bus, returning the RDF source.
     * @param context The run action context
     * @param source The source from the run action context
     * @returns Parsed RDF source that can be passed to quad pattern resolve mediator as an RDF/JS source
     */
    protected getRdfSource(context: IActionContext, source: IQuerySourceSerialized): Promise<RDF.Source>;
    private isStringSource;
}
export interface IActorQuerySourceIdentifySerializedArgs extends IActorQuerySourceIdentifyArgs {
    /**
     * The quad pattern parser mediator.
     */
    mediatorRdfParse: MediatorRdfParseHandle;
    /**
     * The query source identify mediator.
     */
    mediatorQuerySourceIdentify: MediatorQuerySourceIdentify;
}
