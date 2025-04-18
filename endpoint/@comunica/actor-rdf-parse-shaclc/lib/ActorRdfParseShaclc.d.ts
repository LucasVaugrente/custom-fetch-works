import type { IActionRdfParse, IActorRdfParseFixedMediaTypesArgs, IActorRdfParseOutput } from '@comunica/bus-rdf-parse';
import { ActorRdfParseFixedMediaTypes } from '@comunica/bus-rdf-parse';
import type { IActionContext } from '@comunica/types';
/**
 * A comunica SHACL Compact Syntax RDF Parse Actor.
 */
export declare class ActorRdfParseShaclc extends ActorRdfParseFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "text/shaclc": 1.0,
     *       "text/shaclc-ext": 0.5
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "text/shaclc": "http://www.w3.org/ns/formats/Shaclc",
     *       "text/shaclc-ext": "http://www.w3.org/ns/formats/ShaclcExtended"
     *     }} mediaTypeFormats
     */
    constructor(args: IActorRdfParseFixedMediaTypesArgs);
    runHandle(action: IActionRdfParse, mediaType: string, _context: IActionContext): Promise<IActorRdfParseOutput>;
}
