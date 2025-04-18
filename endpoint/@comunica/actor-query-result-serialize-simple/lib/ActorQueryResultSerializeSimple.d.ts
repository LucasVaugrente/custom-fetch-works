import type { IActionSparqlSerialize, IActorQueryResultSerializeFixedMediaTypesArgs, IActorQueryResultSerializeOutput } from '@comunica/bus-query-result-serialize';
import { ActorQueryResultSerializeFixedMediaTypes } from '@comunica/bus-query-result-serialize';
import type { TestResult } from '@comunica/core';
import type { IActionContext } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
/**
 * A comunica Simple Sparql Serialize Actor.
 */
export declare class ActorQueryResultSerializeSimple extends ActorQueryResultSerializeFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{ "simple": 0.9 }} mediaTypePriorities
     *   \ @defaultNested {{ "simple": "https://comunica.linkeddatafragments.org/#results_simple" }} mediaTypeFormats
     */
    constructor(args: IActorQueryResultSerializeFixedMediaTypesArgs);
    testHandleChecked(action: IActionSparqlSerialize, _context: IActionContext): Promise<TestResult<boolean>>;
    protected static termToString(term: RDF.Term): string;
    runHandle(action: IActionSparqlSerialize, _mediaType: string, _context: IActionContext): Promise<IActorQueryResultSerializeOutput>;
}
