"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfJoinMultiSmallestFilterBindings = void 0;
const bus_rdf_join_1 = require("@comunica/bus-rdf-join");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const utils_iterator_1 = require("@comunica/utils-iterator");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const asynciterator_1 = require("asynciterator");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Inner Multi Smallest Filter Bindings RDF Join Actor.
 */
class ActorRdfJoinMultiSmallestFilterBindings extends bus_rdf_join_1.ActorRdfJoin {
    constructor(args) {
        super(args, {
            logicalType: 'inner',
            physicalName: 'multi-smallest-filter-bindings',
            limitEntries: 2,
            limitEntriesMin: true,
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
        let { entries: entriesSorted } = await this.mediatorJoinEntriesSort.mediate({ entries, context });
        // Prioritize entries with modified operations, so these are not re-executed
        entriesSorted = entriesSorted.sort((entryLeft, entryRight) => {
            if (entryLeft.operationModified && !entryRight.operationModified) {
                return -1;
            }
            return 0;
        });
        const first = entriesSorted.splice(0, 1)[0];
        // Let second entry first be prioritized for sharing as many variables with first as possible,
        // then having the fewest variables,
        // and then having the lowest cardinality.
        let second;
        let secondIndex = -1;
        let secondSharedVariables = 0;
        for (const [i, entry] of entriesSorted.entries()) {
            const sharedVariables = first.metadata.variables
                .filter(variableFirst => entry.metadata.variables
                .some(variableSecond => variableFirst.variable.equals(variableSecond.variable))).length;
            if (!second || (sharedVariables > secondSharedVariables ||
                (sharedVariables === secondSharedVariables &&
                    (entry.metadata.variables.length < second.metadata.variables.length ||
                        (entry.metadata.variables.length === second.metadata.variables.length &&
                            entry.metadata.cardinality.value < second.metadata.cardinality.value))))) {
                second = entry;
                secondIndex = i;
                secondSharedVariables = sharedVariables;
            }
        }
        if (secondSharedVariables === 0) {
            return (0, core_1.failTest)(`Actor ${this.name} can only join with common variables`);
        }
        const remaining = entriesSorted;
        remaining.splice(secondIndex, 1);
        return (0, core_1.passTest)({ first, second: second, remaining });
    }
    async getOutput(action) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        // Determine the two smallest streams by sorting (e.g. via cardinality)
        const entriesUnsorted = await bus_rdf_join_1.ActorRdfJoin.getEntriesWithMetadatas([...action.entries]);
        const { first, second: secondIn, remaining: remainingIn } = (await this.sortJoinEntries(entriesUnsorted, action.context)).getOrThrow();
        // Clone first stream, because we will use it twice
        const smallestStream1 = first.output.bindingsStream;
        first.output.bindingsStream = smallestStream1.clone();
        // Project the first stream on common variables, and filter out duplicates
        // The common variables array is guaranteed to be non-empty, due to the way the test of this actor is implemented.
        const commonVariables = first.metadata.variables
            .filter(variableFirst => secondIn.metadata.variables
            .some(variableSecond => variableFirst.variable.equals(variableSecond.variable)));
        const hashes = {};
        const smallestStream1Projected = smallestStream1.clone()
            .map(binding => binding.filter((value, key) => commonVariables.some(commonVariable => commonVariable.variable.equals(key))))
            .filter((binding) => {
            const hash = (0, utils_bindings_factory_1.bindingsToString)(binding);
            return !(hash in hashes) && (hashes[hash] = true);
        });
        // Slice the first stream into chunks according to the block size, so we avoid blocking too long.
        const chunkedStreams = new utils_iterator_1.ChunkedIterator(smallestStream1Projected, this.blockSize, { autoStart: false });
        // Push down bindings of first stream when querying for second stream
        const sourceWrapper = (0, utils_query_operation_1.getOperationSource)(secondIn.operation);
        const secondStream = new asynciterator_1.UnionIterator(chunkedStreams.map(chunk => sourceWrapper.source.queryBindings(secondIn.operation, sourceWrapper.context ? action.context.merge(sourceWrapper.context) : action.context, { filterBindings: { bindings: chunk, metadata: first.metadata } })));
        const second = {
            output: {
                type: 'bindings',
                bindingsStream: secondStream,
                metadata: secondIn.output.metadata,
            },
            operation: secondIn.operation,
            operationModified: true,
        };
        // Destroy the unused original second stream
        secondIn.output.bindingsStream.destroy();
        // Join the two selected streams
        const joinedEntry = {
            output: (0, utils_query_operation_1.getSafeBindings)(await this.mediatorJoin
                .mediate({
                type: action.type,
                entries: [first, second],
                context: action.context.set(context_entries_1.KeysRdfJoin.lastPhysicalJoin, this.physicalName),
            })),
            operation: algebraFactory.createJoin([first.operation, second.operation], false),
            operationModified: true,
        };
        // And then join the result with the remaining streams
        const remaining = remainingIn;
        remaining.unshift(joinedEntry);
        return {
            result: await this.mediatorJoin.mediate({
                type: action.type,
                entries: remaining,
                context: action.context,
            }),
            physicalPlanMetadata: {
                firstIndex: entriesUnsorted.indexOf(first),
                secondIndex: entriesUnsorted.indexOf(secondIn),
            },
        };
    }
    async getJoinCoefficients(action, sideData) {
        let { metadatas } = sideData;
        // Avoid infinite recursion
        if (action.context.get(context_entries_1.KeysRdfJoin.lastPhysicalJoin) === this.physicalName) {
            return (0, core_1.failTest)(`Actor ${this.name} can not be called recursively`);
        }
        metadatas = [...metadatas];
        // Determine the two smallest streams by sorting (e.g. via cardinality)
        const sortedResult = await this.sortJoinEntries(action.entries
            .map((entry, i) => ({ ...entry, metadata: metadatas[i] })), action.context);
        if (sortedResult.isFailed()) {
            return sortedResult;
        }
        const { first, second, remaining } = sortedResult.get();
        // Only pass if the second entry accepts filterBindings
        const sourceWrapper = (0, utils_query_operation_1.getOperationSource)(second.operation);
        if (!sourceWrapper) {
            return (0, core_1.failTest)(`Actor ${this.name} can only process if entries[1] has a source`);
        }
        const testingOperation = second.operation;
        const selectorShape = await sourceWrapper.source.getSelectorShape(action.context);
        if (!(0, utils_query_operation_1.doesShapeAcceptOperation)(selectorShape, testingOperation, { filterBindings: true })) {
            return (0, core_1.failTest)(`Actor ${this.name} can only process if entries[1] accept filterBindings`);
        }
        // Determine cost coefficients
        metadatas = [first.metadata, second.metadata, ...remaining.map(remain => remain.metadata)];
        const requestInitialTimes = bus_rdf_join_1.ActorRdfJoin.getRequestInitialTimes(metadatas);
        const requestItemTimes = bus_rdf_join_1.ActorRdfJoin.getRequestItemTimes(metadatas);
        const { selectivity } = await this.mediatorJoinSelectivity.mediate({
            entries: [first, second],
            context: action.context,
        });
        const cardinalityRemaining = remaining
            .reduce((mul, remain) => mul * remain.metadata.cardinality.value * this.selectivityModifier, 1);
        return (0, core_1.passTestWithSideData)({
            iterations: selectivity * this.selectivityModifier *
                second.metadata.cardinality.value * cardinalityRemaining,
            persistedItems: first.metadata.cardinality.value,
            blockingItems: first.metadata.cardinality.value,
            requestTime: requestInitialTimes[0] + metadatas[0].cardinality.value * requestItemTimes[0] +
                requestInitialTimes[1] + cardinalityRemaining * requestItemTimes[1],
        }, sideData);
    }
}
exports.ActorRdfJoinMultiSmallestFilterBindings = ActorRdfJoinMultiSmallestFilterBindings;
//# sourceMappingURL=ActorRdfJoinMultiSmallestFilterBindings.js.map