import type { IQuadDestination } from '@comunica/bus-rdf-update-quads';
import type { IAction, IActorArgs, IActorOutput, IActorTest, Mediate, TestResult } from '@comunica/core';
import { Actor } from '@comunica/core';
/**
 * A comunica actor for rdf-update-hypermedia events.
 *
 * Actor types:
 * * Input:  IActionRdfUpdateHypermedia:      The metadata in the document.
 * * Test:   <none>
 * * Output: IActorRdfUpdateHypermediaOutput: An RDF destination.
 *
 * @see IActionRdfUpdateHypermedia
 * @see IActorRdfUpdateHypermediaOutput
 */
export declare abstract class ActorRdfUpdateHypermedia<TS = undefined> extends Actor<IActionRdfUpdateHypermedia, IActorTest, IActorRdfUpdateHypermediaOutput, TS> {
    protected readonly destinationType: string;
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {RDF hypermedia updating failed: none of the configured actors were able to handle an update for ${action.url}} busFailMessage
     * @param destinationType - The destination type.
     */
    constructor(args: IActorRdfUpdateHypermediaArgs<TS>, destinationType: string);
    test(action: IActionRdfUpdateHypermedia): Promise<TestResult<IActorTest, TS>>;
    abstract testMetadata(action: IActionRdfUpdateHypermedia): Promise<TestResult<IActorTest, TS>>;
}
export interface IActionRdfUpdateHypermedia extends IAction {
    /**
     * The URL of the destination that was fetched.
     */
    url: string;
    /**
     * A metadata key-value mapping.
     */
    metadata: Record<string, any>;
    /**
     * If the destination already exists.
     */
    exists: boolean;
    /**
     * The explicitly requested destination type.
     * If set, the destination type of the actor MUST explicitly match the given forced type.
     */
    forceDestinationType?: string;
}
export interface IActorRdfUpdateHypermediaOutput extends IActorOutput {
    /**
     * The destination for quads.
     */
    destination: IQuadDestination;
}
export type IActorRdfUpdateHypermediaArgs<TS = undefined> = IActorArgs<IActionRdfUpdateHypermedia, IActorTest, IActorRdfUpdateHypermediaOutput, TS>;
export type MediatorRdfUpdateHypermedia = Mediate<IActionRdfUpdateHypermedia, IActorRdfUpdateHypermediaOutput>;
