"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BindingsFactory = void 0;
const immutable_1 = require("immutable");
const Bindings_1 = require("./Bindings");
/**
 * A Bindings factory that provides Bindings backed by immutable.js.
 */
class BindingsFactory {
    constructor(dataFactory, contextMergeHandlers) {
        this.dataFactory = dataFactory;
        this.contextMergeHandlers = contextMergeHandlers;
    }
    static async create(mediatorMergeBindingsContext, context, dataFactory) {
        return new BindingsFactory(dataFactory, (await mediatorMergeBindingsContext.mediate({ context })).mergeHandlers);
    }
    bindings(entries = []) {
        return new Bindings_1.Bindings(this.dataFactory, (0, immutable_1.Map)(entries.map(([key, value]) => [key.value, value])), this.contextMergeHandlers ? { contextMergeHandlers: this.contextMergeHandlers } : undefined);
    }
    fromBindings(bindings) {
        return this.bindings([...bindings]);
    }
    fromRecord(record) {
        return this.bindings(Object.entries(record).map(([key, value]) => [this.dataFactory.variable(key), value]));
    }
}
exports.BindingsFactory = BindingsFactory;
//# sourceMappingURL=BindingsFactory.js.map