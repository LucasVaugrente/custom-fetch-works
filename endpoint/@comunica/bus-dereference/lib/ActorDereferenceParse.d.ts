import type { MediateMediaTyped, MediateMediaTypes } from '@comunica/actor-abstract-mediatyped';
import type { IActionParse, IActorParseOutput, IParseMetadata } from '@comunica/actor-abstract-parse';
import type { IActorArgs, IActorTest, TestResult } from '@comunica/core';
import type { Readable } from 'readable-stream';
import type { IActionDereference, IActorDereferenceOutput, MediatorDereference } from './ActorDereference';
import { ActorDereferenceBase } from './ActorDereferenceBase';
/**
 * Get the media type based on the extension of the given path,
 * which can be an URL or file path.
 * @param {string} path A path.
 * @param {Record<string, string>} mediaMappings A collection of mappings,
 * mapping file extensions to their corresponding media type.
 * @return {string} A media type or the empty string.
 */
export declare function getMediaTypeFromExtension(path: string, mediaMappings?: Record<string, string>): string;
export interface IActorDereferenceParseArgs<S, K extends IParseMetadata = IParseMetadata, M extends IParseMetadata = IParseMetadata> extends IActorArgs<IActionDereferenceParse<K>, IActorTest, IActorDereferenceParseOutput<S, M>> {
    mediatorDereference: MediatorDereference;
    mediatorParse: MediateMediaTyped<IActionParse<K>, IActorTest, IActorParseOutput<S, M>>;
    mediatorParseMediatypes: MediateMediaTypes;
    /**
     * A collection of mappings, mapping file extensions to their corresponding media type.
     * @range {json}
     */
    mediaMappings: Record<string, string>;
}
/**
 * An abstract actor that handles dereference and parse actions.
 *
 * Actor types:
 * Input:  IActionDereferenceParse:      A URL.
 * Test:   <none>
 * Output: IActorDereferenceParseOutput: A data stream of type output by the Parser.
 *
 */
export declare abstract class ActorDereferenceParse<S, K extends IParseMetadata = IParseMetadata, M extends IParseMetadata = IParseMetadata> extends ActorDereferenceBase<IActionDereferenceParse<K>, IActorTest, IActorDereferenceParseOutput<S, M>> {
    readonly mediatorDereference: MediatorDereference;
    readonly mediatorParse: MediateMediaTyped<IActionParse<K>, IActorTest, IActorParseOutput<S, M>>;
    readonly mediatorParseMediatypes: MediateMediaTypes;
    readonly mediaMappings: Record<string, string>;
    constructor(args: IActorDereferenceParseArgs<S, K, M>);
    test(_action: IActionDereference): Promise<TestResult<IActorTest>>;
    /**
     * If hard errors are disabled, modify the given stream so that errors are delegated to the logger.
     * @param {IActionDereferenceParse} action A dereference action.
     * @param {Readable} data A data stream.
     * @return {Readable} The resulting data stream.
     */
    protected handleDereferenceStreamErrors<L extends IParseMetadata, T extends Readable>(action: IActionDereferenceParse<L>, data: T): T;
    abstract getMetadata(dereference: IActorDereferenceOutput): Promise<K | undefined>;
    run(action: IActionDereferenceParse<K>): Promise<IActorDereferenceParseOutput<S, M>>;
}
export interface IActionDereferenceParse<T extends IParseMetadata = IParseMetadata> extends IActionDereference {
    /**
     * The mediatype of the source (if it can't be inferred from the source)
     */
    mediaType?: string;
    /**
     * Metadata to be given to the parser
     */
    metadata?: T;
}
export type IActorDereferenceParseOutput<T, K extends IParseMetadata = IParseMetadata> = Omit<IActorDereferenceOutput, 'data'> & IActorParseOutput<T, K>;
