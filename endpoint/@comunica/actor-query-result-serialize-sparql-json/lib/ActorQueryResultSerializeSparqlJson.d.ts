import type { IActionSparqlSerialize, IActorQueryResultSerializeFixedMediaTypesArgs, IActorQueryResultSerializeOutput } from '@comunica/bus-query-result-serialize';
import { ActorQueryResultSerializeFixedMediaTypes } from '@comunica/bus-query-result-serialize';
import type { TestResult } from '@comunica/core';
import type { IActionContext } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { ActionObserverHttp } from './ActionObserverHttp';
/**
 * A comunica sparql-results+xml Serialize Actor.
 */
export declare class ActorQueryResultSerializeSparqlJson extends ActorQueryResultSerializeFixedMediaTypes {
    private readonly emitMetadata;
    readonly httpObserver: ActionObserverHttp;
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "application/sparql-results+json": 0.8
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "application/sparql-results+json": "http://www.w3.org/ns/formats/SPARQL_Results_JSON"
     *     }} mediaTypeFormats
     *   \ @defaultNested {true} emitMetadata
     *   \ @defaultNested {<default_observer> a <caqrssj:components/ActionObserverHttp.jsonld#ActionObserverHttp>} httpObserver
     */
    constructor(args: IActorQueryResultSerializeSparqlJsonArgs);
    /**
     * Converts an RDF term to its JSON representation.
     * @param {RDF.Term} value An RDF term.
     * @return {any} A JSON object.
     */
    static bindingToJsonBindings(value: RDF.Term): any;
    testHandleChecked(action: IActionSparqlSerialize, _context: IActionContext): Promise<TestResult<boolean>>;
    runHandle(action: IActionSparqlSerialize, _mediaType: string | undefined, _context: IActionContext): Promise<IActorQueryResultSerializeOutput>;
}
export interface IActorQueryResultSerializeSparqlJsonArgs extends IActorQueryResultSerializeFixedMediaTypesArgs {
    emitMetadata: boolean;
    httpObserver: ActionObserverHttp;
}
