import type { IActionSparqlSerialize, IActorQueryResultSerializeFixedMediaTypesArgs, IActorQueryResultSerializeOutput } from '@comunica/bus-query-result-serialize';
import { ActorQueryResultSerializeFixedMediaTypes } from '@comunica/bus-query-result-serialize';
import type { TestResult } from '@comunica/core';
import type { IActionContext } from '@comunica/types';
/**
 * A comunica JSON Query Result Serialize Actor.
 */
export declare class ActorQueryResultSerializeJson extends ActorQueryResultSerializeFixedMediaTypes {
    /**
     * @param args -
     *   \ @defaultNested {{
     *       "application/json": 1.0
     *     }} mediaTypePriorities
     *   \ @defaultNested {{
     *       "application/json": "https://comunica.linkeddatafragments.org/#results_JSON"
     *     }} mediaTypeFormats
     */
    constructor(args: IActorQueryResultSerializeFixedMediaTypesArgs);
    testHandleChecked(action: IActionSparqlSerialize, _context: IActionContext): Promise<TestResult<boolean>>;
    runHandle(action: IActionSparqlSerialize, _mediaType: string, _context: IActionContext): Promise<IActorQueryResultSerializeOutput>;
}
