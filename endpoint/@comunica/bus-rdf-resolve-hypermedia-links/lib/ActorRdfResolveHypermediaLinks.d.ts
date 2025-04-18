import type { IAction, IActorArgs, IActorOutput, IActorTest, Mediate } from '@comunica/core';
import { Actor } from '@comunica/core';
import type { ILink } from '@comunica/types';
/**
 * A comunica actor for rdf-resolve-hypermedia-links events.
 *
 * Actor types:
 * * Input:  IActionRdfResolveHypermediaLinks:      The metadata from which the links should be extracted.
 * * Test:   <none>
 * * Output: IActorRdfResolveHypermediaLinksOutput: The URLs that were detected.
 *
 * @see IActionRdfResolveHypermediaLinks
 * @see IActorRdfResolveHypermediaLinksOutput
 */
export declare abstract class ActorRdfResolveHypermediaLinks<TS = undefined> extends Actor<IActionRdfResolveHypermediaLinks, IActorTest, IActorRdfResolveHypermediaLinksOutput, TS> {
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Hypermedia link resolution failed: none of the configured actors were able to resolve links from metadata} busFailMessage
     */
    constructor(args: IActorRdfResolveHypermediaLinksArgs<TS>);
}
export interface IActionRdfResolveHypermediaLinks extends IAction {
    /**
     * The metadata from which the links should be extracted.
     */
    metadata: Record<string, any>;
}
export interface IActorRdfResolveHypermediaLinksOutput extends IActorOutput {
    /**
     * An array of links to follow.
     */
    links: ILink[];
}
export type IActorRdfResolveHypermediaLinksArgs<TS = undefined> = IActorArgs<IActionRdfResolveHypermediaLinks, IActorTest, IActorRdfResolveHypermediaLinksOutput, TS>;
export type MediatorRdfResolveHypermediaLinks = Mediate<IActionRdfResolveHypermediaLinks, IActorRdfResolveHypermediaLinksOutput>;
