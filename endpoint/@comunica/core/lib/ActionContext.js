"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionContextKey = exports.ActionContext = void 0;
const immutable_1 = require("immutable");
/**
 * Implementation of {@link IActionContext} using Immutable.js.
 */
class ActionContext {
    constructor(data = {}) {
        this.map = (0, immutable_1.Map)(data);
    }
    /**
     * Will only set the value if the key is not already set.
     */
    setDefault(key, value) {
        return this.has(key) ? this : this.set(key, value);
    }
    set(key, value) {
        return this.setRaw(key.name, value);
    }
    setRaw(key, value) {
        return new ActionContext(this.map.set(key, value));
    }
    delete(key) {
        return new ActionContext(this.map.delete(key.name));
    }
    get(key) {
        return this.getRaw(key.name);
    }
    getRaw(key) {
        return this.map.get(key);
    }
    getSafe(key) {
        if (!this.has(key)) {
            throw new Error(`Context entry ${key.name} is required but not available`);
        }
        return this.get(key);
    }
    has(key) {
        return this.hasRaw(key.name);
    }
    hasRaw(key) {
        return this.map.has(key);
    }
    merge(...contexts) {
        // eslint-disable-next-line ts/no-this-alias
        let context = this;
        for (const source of contexts) {
            for (const key of source.keys()) {
                context = context.set(key, source.get(key));
            }
        }
        return context;
    }
    keys() {
        return [...this.map.keys()]
            .map(keyName => new ActionContextKey(keyName));
    }
    toJS() {
        return this.map.toJS();
    }
    toString() {
        return `ActionContext(${JSON.stringify(this.map.toJS())})`;
    }
    [Symbol.for('nodejs.util.inspect.custom')]() {
        return `ActionContext(${JSON.stringify(this.map.toJS(), null, '  ')})`;
    }
    /**
     * Convert the given object to an action context object if it is not an action context object yet.
     * If it already is an action context object, return the object as-is.
     * @param maybeActionContext An action context or record.
     * @return {ActionContext} An action context object.
     */
    static ensureActionContext(maybeActionContext) {
        return maybeActionContext instanceof ActionContext ?
            maybeActionContext :
            new ActionContext((0, immutable_1.Map)(maybeActionContext ?? {}));
    }
}
exports.ActionContext = ActionContext;
/**
 * Simple implementation of {@link IActionContextKey}.
 */
class ActionContextKey {
    constructor(name) {
        this.name = name;
    }
}
exports.ActionContextKey = ActionContextKey;
//# sourceMappingURL=ActionContext.js.map