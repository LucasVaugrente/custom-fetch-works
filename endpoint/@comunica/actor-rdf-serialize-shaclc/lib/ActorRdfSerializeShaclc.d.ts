import type { IActionRdfSerialize, IActorRdfSerializeFixedMediaTypesArgs, IActorRdfSerializeOutput } from '@comunica/bus-rdf-serialize';
import { ActorRdfSerializeFixedMediaTypes } from '@comunica/bus-rdf-serialize';
/**
 * A comunica SHACL Compact Syntax RDF Serialize Actor.
 */
export declare class ActorRdfSerializeShaclc extends ActorRdfSerializeFixedMediaTypes {
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
    constructor(args: IActorRdfSerializeFixedMediaTypesArgs);
    runHandle(action: IActionRdfSerialize, mediaType: string): Promise<IActorRdfSerializeOutput>;
}
