"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationJoin = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const bus_rdf_join_1 = require("@comunica/bus-rdf-join");
const core_1 = require("@comunica/core");
const utils_metadata_1 = require("@comunica/utils-metadata");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const asynciterator_1 = require("asynciterator");
const rdf_data_factory_1 = require("rdf-data-factory");
/**
 * A comunica Join Query Operation Actor.
 */
class ActorQueryOperationJoin extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'join');
    }
    async testOperation(_operation, _context) {
        return (0, core_1.passTestVoid)();
    }
    async runOperation(operationOriginal, context) {
        const entries = (await Promise.all(operationOriginal.input
            .map(async (subOperation) => ({
            output: await this.mediatorQueryOperation.mediate({ operation: subOperation, context }),
            operation: subOperation,
        }))))
            .map(({ output, operation }) => ({
            output: (0, utils_query_operation_1.getSafeBindings)(output),
            operation,
        }));
        // Return immediately if one of the join entries has cardinality zero, to avoid actor testing overhead.
        if ((await Promise.all(entries.map(entry => entry.output.metadata())))
            .some(entry => (entry.cardinality.value === 0 && entry.cardinality.type === 'exact'))) {
            for (const entry of entries) {
                entry.output.bindingsStream.close();
            }
            return {
                bindingsStream: new asynciterator_1.ArrayIterator([], { autoStart: false }),
                metadata: async () => ({
                    state: new utils_metadata_1.MetadataValidationState(),
                    cardinality: { type: 'exact', value: 0 },
                    variables: bus_rdf_join_1.ActorRdfJoin.joinVariables(new rdf_data_factory_1.DataFactory(), await bus_rdf_join_1.ActorRdfJoin.getMetadatas(entries)),
                }),
                type: 'bindings',
            };
        }
        return this.mediatorJoin.mediate({ type: 'inner', entries, context });
    }
}
exports.ActorQueryOperationJoin = ActorQueryOperationJoin;
//# sourceMappingURL=ActorQueryOperationJoin.js.map