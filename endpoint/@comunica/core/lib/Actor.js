"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = void 0;
const ContextEntries_1 = require("./ContextEntries");
/**
 * An actor can act on messages of certain types and provide output of a certain type.
 *
 * The flow of an actor is as follows:
 * 1. Send a message to {@link Actor#test} to test if an actor can run that action.
 * 2. If the actor can reply to the message, let the actor run the action using {@link Actor#run}.
 *
 * An actor is typically subscribed to a bus,
 * using which the applicability to an action can be tested.
 *
 * @see Bus
 *
 * @template I The input type of an actor.
 * @template T The test type of an actor.
 * @template O The output type of an actor.
 * @template TS The test side data type.
 */
class Actor {
    /**
     * All enumerable properties from the `args` object are inherited to this actor.
     *
     * The actor will subscribe to the given bus when this constructor is called.
     *
     * @param {IActorArgs<I extends IAction, T extends IActorTest, O extends IActorOutput>} args Arguments object
     * @param {string} args.name The name for this actor.
     * @param {Bus<A extends Actor<I, T, O>, I extends IAction, T extends IActorTest, O extends IActorOutput>} args.bus
     *        The bus this actor subscribes to.
     * @throws When required arguments are missing.
     */
    constructor(args) {
        this.beforeActors = [];
        Object.assign(this, args);
        this.bus.subscribe(this);
        if (this.beforeActors.length > 0) {
            this.bus.addDependencies(this, this.beforeActors);
        }
        if (args.busFailMessage) {
            this.bus.failMessage = args.busFailMessage;
        }
    }
    /**
     * Get the logger from the given context.
     * @param {ActionContext} context An optional context.
     * @return {Logger} The logger or undefined.
     */
    static getContextLogger(context) {
        return context.get(ContextEntries_1.CONTEXT_KEY_LOGGER);
    }
    /**
     * Run the given action on this actor
     * AND invokes the {@link Bus#onRun} method.
     *
     * @param {I} action The action to run.
     * @return {Promise<T>} A promise that resolves to the run result.
     */
    runObservable(action, sideData) {
        const output = this.run(action, sideData);
        this.bus.onRun(this, action, output);
        return output;
    }
    /* Proxy methods for the (optional) logger that is defined in the context */
    getDefaultLogData(context, data) {
        const dataActual = data ? data() : {};
        dataActual.actor = this.name;
        return dataActual;
    }
    logTrace(context, message, data) {
        const logger = Actor.getContextLogger(context);
        if (logger) {
            logger.trace(message, this.getDefaultLogData(context, data));
        }
    }
    logDebug(context, message, data) {
        const logger = Actor.getContextLogger(context);
        if (logger) {
            logger.debug(message, this.getDefaultLogData(context, data));
        }
    }
    logInfo(context, message, data) {
        const logger = Actor.getContextLogger(context);
        if (logger) {
            logger.info(message, this.getDefaultLogData(context, data));
        }
    }
    logWarn(context, message, data) {
        const logger = Actor.getContextLogger(context);
        if (logger) {
            logger.warn(message, this.getDefaultLogData(context, data));
        }
    }
    logError(context, message, data) {
        const logger = Actor.getContextLogger(context);
        if (logger) {
            logger.error(message, this.getDefaultLogData(context, data));
        }
    }
    logFatal(context, message, data) {
        const logger = Actor.getContextLogger(context);
        if (logger) {
            logger.fatal(message, this.getDefaultLogData(context, data));
        }
    }
}
exports.Actor = Actor;
//# sourceMappingURL=Actor.js.map