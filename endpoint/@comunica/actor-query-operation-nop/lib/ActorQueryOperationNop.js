"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationNop = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const utils_metadata_1 = require("@comunica/utils-metadata");
const asynciterator_1 = require("asynciterator");
/**
 * A [Query Operation](https://github.com/comunica/comunica/tree/master/packages/bus-query-operation)
 * actor that handles SPARQL nop operations.
 */
class ActorQueryOperationNop extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'nop');
    }
    async testOperation(_operation, _context) {
        return (0, core_1.passTestVoid)();
    }
    async runOperation(operation, context) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const bindingsFactory = await utils_bindings_factory_1.BindingsFactory.create(this.mediatorMergeBindingsContext, context, dataFactory);
        return {
            bindingsStream: new asynciterator_1.SingletonIterator(bindingsFactory.bindings()),
            metadata: () => Promise.resolve({
                state: new utils_metadata_1.MetadataValidationState(),
                cardinality: { type: 'exact', value: 1 },
                variables: [],
            }),
            type: 'bindings',
        };
    }
}
exports.ActorQueryOperationNop = ActorQueryOperationNop;
//# sourceMappingURL=ActorQueryOperationNop.js.map