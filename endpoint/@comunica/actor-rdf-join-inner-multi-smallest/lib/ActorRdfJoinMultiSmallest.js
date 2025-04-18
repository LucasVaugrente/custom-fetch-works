"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfJoinMultiSmallest = void 0;
const bus_rdf_join_1 = require("@comunica/bus-rdf-join");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A Multi Smallest RDF Join Actor.
 * It accepts 3 or more streams, joins the smallest two, and joins the result with the remaining streams.
 */
class ActorRdfJoinMultiSmallest extends bus_rdf_join_1.ActorRdfJoin {
    constructor(args) {
        super(args, {
            logicalType: 'inner',
            physicalName: 'multi-smallest',
            limitEntries: 3,
            limitEntriesMin: true,
            canHandleUndefs: true,
            isLeaf: false,
        });
    }
    /**
     * Order the given join entries using the join-entries-sort bus.
     * @param {IJoinEntryWithMetadata[]} entries An array of join entries.
     * @param context The action context.
     * @return {IJoinEntryWithMetadata[]} The sorted join entries.
     */
    async sortJoinEntries(entries, context) {
        return (await this.mediatorJoinEntriesSort.mediate({ entries, context })).entries;
    }
    async getOutput(action, sideData) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        // Determine the two smallest streams by sorting (e.g. via cardinality)
        const entries = sideData.sortedEntries;
        const smallestEntry1 = entries[0];
        const smallestEntry2 = entries[1];
        entries.splice(0, 2);
        // Join the two selected streams, and then join the result with the remaining streams
        const firstEntry = {
            output: (0, utils_query_operation_1.getSafeBindings)(await this.mediatorJoin
                .mediate({ type: action.type, entries: [smallestEntry1, smallestEntry2], context: action.context })),
            operation: algebraFactory
                .createJoin([smallestEntry1.operation, smallestEntry2.operation], false),
        };
        entries.push(firstEntry);
        return {
            result: await this.mediatorJoin.mediate({
                type: action.type,
                entries,
                context: action.context,
            }),
        };
    }
    async getJoinCoefficients(action, sideData) {
        let { metadatas } = sideData;
        metadatas = [...metadatas];
        // Determine the two smallest streams by sorting (e.g. via cardinality)
        const sortedEntries = await this.sortJoinEntries(action.entries
            .map((entry, i) => ({ ...entry, metadata: metadatas[i] })), action.context);
        metadatas = sortedEntries.map(entry => entry.metadata);
        const requestInitialTimes = bus_rdf_join_1.ActorRdfJoin.getRequestInitialTimes(metadatas);
        const requestItemTimes = bus_rdf_join_1.ActorRdfJoin.getRequestItemTimes(metadatas);
        return (0, core_1.passTestWithSideData)({
            iterations: metadatas[0].cardinality.value * metadatas[1].cardinality.value *
                metadatas.slice(2).reduce((acc, metadata) => acc * metadata.cardinality.value, 1),
            persistedItems: 0,
            blockingItems: 0,
            requestTime: requestInitialTimes[0] + metadatas[0].cardinality.value * requestItemTimes[0] +
                requestInitialTimes[1] + metadatas[1].cardinality.value * requestItemTimes[1] +
                metadatas.slice(2).reduce((sum, metadata, i) => sum + requestInitialTimes.slice(2)[i] +
                    metadata.cardinality.value * requestItemTimes.slice(2)[i], 0),
        }, { ...sideData, sortedEntries });
    }
}
exports.ActorRdfJoinMultiSmallest = ActorRdfJoinMultiSmallest;
//# sourceMappingURL=ActorRdfJoinMultiSmallest.js.map