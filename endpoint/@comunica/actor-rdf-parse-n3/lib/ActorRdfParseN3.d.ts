import type { IActionRdfParse, IActorRdfParseFixedMediaTypesArgs, IActorRdfParseOutput } from '@comunica/bus-rdf-parse';
import { ActorRdfParseFixedMediaTypes } from '@comunica/bus-rdf-parse';
import type { IActionContext } from '@comunica/types';
/**
 * An N3 RDF Parse actor that listens on the 'rdf-parse' bus.
 *
 * It is able to parse N3-based RDF serializations and announce the presence of them by media type.
 */
export declare class ActorRdfParseN3 extends ActorRdfParseFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "application/n-quads": 1.0,
     *       "application/trig": 0.95,
     *       "application/n-triples": 0.8,
     *       "text/turtle": 0.6,
     *       "text/n3": 0.35
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "application/n-quads": "http://www.w3.org/ns/formats/N-Quads",
     *       "application/trig": "http://www.w3.org/ns/formats/TriG",
     *       "application/n-triples": "http://www.w3.org/ns/formats/N-Triples",
     *       "text/turtle": "http://www.w3.org/ns/formats/Turtle",
     *       "text/n3": "http://www.w3.org/ns/formats/N3"
     *     }} mediaTypeFormats
     */
    constructor(args: IActorRdfParseFixedMediaTypesArgs);
    runHandle(action: IActionRdfParse, mediaType: string, _context: IActionContext): Promise<IActorRdfParseOutput>;
}
