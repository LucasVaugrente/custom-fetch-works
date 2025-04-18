"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfJoinMultiBind = void 0;
const bus_rdf_join_1 = require("@comunica/bus-rdf-join");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const asynciterator_1 = require("asynciterator");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Multi-way Bind RDF Join Actor.
 */
class ActorRdfJoinMultiBind extends bus_rdf_join_1.ActorRdfJoin {
    constructor(args) {
        super(args, {
            logicalType: 'inner',
            physicalName: 'bind',
            canHandleUndefs: true,
            isLeaf: false,
        });
    }
    /**
     * Create a new bindings stream that takes every binding of the base stream
     * and binds it to the remaining patterns, evaluates those patterns, and emits all their bindings.
     *
     * @param bindOrder The order in which elements should be bound.
     * @param baseStream The base stream.
     * @param operations The operations to bind with each binding of the base stream.
     * @param operationBinder A callback to retrieve the bindings stream of bound operations.
     * @param optional If the original bindings should be emitted when the resulting bindings stream is empty.
     * @return {BindingsStream}
     */
    static createBindStream(bindOrder, baseStream, operations, operationBinder, optional, algebraFactory, bindingsFactory) {
        // Enable auto-start on sub-bindings during depth-first binding for best performance.
        const autoStartSubBindings = bindOrder === 'depth-first';
        // Create bindings function
        const binder = (bindings) => {
            // We don't bind the filter because filters are always handled last,
            // and we need to avoid binding filters of sub-queries, which are to be handled first. (see spec test bind10)
            const subOperations = operations.map(operation => (0, utils_query_operation_1.materializeOperation)(operation, bindings, algebraFactory, bindingsFactory, { bindFilter: true }));
            const bindingsMerger = (subBindings) => subBindings.merge(bindings);
            return new asynciterator_1.TransformIterator(async () => (await operationBinder(subOperations, bindings))
                .transform({ map: bindingsMerger }), { maxBufferSize: 128, autoStart: autoStartSubBindings });
        };
        // Create an iterator that binds elements from the base stream in different orders
        switch (bindOrder) {
            case 'depth-first':
                return new asynciterator_1.MultiTransformIterator(baseStream, { autoStart: false, multiTransform: binder, optional });
            case 'breadth-first':
                return new asynciterator_1.UnionIterator(baseStream.transform({
                    map: binder,
                    optional,
                }), { autoStart: false });
            default:
                // eslint-disable-next-line ts/restrict-template-expressions
                throw new Error(`Received request for unknown bind order: ${bindOrder}`);
        }
    }
    async getOutput(action, sideData) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const bindingsFactory = await utils_bindings_factory_1.BindingsFactory.create(this.mediatorMergeBindingsContext, action.context, dataFactory);
        const entries = sideData.entriesSorted;
        this.logDebug(action.context, 'First entry for Bind Join: ', () => ({ entry: entries[0].operation, metadata: entries[0].metadata }));
        // Close the non-smallest streams
        for (const [i, element] of entries.entries()) {
            if (i !== 0) {
                element.output.bindingsStream.close();
            }
        }
        // Take the stream with the lowest cardinality
        const smallestStream = entries[0].output;
        const remainingEntries = [...entries];
        remainingEntries.splice(0, 1);
        // Bind the remaining patterns for each binding in the stream
        const subContext = action.context
            .set(context_entries_1.KeysQueryOperation.joinLeftMetadata, entries[0].metadata)
            .set(context_entries_1.KeysQueryOperation.joinRightMetadatas, remainingEntries.map(entry => entry.metadata));
        const bindingsStream = ActorRdfJoinMultiBind.createBindStream(this.bindOrder, smallestStream.bindingsStream, remainingEntries.map(entry => entry.operation), async (operations, operationBindings) => {
            // Send the materialized patterns to the mediator for recursive join evaluation.
            const operation = operations.length === 1 ?
                operations[0] :
                algebraFactory.createJoin(operations);
            const output = (0, utils_query_operation_1.getSafeBindings)(await this.mediatorQueryOperation.mediate({ operation, context: subContext?.set(context_entries_1.KeysQueryOperation.joinBindings, operationBindings) }));
            return output.bindingsStream;
        }, false, algebraFactory, bindingsFactory);
        return {
            result: {
                type: 'bindings',
                bindingsStream,
                metadata: () => this.constructResultMetadata(entries, entries.map(entry => entry.metadata), action.context),
            },
            physicalPlanMetadata: {
                bindIndex: sideData.entriesUnsorted.indexOf(entries[0]),
                bindOperation: entries[0].operation,
                bindOperationCardinality: entries[0].metadata.cardinality,
                bindOrder: this.bindOrder,
            },
        };
    }
    canBindWithOperation(operation) {
        let valid = true;
        sparqlalgebrajs_1.Util.recurseOperation(operation, {
            [sparqlalgebrajs_1.Algebra.types.EXTEND]() {
                valid = false;
                return false;
            },
            [sparqlalgebrajs_1.Algebra.types.GROUP]() {
                valid = false;
                return false;
            },
        });
        return valid;
    }
    async getJoinCoefficients(action, sideData) {
        let { metadatas } = sideData;
        // Order the entries so we can pick the first one (usually the one with the lowest cardinality)
        const entriesUnsorted = action.entries
            .map((entry, i) => ({ ...entry, metadata: metadatas[i] }));
        const entriesTest = await bus_rdf_join_1.ActorRdfJoin
            .sortJoinEntries(this.mediatorJoinEntriesSort, entriesUnsorted, action.context);
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
        // Reject binding on some operation types
        if (remainingEntries
            .some(entry => !this.canBindWithOperation(entry.operation))) {
            return (0, core_1.failTest)(`Actor ${this.name} can not bind on Extend and Group operations`);
        }
        // Reject binding on modified operations, since using the output directly would be significantly more efficient.
        if (remainingEntries.some(entry => entry.operationModified)) {
            return (0, core_1.failTest)(`Actor ${this.name} can not be used over remaining entries with modified operations`);
        }
        // Only run this actor if the smallest stream is significantly smaller than the largest stream.
        // We must use Math.max, because the last metadata is not necessarily the biggest, but it's the least preferred.
        // If join entries are produced locally, we increase the possibility of doing this bind join, as it's cheap.
        const isRemoteAccess = requestItemTimes.some(time => time > 0);
        if (metadatas[0].cardinality.value * this.minMaxCardinalityRatio / (isRemoteAccess ? 1 : 3) >
            Math.max(...metadatas.map(metadata => metadata.cardinality.value))) {
            return (0, core_1.failTest)(`Actor ${this.name} can only run if the smallest stream is much smaller than largest stream`);
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
        const receiveInitialCostRemaining = remainingRequestInitialTimes
            .reduce((sum, element) => sum + element, 0);
        const receiveItemCostRemaining = remainingRequestItemTimes
            .reduce((sum, element) => sum + element, 0);
        return (0, core_1.passTestWithSideData)({
            iterations: metadatas[0].cardinality.value * cardinalityRemaining,
            persistedItems: 0,
            blockingItems: 0,
            requestTime: requestInitialTimes[0] +
                metadatas[0].cardinality.value * (requestItemTimes[0] +
                    receiveInitialCostRemaining +
                    cardinalityRemaining * receiveItemCostRemaining),
        }, { ...sideData, entriesUnsorted, entriesSorted });
    }
}
exports.ActorRdfJoinMultiBind = ActorRdfJoinMultiBind;
//# sourceMappingURL=ActorRdfJoinMultiBind.js.map