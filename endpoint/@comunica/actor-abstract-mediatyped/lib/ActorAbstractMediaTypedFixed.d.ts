import type { TestResult } from '@comunica/core';
import type { IActionContext } from '@comunica/types';
import type { IActorArgsMediaTyped } from './ActorAbstractMediaTyped';
import { ActorAbstractMediaTyped } from './ActorAbstractMediaTyped';
export declare abstract class ActorAbstractMediaTypedFixed<HI, HT, HO> extends ActorAbstractMediaTyped<HI, HT, HO> {
    readonly mediaTypePriorities: Record<string, number>;
    readonly mediaTypeFormats: Record<string, string>;
    readonly priorityScale: number;
    constructor(args: IActorArgsMediaTypedFixed<HI, HT, HO>);
    testHandle(action: HI, mediaType: string | undefined, context: IActionContext): Promise<TestResult<HT>>;
    /**
     * Check to see if this actor can handle the given action.
     * The media type has already been checked before this is called.
     *
     * @param {ActionContext} context An optional context.
     * @param {HI} action The action to test.
     */
    abstract testHandleChecked(action: HI, context: IActionContext): Promise<TestResult<HT>>;
    testMediaType(_context: IActionContext): Promise<TestResult<boolean>>;
    getMediaTypes(_context: IActionContext): Promise<Record<string, number>>;
    testMediaTypeFormats(_context: IActionContext): Promise<TestResult<boolean>>;
    getMediaTypeFormats(_context: IActionContext): Promise<Record<string, string>>;
}
export interface IActorArgsMediaTypedFixed<HI, HT, HO> extends IActorArgsMediaTyped<HI, HT, HO> {
    /**
     * A record of media types, with media type name as key, and its priority as value.
     * Priorities are numbers between [0, 1].
     * @range {json}
     */
    mediaTypePriorities: Record<string, number>;
    /**
     * A record of media types, with media type name as key, and its format IRI as value.
     * @range {json}
     */
    mediaTypeFormats: Record<string, string>;
    /**
     * A multiplier for media type priorities.
     * This can be used for keeping the original media types in place,
     * but scaling all of their scores with a certain value.
     * @range {double}
     */
    priorityScale?: number;
}
