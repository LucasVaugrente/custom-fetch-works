"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bus = void 0;
/**
 * A publish-subscribe bus for sending actions to actors
 * to test whether or not they can run an action.
 *
 * This bus does not run the action itself,
 * for that a {@link Mediator} can be used.
 *
 * @see Actor
 * @see Mediator
 *
 * @template A The actor type that can subscribe to the sub.
 * @template I The input type of an actor.
 * @template T The test type of an actor.
 * @template O The output type of an actor.
 * @template TS The test side data type.
 */
class Bus {
    /**
     * All enumerable properties from the `args` object are inherited to this bus.
     *
     * @param {IBusArgs} args Arguments object
     * @param {string} args.name The name for the bus
     * @throws When required arguments are missing.
     */
    constructor(args) {
        this.actors = [];
        this.observers = [];
        // Mapping from dependency (after) to dependents (before)
        this.dependencyLinks = new Map();
        Object.assign(this, args);
        this.failMessage = `All actors over bus ${this.name} failed to handle an action`;
    }
    /**
     * Subscribe the given actor to the bus.
     * After this, the given actor can be unsubscribed from the bus by calling {@link Bus#unsubscribe}.
     *
     * An actor that is subscribed multiple times will exist that amount of times in the bus.
     *
     * @param {A} actor The actor to subscribe.
     */
    subscribe(actor) {
        this.actors.push(actor);
        this.reorderForDependencies();
    }
    /**
     * Subscribe the given observer to the bus.
     * After this, the given observer can be unsubscribed from the bus by calling {@link Bus#unsubscribeObserver}.
     *
     * An observer that is subscribed multiple times will exist that amount of times in the bus.
     *
     * @param {ActionObserver<I, O>} observer The observer to subscribe.
     */
    subscribeObserver(observer) {
        this.observers.push(observer);
    }
    /**
     * Unsubscribe the given actor from the bus.
     *
     * An actor that is subscribed multiple times will be unsubscribed only once.
     *
     * @param {A} actor The actor to unsubscribe
     * @return {boolean} If the given actor was successfully unsubscribed,
     *         otherwise it was not subscribed before.
     */
    unsubscribe(actor) {
        const index = this.actors.indexOf(actor);
        if (index >= 0) {
            this.actors.splice(index, 1);
            return true;
        }
        return false;
    }
    /**
     * Unsubscribe the given observer from the bus.
     *
     * An observer that is subscribed multiple times will be unsubscribed only once.
     *
     * @param {ActionObserver<I, O>} observer The observer to unsubscribe.
     * @return {boolean} If the given observer was successfully unsubscribed,
     *         otherwise it was not subscribed before.
     */
    unsubscribeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index >= 0) {
            this.observers.splice(index, 1);
            return true;
        }
        return false;
    }
    /**
     * Publish an action to all actors in the bus to test if they can run the action.
     *
     * @param {I} action An action to publish
     * @return {IActorReply<A extends Actor<I, T, O>, I extends IAction, T extends IActorTest,
     *         O extends IActorOutput>[]}
     *         An array of reply objects. Each object contains a reference to the actor,
     *         and a promise to its {@link Actor#test} result.
     */
    publish(action) {
        return this.actors.map((actor) => ({ actor, reply: actor.test(action) }));
    }
    /**
     * Invoked when an action was run by an actor.
     *
     * @param actor               The action on which the {@link Actor#run} method was invoked.
     * @param {I}          action The original action input.
     * @param {Promise<O>} output A promise resolving to the final action output.
     */
    onRun(actor, action, output) {
        for (const observer of this.observers) {
            observer.onRun(actor, action, output);
        }
    }
    /**
     * Indicate that the given actor has the given actor dependencies.
     *
     * This will ensure that the given actor will be present in the bus *before* the given dependencies.
     *
     * @param {A} dependent A dependent actor that will be placed before the given actors.
     * @param {A[]} dependencies Actor dependencies that will be placed after the given actor.
     */
    addDependencies(dependent, dependencies) {
        for (const dependency of dependencies) {
            let existingDependencies = this.dependencyLinks.get(dependency);
            if (!existingDependencies) {
                existingDependencies = [];
                this.dependencyLinks.set(dependency, existingDependencies);
            }
            existingDependencies.push(dependent);
        }
        this.reorderForDependencies();
    }
    /**
     * Reorder the bus based on all present dependencies.
     */
    reorderForDependencies() {
        if (this.dependencyLinks.size > 0) {
            const actorsAfter = [];
            // Temporarily remove all actors that have dependencies
            for (const actorAfter of this.dependencyLinks.keys()) {
                const dependentPos = this.actors.indexOf(actorAfter);
                if (dependentPos >= 0) {
                    this.actors.splice(dependentPos, 1);
                    actorsAfter.push(actorAfter);
                }
            }
            // Iteratively append actors based on the first dependency link
            // that has all of its dependencies available in the array
            while (actorsAfter.length > 0) {
                // Find the first actor that has all of its dependencies available.
                let activeActorAfterId = -1;
                for (let i = 0; i < actorsAfter.length; i++) {
                    let validLink = true;
                    for (const dependency of this.dependencyLinks.get(actorsAfter[i])) {
                        if (!this.actors.includes(dependency) && actorsAfter.includes(dependency)) {
                            validLink = false;
                            break;
                        }
                    }
                    if (validLink) {
                        activeActorAfterId = i;
                        break;
                    }
                }
                // If none of the pending links are possible, there must be a cyclic dependency
                if (activeActorAfterId < 0) {
                    throw new Error(`Cyclic dependency links detected in bus ${this.name}`);
                }
                // The dependent may not be available (yet), so we don't add it to the array (yet).
                const activeActorAfter = actorsAfter.splice(activeActorAfterId, 1)[0];
                this.actors.push(activeActorAfter);
            }
        }
    }
}
exports.Bus = Bus;
//# sourceMappingURL=Bus.js.map