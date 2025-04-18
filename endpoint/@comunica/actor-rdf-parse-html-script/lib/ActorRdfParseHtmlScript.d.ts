import type { MediatorRdfParseHandle, MediatorRdfParseMediaTypes } from '@comunica/bus-rdf-parse';
import type { IActionRdfParseHtml, IActorRdfParseHtmlOutput, IActorRdfParseHtmlArgs } from '@comunica/bus-rdf-parse-html';
import { ActorRdfParseHtml } from '@comunica/bus-rdf-parse-html';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A HTML script RDF Parse actor that listens on the 'rdf-parse' bus.
 *
 * It is able to extract and parse any RDF serialization from script tags in HTML files
 * and announce the presence of them by media type.
 */
export declare class ActorRdfParseHtmlScript extends ActorRdfParseHtml {
    private readonly mediatorRdfParseMediatypes;
    private readonly mediatorRdfParseHandle;
    constructor(args: IActorRdfParseHtmlScriptArgs);
    test(_action: IActionRdfParseHtml): Promise<TestResult<IActorTest>>;
    run(action: IActionRdfParseHtml): Promise<IActorRdfParseHtmlOutput>;
}
export interface IActorRdfParseHtmlScriptArgs extends IActorRdfParseHtmlArgs {
    /**
     * The RDF Parse mediator for collecting media types
     */
    mediatorRdfParseMediatypes: MediatorRdfParseMediaTypes;
    /**
     * The RDF Parse mediator for handling parsing
     */
    mediatorRdfParseHandle: MediatorRdfParseHandle;
}
