import type { Actor, IAction, IActorOutput, IActorTest } from './Actor';
import type { Bus, IActorReply } from './Bus';
import type { TestResult } from './TestResult';
/**
 * A mediator can mediate an action over a bus of actors.
 *
 * It does the following:
 * 1. Accepts an action in {@link Mediator#mediate}.
 * 2. Sends the action to the bus to test its applicability on all actors.
 * 3. It _mediates_ over these test results.
 * 4. It selects the _best_ actor.
 * 5. The action is run by the _best_ actor, and the result if returned.
 *
 * The _mediates_ and _best_ parts are filled in by subclasses of this abstract Mediator class.
 *
 * @template A The type of actor to mediator over.
 * @template I The input type of an actor.
 * @template T The test type of an actor.
 * @template O The output type of an actor.
 */
export declare abstract class Mediator<A extends Actor<I, T, O, TS>, I extends IAction, T extends IActorTest, O extends IActorOutput, TS = undefined> implements IMediatorArgs<A, I, T, O, TS> {
    readonly name: string;
    readonly bus: Bus<A, I, T, O, TS>;
    /**
     * All enumerable properties from the `args` object are inherited to this mediator.
     *
     * @param {IMediatorArgs<A extends Actor<I, T, O>, I extends IAction, T extends IActorTest,
     * O extends IActorOutput>} args Arguments object
     * @param {string} args.name The name for this mediator.
     * @param {Bus<A extends Actor<I, T, O>, I extends IAction, T extends IActorTest, O extends IActorOutput>} args.bus
     *        The bus this mediator will mediate over.
     * @throws When required arguments are missing.
     */
    protected constructor(args: IMediatorArgs<A, I, T, O, TS>);
    /**
     * Publish the given action in the bus.
     *
     * This will send the test action on all actors in the bus.
     * All actor replies will be returned.
     *
     * @param {I} action The action to mediate for.
     * @return {IActorReply<A extends Actor<I, T, O>, I extends IAction, T extends IActorTest, O extends IActorOutput>[]}
     * The list of actor replies.
     */
    publish(action: I): IActorReply<A, I, T, O, TS>[];
    /**
     * Mediate for the given action to get an actor.
     *
     * This will send the test action on all actors in the bus.
     * The actor that tests _best_ will be returned.
     *
     * @param {I} action The action to mediate for.
     * @return {Promise<O extends IActorOutput>} A promise that resolves to the _best_ actor.
     */
    mediateActor(action: I): Promise<TestResult<A, TS>>;
    /**
     * Mediate for the given action.
     *
     * This will send the test action on all actors in the bus.
     * The action will be run on the actor that tests _best_,
     * of which the result will be returned.
     *
     * @param {I} action The action to mediate for.
     * @return {Promise<O extends IActorOutput>} A promise that resolves to the mediation result.
     */
    mediateTestable(action: I): Promise<TestResult<O, TS>>;
    /**
     * Mediate for the given action.
     *
     * This will send the test action on all actors in the bus.
     * The action will be run on the actor that tests _best_,
     * of which the result will be returned.
     *
     * @param {I} action The action to mediate for.
     * @return {Promise<O extends IActorOutput>} A promise that resolves to the mediation result.
     */
    mediate(action: I): Promise<O>;
    /**
     * Mediate for the given action with the given actor test results for the action.
     *
     * One actor must be returned that provided the _best_ test result.
     * How '_best_' is interpreted, depends on the implementation of the Mediator.
     *
     * @param {I} action The action to mediate for.
     * @param {IActorReply<A extends Actor<I, T, O>, I extends IAction, T extends IActorTest,
     * O extends IActorOutput>[]} testResults The actor test results for the action.
     * @return {Promise<A extends Actor<I, T, O>>} A promise that resolves to the _best_ actor.
     */
    protected abstract mediateWith(action: I, testResults: IActorReply<A, I, T, O, TS>[]): Promise<TestResult<A, TS>>;
    /**
     * Construct a human-friendly failure message that accumulates the given actors's failure messages.
     * @param action The action that was executed.
     * @param actorFailures The failure messages that were collected from actor tests based on the given executed action.
     * @protected
     */
    protected constructFailureMessage(action: I, actorFailures: string[]): string;
    protected static getObjectValue(obj: any, path: string[]): any;
}
export interface IMediatorArgs<A extends Actor<I, T, O, TS>, I extends IAction, T extends IActorTest, O extends IActorOutput, TS = undefined> {
    /**
     * The name for this mediator.
     * @default {<rdf:subject>}
     */
    name: string;
    /**
     * The bus this mediator will mediate over.
     */
    bus: Bus<A, I, T, O, TS>;
}
export type Mediate<I extends IAction, O extends IActorOutput, T extends IActorTest = IActorTest, TS = undefined> = Mediator<Actor<I, T, O, TS>, I, T, O, TS>;
