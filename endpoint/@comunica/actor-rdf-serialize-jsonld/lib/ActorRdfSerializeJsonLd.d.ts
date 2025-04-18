import type { IActionRdfSerialize, IActorRdfSerializeFixedMediaTypesArgs, IActorRdfSerializeOutput } from '@comunica/bus-rdf-serialize';
import { ActorRdfSerializeFixedMediaTypes } from '@comunica/bus-rdf-serialize';
import type { IActionContext } from '@comunica/types';
/**
 * A comunica Jsonld RDF Serialize Actor.
 */
export declare class ActorRdfSerializeJsonLd extends ActorRdfSerializeFixedMediaTypes {
    /**
     * The number of spaces that should be used to indent stringified JSON.
     */
    readonly jsonStringifyIndentSpaces: number;
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "application/ld+json": 1.0
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "application/ld+json": "http://www.w3.org/ns/formats/JSON-LD"
     *     }} mediaTypeFormats
     */
    constructor(args: IActorRdfSerializeJsonLdArgs);
    runHandle(action: IActionRdfSerialize, _mediaType: string, _context: IActionContext): Promise<IActorRdfSerializeOutput>;
}
export interface IActorRdfSerializeJsonLdArgs extends IActorRdfSerializeFixedMediaTypesArgs {
    /**
     * The number of spaces that should be used to indent stringified JSON.
     * @range {integer}
     * @default {2}
     */
    jsonStringifyIndentSpaces: number;
}
