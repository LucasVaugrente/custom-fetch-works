import type { IAction, IActorArgs, IActorOutput, IActorTest, Mediate } from '@comunica/core';
import { Actor } from '@comunica/core';
import type { IQuerySourceWrapper, QuerySourceUnidentifiedExpanded } from '@comunica/types';
/**
 * A comunica actor for query-source-identify events.
 *
 * Actor types:
 * * Input:  IActionQuerySourceIdentify:      An unidentified query source.
 * * Test:   <none>
 * * Output: IActorQuerySourceIdentifyOutput: An identified query source.
 *
 * @see IActionQuerySourceIdentify
 * @see IActorQuerySourceIdentifyOutput
 */
export declare abstract class ActorQuerySourceIdentify<TS = undefined> extends Actor<IActionQuerySourceIdentify, IActorTest, IActorQuerySourceIdentifyOutput, TS> {
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Query source identification failed: none of the configured actors were able to identify ${action.querySourceUnidentified.value}} busFailMessage
     */
    constructor(args: IActorQuerySourceIdentifyArgs<TS>);
}
export interface IActionQuerySourceIdentify extends IAction {
    /**
     * An unidentified query source.
     */
    querySourceUnidentified: QuerySourceUnidentifiedExpanded;
}
export interface IActorQuerySourceIdentifyOutput extends IActorOutput {
    /**
     * An identified query source.
     */
    querySource: IQuerySourceWrapper;
}
export type IActorQuerySourceIdentifyArgs<TS = undefined> = IActorArgs<IActionQuerySourceIdentify, IActorTest, IActorQuerySourceIdentifyOutput, TS>;
export type MediatorQuerySourceIdentify = Mediate<IActionQuerySourceIdentify, IActorQuerySourceIdentifyOutput>;
