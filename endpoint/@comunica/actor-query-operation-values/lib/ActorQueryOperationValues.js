"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationValues = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const utils_metadata_1 = require("@comunica/utils-metadata");
const asynciterator_1 = require("asynciterator");
/**
 * A comunica Values Query Operation Actor.
 */
class ActorQueryOperationValues extends bus_query_operation_1.ActorQueryOperationTyped {
    constructor(args) {
        super(args, 'values');
    }
    async testOperation(_operation, _context) {
        return (0, core_1.passTestVoid)();
    }
    async runOperation(operation, context) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const bindingsFactory = await utils_bindings_factory_1.BindingsFactory.create(this.mediatorMergeBindingsContext, context, dataFactory);
        const bindingsStream = new asynciterator_1.ArrayIterator(operation.bindings
            .map(x => bindingsFactory.bindings(Object.entries(x)
            .map(([key, value]) => [dataFactory.variable(key.slice(1)), value]))));
        const metadata = () => Promise.resolve({
            state: new utils_metadata_1.MetadataValidationState(),
            cardinality: { type: 'exact', value: operation.bindings.length },
            variables: operation.variables.map(variable => ({
                variable,
                canBeUndef: operation.bindings.some(bindings => !(`?${variable.value}` in bindings)),
            })),
        });
        return { type: 'bindings', bindingsStream, metadata };
    }
}
exports.ActorQueryOperationValues = ActorQueryOperationValues;
//# sourceMappingURL=ActorQueryOperationValues.js.map