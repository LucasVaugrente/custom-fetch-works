import type { IActionRdfResolveHypermediaLinksQueue, IActorRdfResolveHypermediaLinksQueueArgs, IActorRdfResolveHypermediaLinksQueueOutput } from '@comunica/bus-rdf-resolve-hypermedia-links-queue';
import { ActorRdfResolveHypermediaLinksQueue } from '@comunica/bus-rdf-resolve-hypermedia-links-queue';
import type { IActorTest, TestResult } from '@comunica/core';
/**
 * A comunica FIFO RDF Resolve Hypermedia Links Queue Actor.
 */
export declare class ActorRdfResolveHypermediaLinksQueueFifo extends ActorRdfResolveHypermediaLinksQueue {
    constructor(args: IActorRdfResolveHypermediaLinksQueueArgs);
    test(_action: IActionRdfResolveHypermediaLinksQueue): Promise<TestResult<IActorTest>>;
    run(_action: IActionRdfResolveHypermediaLinksQueue): Promise<IActorRdfResolveHypermediaLinksQueueOutput>;
}
