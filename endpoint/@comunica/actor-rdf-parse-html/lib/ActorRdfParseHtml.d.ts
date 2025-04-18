import type { IActionRdfParse, IActorRdfParseFixedMediaTypesArgs, IActorRdfParseOutput } from '@comunica/bus-rdf-parse';
import { ActorRdfParseFixedMediaTypes } from '@comunica/bus-rdf-parse';
import type { IActionRdfParseHtml, IActorRdfParseHtmlOutput } from '@comunica/bus-rdf-parse-html';
import type { Actor, Bus, IActorTest } from '@comunica/core';
import type { IActionContext } from '@comunica/types';
/**
 * A comunica HTML RDF Parse Actor.
 * It creates an HTML parser, and delegates its events via the bus-rdf-parse-html bus to other HTML parsing actors.
 */
export declare class ActorRdfParseHtml extends ActorRdfParseFixedMediaTypes {
    private readonly busRdfParseHtml;
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "text/html": 1.0,
     *       "application/xhtml+xml": 0.9
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "text/html": "http://www.w3.org/ns/formats/HTML",
     *       "application/xhtml+xml": "http://www.w3.org/ns/formats/HTML"
     *     }} mediaTypeFormats
     */
    constructor(args: IActorRdfParseHtmlArgs);
    runHandle(action: IActionRdfParse, mediaType: string, context: IActionContext): Promise<IActorRdfParseOutput>;
}
export interface IActorRdfParseHtmlArgs extends IActorRdfParseFixedMediaTypesArgs {
    /**
     * The RDF Parse HTML bus for fetching HTML listeners
     * @default {<npmd:@comunica/bus-rdf-parse-html/^4.0.0/components/ActorRdfParseHtml.jsonld#ActorRdfParseHtml_default_bus>}
     */
    busRdfParseHtml: Bus<Actor<IActionRdfParseHtml, IActorTest, IActorRdfParseHtmlOutput, undefined>, IActionRdfParseHtml, IActorTest, IActorRdfParseHtmlOutput>;
}
