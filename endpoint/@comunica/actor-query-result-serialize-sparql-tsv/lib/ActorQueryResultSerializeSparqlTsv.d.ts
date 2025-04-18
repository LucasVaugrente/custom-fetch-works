import type { IActionSparqlSerialize, IActorQueryResultSerializeFixedMediaTypesArgs, IActorQueryResultSerializeOutput } from '@comunica/bus-query-result-serialize';
import { ActorQueryResultSerializeFixedMediaTypes } from '@comunica/bus-query-result-serialize';
import type { TestResult } from '@comunica/core';
import type { IActionContext } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
/**
 * A comunica SPARQL TSV Query Result Serialize Actor.
 */
export declare class ActorQueryResultSerializeSparqlTsv extends ActorQueryResultSerializeFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "text/tab-separated-values": 0.75
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "text/tab-separated-values": "http://www.w3.org/ns/formats/SPARQL_Results_TSV"
     *     }} mediaTypeFormats
     */
    constructor(args: IActorQueryResultSerializeFixedMediaTypesArgs);
    /**
     * Converts an RDF term to its TSV representation.
     * @param {RDF.Term} value An RDF term.
     * @return {string} A string representation of the given value.
     */
    static bindingToTsvBindings(value?: RDF.Term): string;
    testHandleChecked(action: IActionSparqlSerialize, _context: IActionContext): Promise<TestResult<boolean>>;
    runHandle(action: IActionSparqlSerialize, _mediaType: string | undefined, _context: IActionContext): Promise<IActorQueryResultSerializeOutput>;
}
