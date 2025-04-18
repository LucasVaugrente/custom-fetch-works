import type { MediatorHttp } from '@comunica/bus-http';
import type { IActionRdfParse, IActorRdfParseFixedMediaTypesArgs, IActorRdfParseOutput } from '@comunica/bus-rdf-parse';
import { ActorRdfParseFixedMediaTypes } from '@comunica/bus-rdf-parse';
import type { IActorTest, TestResult } from '@comunica/core';
import type { IActionContext } from '@comunica/types';
/**
 * A JSON-LD RDF Parse actor that listens on the 'rdf-parse' bus.
 *
 * It is able to parse JSON-LD-based RDF serializations and announce the presence of them by media type.
 */
export declare class ActorRdfParseJsonLd extends ActorRdfParseFixedMediaTypes {
    readonly mediatorHttp: MediatorHttp;
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "application/ld+json": 1.0,
     *       "application/json": 0.15
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "application/ld+json": "http://www.w3.org/ns/formats/JSON-LD",
     *       "application/json": "http://www.w3.org/ns/formats/JSON-LD"
     *     }} mediaTypeFormats
     */
    constructor(args: IActorRdfParseJsonLdArgs);
    testHandle(action: IActionRdfParse, mediaType: string | undefined, context: IActionContext): Promise<TestResult<IActorTest>>;
    runHandle(action: IActionRdfParse, mediaType: string, actionContext: IActionContext): Promise<IActorRdfParseOutput>;
}
export interface IActorRdfParseJsonLdArgs extends IActorRdfParseFixedMediaTypesArgs {
    /**
     * The HTTP mediator
     */
    mediatorHttp: MediatorHttp;
}
