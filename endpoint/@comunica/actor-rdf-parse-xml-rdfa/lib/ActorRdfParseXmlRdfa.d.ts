import type { IActionRdfParse, IActorRdfParseFixedMediaTypesArgs, IActorRdfParseOutput } from '@comunica/bus-rdf-parse';
import { ActorRdfParseFixedMediaTypes } from '@comunica/bus-rdf-parse';
import type { IActionContext } from '@comunica/types';
/**
 * A comunica XML RDFa RDF Parse Actor.
 */
export declare class ActorRdfParseXmlRdfa extends ActorRdfParseFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "application/xml": 1.0,
     *       "text/xml": 1.0,
     *       "image/svg+xml": 1.0
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "application/xml": "http://www.w3.org/ns/formats/RDFa",
     *       "text/xml": "http://www.w3.org/ns/formats/RDFa",
     *       "image/svg+xml": "http://www.w3.org/ns/formats/RDFa"
     *     }} mediaTypeFormats
     */
    constructor(args: IActorRdfParseFixedMediaTypesArgs);
    runHandle(action: IActionRdfParse, _mediaType: string, _context: IActionContext): Promise<IActorRdfParseOutput>;
}
