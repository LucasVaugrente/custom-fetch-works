import type { IActionSparqlSerialize, IActorQueryResultSerializeFixedMediaTypesArgs, IActorQueryResultSerializeOutput } from '@comunica/bus-query-result-serialize';
import { ActorQueryResultSerializeFixedMediaTypes } from '@comunica/bus-query-result-serialize';
import type { TestResult } from '@comunica/core';
import type { Bindings, IActionContext } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import { Readable } from 'readable-stream';
/**
 * A comunica Table Sparql Serialize Actor.
 */
export declare class ActorQueryResultSerializeTable extends ActorQueryResultSerializeFixedMediaTypes implements IActorQueryResultSerializeTableArgs {
    readonly columnWidth: number;
    readonly padding: string;
    /**
     * @param args -
     *   \ @defaultNested {{ "table": 0.6 }} mediaTypePriorities
     *   \ @defaultNested {{ "table": "https://comunica.linkeddatafragments.org/#results_table" }} mediaTypeFormats
     */
    constructor(args: IActorQueryResultSerializeTableArgs);
    static repeat(str: string, count: number): string;
    testHandleChecked(action: IActionSparqlSerialize, _context: IActionContext): Promise<TestResult<boolean>>;
    termToString(term: RDF.Term): string;
    pad(str: string): string;
    pushHeader(data: Readable, labels: RDF.Variable[]): void;
    createRow(labels: RDF.Variable[], bindings: Bindings): string;
    runHandle(action: IActionSparqlSerialize, _mediaType: string, _context: IActionContext): Promise<IActorQueryResultSerializeOutput>;
}
export interface IActorQueryResultSerializeTableArgs extends IActorQueryResultSerializeFixedMediaTypesArgs {
    /**
     * The table column width in number of characters
     * @range {integer}
     * @default {50}
     */
    columnWidth: number;
}
