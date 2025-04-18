import type { IActionInit, IActorOutputInit } from '@comunica/bus-init';
import type { Actor, Bus, IAction, IActorOutput, IActorTest } from '@comunica/core';
/**
 * A Runner is used to instantiate a comunica workflow.
 *
 * It is instantiated dynamically using a Components.js config file.
 * A bus and a list of actors are injected into this runner dynamically.
 *
 * The {@link Runner#run} function must be called to instantiate the workflow.
 */
export declare class Runner {
    readonly busInit: Bus<Actor<IAction, IActorTest, IActorOutput, any>, IAction, IActorTest, IActorOutput, any>;
    readonly actors: Actor<IAction, IActorTest, IActorOutput, any>[];
    /**
     * @param busInit - The 'init' event bus. @default {<npmd:@comunica/bus-init/^4.0.0/components/ActorInit.jsonld#ActorInit_default_bus>}
     * @param actors - The list of all actors that are part of the comunica workflow.
     */
    constructor(busInit: Bus<Actor<IAction, IActorTest, IActorOutput, any>, IAction, IActorTest, IActorOutput, any>, actors: Actor<IAction, IActorTest, IActorOutput, any>[]);
    /**
     * Run a comunica workflow.
     *
     * @param {IActionInit} action An 'init' action.
     * @return {Promise<void>}     A promise that resolves when the init actors are triggered.
     */
    run(action: IActionInit): Promise<IActorOutputInit[]>;
    /**
     * Collect the given actors that are available in this runner.
     *
     * Example:
     * <pre>
     *   const { engine } = runner.collectActors({ engine: 'urn:comunica:default:init/actors#query' };
     *   // engine is an actor instance
     * </pre>
     *
     * An error will be thrown if any of the actors could not be found in the runner.
     *
     * @param actorIdentifiers A mapping of keys to actor identifiers.
     * @return A mapping of keys to actor instances.
     */
    collectActors(actorIdentifiers: Record<string, string>): Record<string, Actor<IAction, IActorTest, IActorOutput, any>>;
}
