import type { IActionSparqlSerialize, IActorQueryResultSerializeFixedMediaTypesArgs, IActorQueryResultSerializeOutput } from '@comunica/bus-query-result-serialize';
import { ActorQueryResultSerializeFixedMediaTypes } from '@comunica/bus-query-result-serialize';
import type { TestResult } from '@comunica/core';
import type { BindingsStream, IActionContext } from '@comunica/types';
import type { IConverterSettings } from 'sparqljson-to-tree';
/**
 * A comunica Tree Query Result Serialize Actor.
 */
export declare class ActorQueryResultSerializeTree extends ActorQueryResultSerializeFixedMediaTypes implements IActorQueryResultSerializeFixedMediaTypesArgs {
    /**
     * @param args -
     *   \ @defaultNested {{ "tree": 0.5 }} mediaTypePriorities
     *   \ @defaultNested {{ "tree": "https://comunica.linkeddatafragments.org/#results_tree" }} mediaTypeFormats
     */
    constructor(args: IActorQueryResultSerializeFixedMediaTypesArgs);
    /**
     *
     * @param {BindingsStream} bindingsStream
     * @param context
     * @param {IConverterSettings} converterSettings
     * @return {Promise<string>}
     */
    static bindingsStreamToGraphQl(bindingsStream: BindingsStream, context: IActionContext | Record<string, any> | undefined, converterSettings?: IConverterSettings): Promise<any>;
    testHandleChecked(action: IActionSparqlSerialize): Promise<TestResult<boolean>>;
    runHandle(action: IActionSparqlSerialize, _mediaType: string): Promise<IActorQueryResultSerializeOutput>;
}
