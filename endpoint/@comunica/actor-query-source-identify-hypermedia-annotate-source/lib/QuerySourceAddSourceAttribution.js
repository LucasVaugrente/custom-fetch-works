"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuerySourceAddSourceAttribution = void 0;
const context_entries_1 = require("@comunica/context-entries");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
/**
 * A IQuerySource wrapper that skolemizes outgoing quads and bindings.
 */
class QuerySourceAddSourceAttribution {
    constructor(innerSource) {
        this.innerSource = innerSource;
    }
    async getSelectorShape(context) {
        return this.innerSource.getSelectorShape(context);
    }
    queryBindings(operation, context, options) {
        return this.addSourceUrlToBindingContext(this.innerSource.queryBindings(operation, context, options));
    }
    addSourceUrlToBindingContext(iterator) {
        const ret = iterator.map((bindings) => {
            if (bindings instanceof utils_bindings_factory_1.Bindings) {
                bindings = bindings.setContextEntry(context_entries_1.KeysMergeBindingsContext.sourcesBinding, [this.innerSource.referenceValue]);
            }
            return bindings;
        });
        function inheritMetadata() {
            iterator.getProperty('metadata', (metadata) => {
                ret.setProperty('metadata', metadata);
                metadata.state.addInvalidateListener(inheritMetadata);
            });
        }
        inheritMetadata();
        return ret;
    }
    queryBoolean(operation, context) {
        return this.innerSource.queryBoolean(operation, context);
    }
    queryQuads(operation, context) {
        return this.innerSource.queryQuads(operation, context);
    }
    queryVoid(operation, context) {
        return this.innerSource.queryVoid(operation, context);
    }
    get referenceValue() {
        return this.innerSource.referenceValue;
    }
    toString() {
        return `${this.innerSource.toString()}`;
    }
}
exports.QuerySourceAddSourceAttribution = QuerySourceAddSourceAttribution;
//# sourceMappingURL=QuerySourceAddSourceAttribution.js.map