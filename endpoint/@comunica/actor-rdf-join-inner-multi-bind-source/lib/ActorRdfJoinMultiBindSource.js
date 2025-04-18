"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfJoinMultiBindSource = void 0;
const bus_rdf_join_1 = require("@comunica/bus-rdf-join");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_iterator_1 = require("@comunica/utils-iterator");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const asynciterator_1 = require("asynciterator");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Inner Multi Bind Source RDF Join Actor.
 */
class ActorRdfJoinMultiBindSource extends bus_rdf_join_1.ActorRdfJoin {
    constructor(args) {
        super(args, {
            logicalType: 'inner',
            physicalName: 'bind-source',
            canHandleUndefs: true,
        });
    }
    async getOutput(action, sideData) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        // Order the entries so we can pick the first one (usually the one with the lowest cardinality)
        const entries = sideData.entriesSorted;
        this.logDebug(action.context, 'First entry for Bind Join Source: ', () => ({ entry: entries[0].operation, metadata: entries[0].metadata }));
        // Close the non-smallest streams
        for (const [i, element] of entries.entries()) {
            if (i !== 0) {
                element.output.bindingsStream.close();
            }
        }
        // Take the stream with the lowest cardinality
        const smallestStream = entries[0].output;
        const smallestMetadata = entries[0].metadata;
        const remainingEntries = [...entries];
        remainingEntries.splice(0, 1);
        // Get source for remaining entries (guaranteed thanks to prior check in getJoinCoefficients())
        const sourceWrapper = (0, utils_query_operation_1.getOperationSource)(remainingEntries[0].operation);
        // Determine the operation to pass
        const operation = this.createOperationFromEntries(algebraFactory, remainingEntries);
        // Slice the smallest stream into chunks according to the block size, so we avoid blocking too long.
        const chunkedStreams = new utils_iterator_1.ChunkedIterator(smallestStream.bindingsStream, this.blockSize, { autoStart: false });
        // For each chunk, pass the query and the bindings to the source for execution
        const bindingsStream = new asynciterator_1.UnionIterator(chunkedStreams.map(chunk => sourceWrapper.source.queryBindings(operation, sourceWrapper.context ? action.context.merge(sourceWrapper.context) : action.context, { joinBindings: { bindings: chunk, metadata: smallestMetadata } })));
        return {
            result: {
                type: 'bindings',
                bindingsStream,
                metadata: () => this.constructResultMetadata(entries, entries.map(entry => entry.metadata), action.context),
            },
            physicalPlanMetadata: {
                bindIndex: sideData.entriesUnsorted.indexOf(entries[0]),
            },
        };
    }
    async sortJoinEntries(entries, context) {
        const entriesTest = await bus_rdf_join_1.ActorRdfJoin.sortJoinEntries(this.mediatorJoinEntriesSort, entries, context);
        if (entriesTest.isFailed()) {
            return entriesTest;
        }
        entries = entriesTest.get();
        // Prioritize entries with modified operations, so these are not re-executed
        entries = entries.sort((entryLeft, entryRight) => {
            if (entryLeft.operationModified && !entryRight.operationModified) {
                return -1;
            }
            return 0;
        });
        return (0, core_1.passTest)(entries);
    }
    async getJoinCoefficients(action, sideData) {
        let { metadatas } = sideData;
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        // Order the entries so we can pick the first one (usually the one with the lowest cardinality)
        const entriesUnsorted = action.entries.map((entry, i) => ({ ...entry, metadata: metadatas[i] }));
        const entriesTest = await this.sortJoinEntries(entriesUnsorted, action.context);
        if (entriesTest.isFailed()) {
            return entriesTest;
        }
        const entriesSorted = entriesTest.get();
        metadatas = entriesSorted.map(entry => entry.metadata);
        const requestInitialTimes = bus_rdf_join_1.ActorRdfJoin.getRequestInitialTimes(metadatas);
        const requestItemTimes = bus_rdf_join_1.ActorRdfJoin.getRequestItemTimes(metadatas);
        // Determine first stream and remaining ones
        const remainingEntries = [...entriesSorted];
        const remainingRequestInitialTimes = [...requestInitialTimes];
        const remainingRequestItemTimes = [...requestItemTimes];
        remainingEntries.splice(0, 1);
        remainingRequestInitialTimes.splice(0, 1);
        remainingRequestItemTimes.splice(0, 1);
        // Reject binding on operations without sources
        const sources = remainingEntries.map(entry => (0, utils_query_operation_1.getOperationSource)(entry.operation));
        if (sources.some(source => !source)) {
            return (0, core_1.failTest)(`Actor ${this.name} can not bind on remaining operations without source annotation`);
        }
        // Reject binding on operations with un-equal sources
        if (sources.some(source => source !== sources[0])) {
            return (0, core_1.failTest)(`Actor ${this.name} can not bind on remaining operations with non-equal source annotation`);
        }
        // Reject if the source can not handle bindings
        const sourceWrapper = sources[0];
        const testingOperation = this.createOperationFromEntries(algebraFactory, remainingEntries);
        const selectorShape = await sourceWrapper.source.getSelectorShape(action.context);
        if (!(0, utils_query_operation_1.doesShapeAcceptOperation)(selectorShape, testingOperation, { joinBindings: true })) {
            return (0, core_1.failTest)(`Actor ${this.name} detected a source that can not handle passing down join bindings`);
        }
        // Determine selectivities of smallest entry with all other entries
        const selectivities = await Promise.all(remainingEntries
            .map(async (entry) => (await this.mediatorJoinSelectivity.mediate({
            entries: [entriesSorted[0], entry],
            context: action.context,
        })).selectivity * this.selectivityModifier));
        // Determine coefficients for remaining entries
        const cardinalityRemaining = remainingEntries
            .map((entry, i) => entry.metadata.cardinality.value * selectivities[i])
            .reduce((sum, element) => sum + element, 0);
        return (0, core_1.passTestWithSideData)({
            iterations: 1,
            persistedItems: metadatas[0].cardinality.value,
            blockingItems: metadatas[0].cardinality.value,
            requestTime: requestInitialTimes[0] + metadatas[0].cardinality.value * requestItemTimes[0] +
                requestInitialTimes[1] + cardinalityRemaining * requestItemTimes[1],
        }, { ...sideData, entriesUnsorted, entriesSorted });
    }
    createOperationFromEntries(algebraFactory, remainingEntries) {
        if (remainingEntries.length === 1) {
            return remainingEntries[0].operation;
        }
        return algebraFactory.createJoin(remainingEntries.map(entry => entry.operation), true);
    }
}
exports.ActorRdfJoinMultiBindSource = ActorRdfJoinMultiBindSource;
//# sourceMappingURL=ActorRdfJoinMultiBindSource.js.map