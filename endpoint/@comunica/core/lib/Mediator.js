"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mediator = void 0;
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
class Mediator {
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
    constructor(args) {
        Object.assign(this, args);
    }
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
    publish(action) {
        // Test all actors in the bus
        const actors = this.bus.publish(action);
        if (actors.length === 0) {
            throw new Error(`No actors are able to reply to a message in the bus ${this.bus.name}`);
        }
        return actors;
    }
    /**
     * Mediate for the given action to get an actor.
     *
     * This will send the test action on all actors in the bus.
     * The actor that tests _best_ will be returned.
     *
     * @param {I} action The action to mediate for.
     * @return {Promise<O extends IActorOutput>} A promise that resolves to the _best_ actor.
     */
    async mediateActor(action) {
        // Mediate to one actor and run that actor.
        return await this.mediateWith(action, this.publish(action));
    }
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
    async mediateTestable(action) {
        // Mediate to one actor and run the action on it
        const actorResult = await this.mediateActor(action);
        return actorResult.mapAsync((actor, sideData) => actor.runObservable(action, sideData));
    }
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
    async mediate(action) {
        const testable = await this.mediateTestable(action);
        return testable.getOrThrow();
    }
    /**
     * Construct a human-friendly failure message that accumulates the given actors's failure messages.
     * @param action The action that was executed.
     * @param actorFailures The failure messages that were collected from actor tests based on the given executed action.
     * @protected
     */
    constructFailureMessage(action, actorFailures) {
        const prefix = `\n        `;
        const failMessage = this.bus.failMessage
            .replaceAll(/\$\{(.*?)\}/gu, (match, key) => Mediator
            .getObjectValue({ action }, key.split('.')) || match);
        return `${failMessage}\n    Error messages of failing actors:${prefix}${actorFailures.join(prefix)}`;
    }
    static getObjectValue(obj, path) {
        if (path.length === 0) {
            return obj;
        }
        if (obj) {
            return Mediator.getObjectValue(obj[path[0]], path.slice(1));
        }
        return undefined;
    }
}
exports.Mediator = Mediator;
//# sourceMappingURL=Mediator.js.map