import type { IActionRdfParse, IActorRdfParseFixedMediaTypesArgs, IActorRdfParseOutput } from '@comunica/bus-rdf-parse';
import { ActorRdfParseFixedMediaTypes } from '@comunica/bus-rdf-parse';
/**
 * A comunica RDF/XML RDF Parse Actor.
 */
export declare class ActorRdfParseRdfXml extends ActorRdfParseFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "application/rdf+xml": 1.0
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "application/rdf+xml": "http://www.w3.org/ns/formats/RDF_XML"
     *     }} mediaTypeFormats
     */
    constructor(args: IActorRdfParseFixedMediaTypesArgs);
    runHandle(action: IActionRdfParse): Promise<IActorRdfParseOutput>;
}
