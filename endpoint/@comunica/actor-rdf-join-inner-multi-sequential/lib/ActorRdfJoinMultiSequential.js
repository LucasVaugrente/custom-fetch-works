"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfJoinMultiSequential = void 0;
const bus_rdf_join_1 = require("@comunica/bus-rdf-join");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A Multi Sequential RDF Join Actor.
 * It accepts 3 or more streams, joins the first two, and joins the result with the remaining streams.
 */
class ActorRdfJoinMultiSequential extends bus_rdf_join_1.ActorRdfJoin {
    constructor(args) {
        super(args, {
            logicalType: 'inner',
            physicalName: 'multi-sequential',
            limitEntries: 3,
            limitEntriesMin: true,
            canHandleUndefs: true,
            isLeaf: false,
        });
    }
    async getOutput(action) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        // Join the two first streams, and then join the result with the remaining streams
        const firstEntry = {
            output: (0, utils_query_operation_1.getSafeBindings)(await this.mediatorJoin
                .mediate({ type: action.type, entries: [action.entries[0], action.entries[1]], context: action.context })),
            operation: algebraFactory
                .createJoin([action.entries[0].operation, action.entries[1].operation], false),
        };
        const remainingEntries = action.entries.slice(1);
        remainingEntries[0] = firstEntry;
        return {
            result: await this.mediatorJoin.mediate({
                type: action.type,
                entries: remainingEntries,
                context: action.context,
            }),
        };
    }
    async getJoinCoefficients(action, sideData) {
        const { metadatas } = sideData;
        const requestInitialTimes = bus_rdf_join_1.ActorRdfJoin.getRequestInitialTimes(metadatas);
        const requestItemTimes = bus_rdf_join_1.ActorRdfJoin.getRequestItemTimes(metadatas);
        return (0, core_1.passTestWithSideData)({
            iterations: metadatas[0].cardinality.value * metadatas[1].cardinality.value *
                metadatas.slice(2).reduce((acc, metadata) => acc * metadata.cardinality.value, 1),
            persistedItems: 0,
            blockingItems: 0,
            requestTime: requestInitialTimes[0] + metadatas[0].cardinality.value * requestItemTimes[0] +
                requestInitialTimes[1] + metadatas[1].cardinality.value * requestItemTimes[1] +
                metadatas.slice(2)
                    .reduce((sum, metadata, i) => sum + requestInitialTimes[i] +
                    metadata.cardinality.value * requestItemTimes[i], 0),
        }, sideData);
    }
}
exports.ActorRdfJoinMultiSequential = ActorRdfJoinMultiSequential;
//# sourceMappingURL=ActorRdfJoinMultiSequential.js.map