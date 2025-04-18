import type { IActionSparqlSerialize, IActorQueryResultSerializeFixedMediaTypesArgs, IActorQueryResultSerializeOutput } from '@comunica/bus-query-result-serialize';
import { ActorQueryResultSerializeFixedMediaTypes } from '@comunica/bus-query-result-serialize';
import type { TestResult } from '@comunica/core';
import type { IActionContext } from '@comunica/types';
import { Readable } from 'readable-stream';
import type { ActionObserverHttp } from './ActionObserverHttp';
/**
 * Serializes SPARQL results for testing and debugging.
 */
export declare class ActorQueryResultSerializeStats extends ActorQueryResultSerializeFixedMediaTypes {
    readonly httpObserver: ActionObserverHttp;
    /**
     * @param args -
     *   \ @defaultNested {{ "stats": 0.5 }} mediaTypePriorities
     *   \ @defaultNested {{ "stats": "https://comunica.linkeddatafragments.org/#results_stats" }} mediaTypeFormats
     *   \ @defaultNested {<default_observer> a <caqrsst:components/ActionObserverHttp.jsonld#ActionObserverHttp>} httpObserver
     */
    constructor(args: IActorQueryResultSerializeStatsArgs);
    testHandleChecked(action: IActionSparqlSerialize, _context: IActionContext): Promise<TestResult<boolean>>;
    pushHeader(data: Readable): void;
    createStat(startTime: number, result: number): string;
    createSpecialLine(label: string, startTime: number): string;
    runHandle(action: IActionSparqlSerialize, _mediaType: string, _context: IActionContext): Promise<IActorQueryResultSerializeOutput>;
    now(): number;
    delay(startTime: number): number;
}
export interface IActorQueryResultSerializeStatsArgs extends IActorQueryResultSerializeFixedMediaTypesArgs {
    httpObserver: ActionObserverHttp;
}
