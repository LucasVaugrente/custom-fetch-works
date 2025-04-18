"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuerySourceSkolemized = void 0;
const context_entries_1 = require("@comunica/context-entries");
const utils_metadata_1 = require("@comunica/utils-metadata");
const asynciterator_1 = require("asynciterator");
const utils_1 = require("./utils");
/**
 * A IQuerySource wrapper that skolemizes outgoing quads and bindings.
 */
class QuerySourceSkolemized {
    constructor(innerSource, sourceId) {
        this.innerSource = innerSource;
        this.sourceId = sourceId;
    }
    async getSelectorShape(context) {
        return this.innerSource.getSelectorShape(context);
    }
    queryBindings(operation, context, options) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const operationMapped = (0, utils_1.deskolemizeOperation)(dataFactory, operation, this.sourceId);
        if (!operationMapped) {
            const it = new asynciterator_1.ArrayIterator([], { autoStart: false });
            it.setProperty('metadata', {
                state: new utils_metadata_1.MetadataValidationState(),
                cardinality: { type: 'exact', value: 0 },
                variables: [],
            });
            return it;
        }
        return (0, utils_1.skolemizeBindingsStream)(dataFactory, this.innerSource.queryBindings(operationMapped, context, options), this.sourceId);
    }
    queryBoolean(operation, context) {
        return this.innerSource.queryBoolean(operation, context);
    }
    queryQuads(operation, context) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const operationMapped = (0, utils_1.deskolemizeOperation)(dataFactory, operation, this.sourceId);
        if (!operationMapped) {
            const it = new asynciterator_1.ArrayIterator([], { autoStart: false });
            it.setProperty('metadata', {
                state: new utils_metadata_1.MetadataValidationState(),
                cardinality: { type: 'exact', value: 0 },
            });
            return it;
        }
        return (0, utils_1.skolemizeQuadStream)(dataFactory, this.innerSource.queryQuads(operationMapped, context), this.sourceId);
    }
    queryVoid(operation, context) {
        return this.innerSource.queryVoid(operation, context);
    }
    get referenceValue() {
        return this.innerSource.referenceValue;
    }
    toString() {
        return `${this.innerSource.toString()}(SkolemID:${this.sourceId})`;
    }
}
exports.QuerySourceSkolemized = QuerySourceSkolemized;
//# sourceMappingURL=QuerySourceSkolemized.js.map