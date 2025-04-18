import type { IActionSparqlSerialize, IActorQueryResultSerializeFixedMediaTypesArgs, IActorQueryResultSerializeOutput } from '@comunica/bus-query-result-serialize';
import { ActorQueryResultSerializeFixedMediaTypes } from '@comunica/bus-query-result-serialize';
import type { TestResult } from '@comunica/core';
import type { IActionContext } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import { type IXmlNode } from './XmlSerializer';
/**
 * A comunica sparql-results+xml Serialize Actor.
 */
export declare class ActorQueryResultSerializeSparqlXml extends ActorQueryResultSerializeFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "application/sparql-results+xml": 0.8
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "application/sparql-results+xml": "http://www.w3.org/ns/formats/SPARQL_Results_XML"
     *     }} mediaTypeFormats
     */
    constructor(args: IActorQueryResultSerializeFixedMediaTypesArgs);
    /**
     * Converts an RDF term to its object-based XML representation.
     * @param {RDF.Term} value An RDF term.
     * @param {string} key A variable name, '?' must be included as a prefix.
     * @return {IXmlNode} An object-based XML tag.
     */
    static bindingToXmlBindings(value: RDF.Term, key: RDF.Variable): IXmlNode;
    static valueToXmlValue(value: RDF.Term): IXmlNode;
    testHandleChecked(action: IActionSparqlSerialize, _context: IActionContext): Promise<TestResult<boolean>>;
    runHandle(action: IActionSparqlSerialize, _mediaType: string, _context: IActionContext): Promise<IActorQueryResultSerializeOutput>;
}
