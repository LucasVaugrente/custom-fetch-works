import type { IActionRdfResolveHypermediaLinks, IActorRdfResolveHypermediaLinksArgs, IActorRdfResolveHypermediaLinksOutput } from '@comunica/bus-rdf-resolve-hypermedia-links';
import { ActorRdfResolveHypermediaLinks } from '@comunica/bus-rdf-resolve-hypermedia-links';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica Next RDF Resolve Hypermedia Links Actor.
 */
export declare class ActorRdfResolveHypermediaLinksNext extends ActorRdfResolveHypermediaLinks {
    constructor(args: IActorRdfResolveHypermediaLinksArgs);
    test(action: IActionRdfResolveHypermediaLinks): Promise<TestResult<IActorTest>>;
    run(action: IActionRdfResolveHypermediaLinks): Promise<IActorRdfResolveHypermediaLinksOutput>;
}
