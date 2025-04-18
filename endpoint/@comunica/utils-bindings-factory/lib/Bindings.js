"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bindings = void 0;
const core_1 = require("@comunica/core");
const immutable_1 = require("immutable");
const bindingsToString_1 = require("./bindingsToString");
/**
 * An immutable.js-based Bindings object.
 */
class Bindings {
    constructor(dataFactory, entries, contextHolder) {
        this.type = 'bindings';
        this.dataFactory = dataFactory;
        this.entries = entries;
        this.contextHolder = contextHolder;
    }
    has(key) {
        return this.entries.has(typeof key === 'string' ? key : key.value);
    }
    get(key) {
        return this.entries.get(typeof key === 'string' ? key : key.value);
    }
    set(key, value) {
        return new Bindings(this.dataFactory, this.entries.set(typeof key === 'string' ? key : key.value, value), this.contextHolder);
    }
    delete(key) {
        return new Bindings(this.dataFactory, this.entries.delete(typeof key === 'string' ? key : key.value), this.contextHolder);
    }
    keys() {
        return this.mapIterable(this.iteratorToIterable(this.entries.keys()), key => this.dataFactory.variable(key));
    }
    values() {
        return this.iteratorToIterable(this.entries.values());
    }
    forEach(fn) {
        for (const [key, value] of this.entries.entries()) {
            fn(value, this.dataFactory.variable(key));
        }
    }
    get size() {
        return this.entries.size;
    }
    [Symbol.iterator]() {
        return this.mapIterable(this.iteratorToIterable(this.entries.entries()), ([key, value]) => [this.dataFactory.variable(key), value])[Symbol.iterator]();
    }
    equals(other) {
        if (!other) {
            return false;
        }
        if (this === other) {
            return true;
        }
        // First check if size is equal
        if (this.size !== other.size) {
            return false;
        }
        // Then check if keys and values are equal
        for (const key of this.keys()) {
            if (!this.get(key)?.equals(other.get(key))) {
                return false;
            }
        }
        return true;
    }
    filter(fn) {
        return new Bindings(this.dataFactory, (0, immutable_1.Map)(this.entries
            .filter((value, key) => fn(value, this.dataFactory.variable(key)))), this.contextHolder);
    }
    map(fn) {
        return new Bindings(this.dataFactory, (0, immutable_1.Map)(this.entries
            .map((value, key) => fn(value, this.dataFactory.variable(key)))), this.contextHolder);
    }
    merge(other) {
        if (this.size < other.size && other instanceof Bindings) {
            return other.merge(this);
        }
        let entries = this.entries;
        // Check if other is of type Bindings, in that case we can access entries immediately.
        // This skips the unnecessary conversion from string to variable.
        if (other instanceof Bindings) {
            for (const [variable, right] of other.entries) {
                const left = this.entries.get(variable);
                if (left && !left.equals(right)) {
                    return;
                }
                entries = entries.set(variable, right);
            }
        }
        else {
            for (const [variable, right] of other) {
                const left = this.entries.get(variable.value);
                if (left && !left.equals(right)) {
                    return;
                }
                entries = entries.set(variable.value, right);
            }
        }
        return this.createBindingsWithContexts(entries, other);
    }
    mergeWith(merger, other) {
        if (this.size < other.size && other instanceof Bindings) {
            return other.mergeWith(merger, this);
        }
        let entries = this.entries;
        // For code comments see Bindings.merge function
        if (other instanceof Bindings) {
            for (const [variable, right] of other.entries) {
                const left = this.entries.get(variable);
                let value;
                if (left && !left.equals(right)) {
                    value = merger(left, right, this.dataFactory.variable(variable));
                }
                else {
                    value = right;
                }
                entries = entries.set(variable, value);
            }
        }
        else {
            for (const [variable, right] of other) {
                const left = this.entries.get(variable.value);
                let value;
                if (left && !left.equals(right)) {
                    value = merger(left, right, variable);
                }
                else {
                    value = right;
                }
                entries = entries.set(variable.value, value);
            }
        }
        return this.createBindingsWithContexts(entries, other);
    }
    createBindingsWithContexts(entries, other) {
        // If any context is empty, we skip merging contexts
        if (this.contextHolder && this.contextHolder.context) {
            let mergedContext = this.contextHolder.context;
            // Only merge if the other has a context
            if ('contextHolder' in other && other.contextHolder && other.contextHolder.context) {
                mergedContext = Bindings
                    .mergeContext(this.contextHolder.contextMergeHandlers, mergedContext, other.contextHolder.context);
            }
            return new Bindings(this.dataFactory, entries, { contextMergeHandlers: this.contextHolder.contextMergeHandlers, context: mergedContext });
        }
        // Otherwise, use optional context from other
        return new Bindings(this.dataFactory, entries, other.contextHolder);
    }
    static mergeContext(contextMergeHandlers, context, otherContext) {
        // All keys can contain duplicates, we prevent this by checking our built datamap for duplicates
        const allKeys = [...context.keys(), ...otherContext.keys()];
        // Map we build up with merged context values
        const newContextData = {};
        const handledKeys = {};
        // Set of names of keys in other context to allow for constant time lookup
        const keysSetOtherContext = new Set(otherContext.keys().map(key => key.name));
        const keysBothContext = context.keys().filter(key => keysSetOtherContext.has(key.name));
        for (const key of allKeys) {
            // If duplicate key, we continue iterating
            if (handledKeys[key.name] === 1) {
                continue;
            }
            // We've processed this key and shouldn't repeat it
            handledKeys[key.name] = 1;
            // Determine whether this key occurs in both contexts
            const occursInBoth = keysBothContext.some(x => x.name === key.name);
            // If we execute this function, we already check for existence of context merge handlers
            // This if statement is first as the most likely case for non-empty contexts is that we have mergehandlers
            // and both contexts have an entry
            if (contextMergeHandlers[key.name] && occursInBoth) {
                newContextData[key.name] = contextMergeHandlers[key.name]
                    .run(context.get(key), otherContext.get(key));
                continue;
            }
            // If we have no merge handler, but both contexts have entries for key, we don't add it to new context
            if (!contextMergeHandlers[key.name] && occursInBoth) {
                continue;
            }
            // If key doesn't occur in own context, it must be in other context
            // (if we get to this point, the key doesn't occur in both)
            if (!context.get(key)) {
                newContextData[key.name] = otherContext.get(key);
                continue;
            }
            // This could likely be else statement, but don't want to risk it
            if (!otherContext.get(key)) {
                newContextData[key.name] = context.get(key);
            }
        }
        return new core_1.ActionContext(newContextData);
    }
    setContextEntry(key, value) {
        return this.setContextEntryRaw(key, value);
    }
    setContextEntryRaw(key, value) {
        if (this.contextHolder && this.contextHolder.context) {
            return new Bindings(this.dataFactory, this.entries, {
                contextMergeHandlers: this.contextHolder.contextMergeHandlers,
                context: this.contextHolder.context.set(key, value),
            });
        }
        return new Bindings(this.dataFactory, this.entries, {
            contextMergeHandlers: this.contextHolder?.contextMergeHandlers ?? {},
            context: new core_1.ActionContext().set(key, value),
        });
    }
    deleteContextEntry(key) {
        return this.deleteContextEntryRaw(key);
    }
    deleteContextEntryRaw(key) {
        if (this.contextHolder) {
            return new Bindings(this.dataFactory, this.entries, {
                contextMergeHandlers: this.contextHolder.contextMergeHandlers,
                context: this.contextHolder.context?.delete(key),
            });
        }
        return new Bindings(this.dataFactory, this.entries);
    }
    getContext() {
        return this.contextHolder?.context;
    }
    getContextEntry(key) {
        return this.getContext()?.get(key);
    }
    toString() {
        return (0, bindingsToString_1.bindingsToString)(this);
    }
    *mapIterable(iterable, callback) {
        for (const x of iterable) {
            yield callback(x);
        }
    }
    iteratorToIterable(iterator) {
        return {
            [Symbol.iterator]: () => iterator,
        };
    }
}
exports.Bindings = Bindings;
//# sourceMappingURL=Bindings.js.map