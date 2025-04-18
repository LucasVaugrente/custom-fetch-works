"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfJoinMultiEmpty = void 0;
const bus_rdf_join_1 = require("@comunica/bus-rdf-join");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_metadata_1 = require("@comunica/utils-metadata");
const asynciterator_1 = require("asynciterator");
/**
 * A comunica Multi Empty RDF Join Actor.
 */
class ActorRdfJoinMultiEmpty extends bus_rdf_join_1.ActorRdfJoin {
    constructor(args) {
        super(args, {
            logicalType: 'inner',
            physicalName: 'multi-empty',
            canHandleUndefs: true,
        });
    }
    async test(action) {
        if ((await bus_rdf_join_1.ActorRdfJoin.getMetadatas(action.entries))
            .every(metadata => bus_rdf_join_1.ActorRdfJoin.getCardinality(metadata).value > 0)) {
            return (0, core_1.failTest)(`Actor ${this.name} can only join entries where at least one is empty`);
        }
        return super.test(action);
    }
    async getOutput(action) {
        // Close all entries
        for (const entry of action.entries) {
            entry.output.bindingsStream.close();
        }
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        return {
            result: {
                bindingsStream: new asynciterator_1.ArrayIterator([], { autoStart: false }),
                metadata: async () => ({
                    state: new utils_metadata_1.MetadataValidationState(),
                    cardinality: { type: 'exact', value: 0 },
                    variables: bus_rdf_join_1.ActorRdfJoin.joinVariables(dataFactory, await bus_rdf_join_1.ActorRdfJoin.getMetadatas(action.entries)),
                }),
                type: 'bindings',
            },
        };
    }
    async getJoinCoefficients(action, sideData) {
        return (0, core_1.passTestWithSideData)({
            iterations: 0,
            persistedItems: 0,
            blockingItems: 0,
            requestTime: 0,
        }, sideData);
    }
}
exports.ActorRdfJoinMultiEmpty = ActorRdfJoinMultiEmpty;
//# sourceMappingURL=ActorRdfJoinMultiEmpty.js.map