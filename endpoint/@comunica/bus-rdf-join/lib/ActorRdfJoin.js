"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfJoin = void 0;
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_iterator_1 = require("@comunica/utils-iterator");
const utils_metadata_1 = require("@comunica/utils-metadata");
/**
 * A comunica actor for joining 2 binding streams.
 *
 * Actor types:
 * * Input:  IActionRdfJoin:                The streams that need to be joined.
 * * Test:   IMediatorTypeJoinCoefficients: Join coefficients.
 * * Output: IActorRdfJoinOutput:           The resulting joined stream.
 *
 * @see IActionRdfJoin
 * @see IActorQueryOperationOutput
 */
class ActorRdfJoin extends core_1.Actor {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {RDF joining failed: none of the configured actors were able to handle the join type ${action.type}} busFailMessage
     * @param options - Actor-specific join options.
     */
    /* eslint-enable max-len */
    constructor(args, options) {
        super(args);
        /**
         * If this actor will be logged in the debugger and physical query plan logger
         */
        this.includeInLogs = true;
        this.logicalType = options.logicalType;
        this.physicalName = options.physicalName;
        this.limitEntries = options.limitEntries ?? Number.POSITIVE_INFINITY;
        this.limitEntriesMin = options.limitEntriesMin ?? false;
        this.canHandleUndefs = options.canHandleUndefs ?? false;
        this.isLeaf = options.isLeaf ?? true;
        this.requiresVariableOverlap = options.requiresVariableOverlap ?? false;
    }
    /**
     * Returns an array containing all the variable names that occur in all bindings streams.
     * @param {MetadataBindings[]} metadatas An array of optional metadata objects for the entries.
     * @returns {RDF.Variable[]} An array of variables.
     */
    static overlappingVariables(metadatas) {
        const variablesIndexed = {};
        for (const metadata of metadatas) {
            for (const variable of metadata.variables) {
                if (!variablesIndexed[variable.variable.value]) {
                    variablesIndexed[variable.variable.value] = {
                        variable: variable.variable,
                        canBeUndef: variable.canBeUndef,
                        occurrences: 0,
                    };
                }
                const entry = variablesIndexed[variable.variable.value];
                entry.canBeUndef = entry.canBeUndef || variable.canBeUndef;
                entry.occurrences++;
            }
        }
        return Object.values(variablesIndexed)
            .filter(entry => entry.occurrences === metadatas.length)
            .map(entry => ({ variable: entry.variable, canBeUndef: entry.canBeUndef }));
    }
    /**
     * Returns the variables that will occur in the joined bindings.
     * @param dataFactory The data factory.
     * @param {MetadataBindings[]} metadatas An array of metadata objects for the entries.
     * @param optional If an optional join is being performed.
     * @returns {RDF.Variable[]} An array of joined variables.
     */
    static joinVariables(dataFactory, metadatas, optional = false) {
        const variablesIndexed = {};
        let first = true;
        for (const metadata of metadatas) {
            for (const variable of metadata.variables) {
                variablesIndexed[variable.variable.value] = variablesIndexed[variable.variable.value] || variable.canBeUndef ||
                    (!first && optional && !(variable.variable.value in variablesIndexed));
            }
            first = false;
        }
        return Object.entries(variablesIndexed)
            .map(([variableLabel, canBeUndef]) => ({ variable: dataFactory.variable(variableLabel), canBeUndef }));
    }
    /**
     * Returns the result of joining bindings, or `null` if no join is possible.
     * @param {Bindings[]} bindings
     * @returns {Bindings}
     */
    static joinBindings(...bindings) {
        if (bindings.length === 0) {
            return null;
        }
        if (bindings.length === 1) {
            return bindings[0];
        }
        let acc = bindings[0];
        for (const binding of bindings.slice(1)) {
            const merged = acc.merge(binding);
            if (!merged) {
                return null;
            }
            acc = merged;
        }
        return acc;
    }
    /**
     * Get the estimated number of items from the given metadata.
     * @param {Record<string, any>} metadata A metadata object.
     * @return {number} The estimated number of items, or `Infinity` if cardinality is falsy.
     */
    static getCardinality(metadata) {
        return metadata.cardinality;
    }
    /**
     * Obtain the metadata from all given join entries.
     * @param entries Join entries.
     */
    static async getMetadatas(entries) {
        return await Promise.all(entries.map(entry => entry.output.metadata()));
    }
    /**
     * Obtain the join entries witt metadata from all given join entries.
     * @param entries Join entries.
     */
    static async getEntriesWithMetadatas(entries) {
        const metadatas = await ActorRdfJoin.getMetadatas(entries);
        return entries.map((entry, i) => ({ ...entry, metadata: metadatas[i] }));
    }
    /**
     * Calculate the time to initiate a request for the given metadata entries.
     * @param metadatas An array of checked metadata.
     */
    static getRequestInitialTimes(metadatas) {
        return metadatas.map(metadata => metadata.pageSize ? 0 : metadata.requestTime ?? 0);
    }
    /**
     * Calculate the time to receive a single item for the given metadata entries.
     * @param metadatas An array of checked metadata.
     */
    static getRequestItemTimes(metadatas) {
        return metadatas
            .map(metadata => metadata.pageSize ? (metadata.requestTime ?? 0) / metadata.pageSize : 0);
    }
    /**
     * Construct a metadata validation state for the given metadata entries.
     * @param metadatas An array of checked metadata.
     */
    constructState(metadatas) {
        // Propagate metadata invalidations
        const state = new utils_metadata_1.MetadataValidationState();
        const invalidateListener = () => state.invalidate();
        for (const metadata of metadatas) {
            metadata.state.addInvalidateListener(invalidateListener);
        }
        return state;
    }
    /**
     * Helper function to create a new metadata object for the join result.
     * For required metadata entries that are not provided, sane defaults are calculated.
     * @param entries Join entries.
     * @param metadatas Metadata of the join entries.
     * @param context The action context.
     * @param partialMetadata Partial metadata entries.
     * @param optional If metadata for an optional operation must be calculated.
     */
    async constructResultMetadata(entries, metadatas, context, partialMetadata = {}, optional = false) {
        let cardinalityJoined;
        if (partialMetadata.cardinality) {
            cardinalityJoined = partialMetadata.cardinality;
        }
        else {
            let hasZeroCardinality = false;
            cardinalityJoined = metadatas
                .reduce((acc, metadata) => {
                const cardinalityThis = ActorRdfJoin.getCardinality(metadata);
                if (cardinalityThis.value === 0) {
                    hasZeroCardinality = true;
                }
                return {
                    type: cardinalityThis.type === 'estimate' ? 'estimate' : acc.type,
                    value: acc.value * (optional ? Math.max(1, cardinalityThis.value) : cardinalityThis.value),
                };
            }, { type: 'exact', value: 1 });
            // The cardinality should only be zero if one of the entries has zero cardinality, not due to float overflow
            if (!hasZeroCardinality || optional) {
                cardinalityJoined.value *= (await this.mediatorJoinSelectivity.mediate({ entries, context })).selectivity;
                if (cardinalityJoined.value === 0) {
                    cardinalityJoined.value = Number.MIN_VALUE;
                }
            }
        }
        return {
            state: this.constructState(metadatas),
            ...partialMetadata,
            cardinality: {
                type: cardinalityJoined.type,
                value: cardinalityJoined.value,
            },
            variables: ActorRdfJoin.joinVariables(context.getSafe(context_entries_1.KeysInitQuery.dataFactory), metadatas, optional),
        };
    }
    /**
     * Order the given join entries using the join-entries-sort bus.
     * @param {MediatorRdfJoinEntriesSort} mediatorJoinEntriesSort A mediator for sorting join entries.
     * @param {IJoinEntryWithMetadata[]} entries An array of join entries.
     * @param context The action context.
     * @return {IJoinEntryWithMetadata[]} The sorted join entries.
     */
    static async sortJoinEntries(mediatorJoinEntriesSort, entries, context) {
        // If there is a stream that can contain undefs, we don't modify the join order.
        const hasUndefVars = entries.some(entry => entry.metadata.variables.some(variable => variable.canBeUndef));
        if (hasUndefVars) {
            return (0, core_1.passTest)(entries);
        }
        // Calculate number of occurrences of each variable
        const variableOccurrences = {};
        for (const entry of entries) {
            for (const variable of entry.metadata.variables) {
                let counter = variableOccurrences[variable.variable.value];
                if (!counter) {
                    counter = 0;
                }
                variableOccurrences[variable.variable.value] = ++counter;
            }
        }
        // Determine variables that occur in at least two join entries
        const multiOccurrenceVariables = [];
        for (const [variable, count] of Object.entries(variableOccurrences)) {
            if (count >= 2) {
                multiOccurrenceVariables.push(variable);
            }
        }
        // Reject if no entries have common variables
        if (multiOccurrenceVariables.length === 0) {
            return (0, core_1.failTest)(`Bind join can only join entries with at least one common variable`);
        }
        return (0, core_1.passTest)((await mediatorJoinEntriesSort.mediate({ entries, context })).entries);
    }
    /**
     * Default test function for join actors.
     * Checks whether all iterators have metadata.
     * If yes: call the abstract getIterations method, if not: return Infinity.
     * @param {IActionRdfJoin} action The input action containing the relevant iterators
     * @returns {Promise<IMediatorTypeJoinCoefficients>} The join coefficients.
     */
    async test(action) {
        // Validate logical join type
        if (action.type !== this.logicalType) {
            return (0, core_1.failTest)(`${this.name} can only handle logical joins of type '${this.logicalType}', while '${action.type}' was given.`);
        }
        // Don't allow joining of one or zero streams
        if (action.entries.length <= 1) {
            return (0, core_1.failTest)(`${this.name} requires at least two join entries.`);
        }
        // Check if this actor can handle the given number of streams
        if (this.limitEntriesMin ? action.entries.length < this.limitEntries : action.entries.length > this.limitEntries) {
            return (0, core_1.failTest)(`${this.name} requires ${this.limitEntries} join entries at ${this.limitEntriesMin ? 'least' : 'most'}. The input contained ${action.entries.length}.`);
        }
        // Check if all streams are bindings streams
        for (const entry of action.entries) {
            if (entry.output.type !== 'bindings') {
                // eslint-disable-next-line ts/restrict-template-expressions
                return (0, core_1.failTest)(`Invalid type of a join entry: Expected 'bindings' but got '${entry.output.type}'`);
            }
        }
        const metadatas = await ActorRdfJoin.getMetadatas(action.entries);
        // Check if this actor can handle undefs (for overlapping variables)
        let overlappingVariables;
        if (!this.canHandleUndefs) {
            overlappingVariables = ActorRdfJoin.overlappingVariables(metadatas);
            if (overlappingVariables.some(variable => variable.canBeUndef)) {
                return (0, core_1.failTest)(`Actor ${this.name} can not join streams containing undefs`);
            }
        }
        // This actor only works with common variables
        if (this.requiresVariableOverlap &&
            (overlappingVariables ?? ActorRdfJoin.overlappingVariables(metadatas)).length === 0) {
            return (0, core_1.failTest)(`Actor ${this.name} can only join entries with at least one common variable`);
        }
        return await this.getJoinCoefficients(action, { metadatas });
    }
    /**
     * Returns default input for 0 or 1 entries. Calls the getOutput function otherwise
     * @param {IActionRdfJoin} action
     * @param sideData Side data from the test method
     * @returns {Promise<IQueryOperationResultBindings>} A bindings result.
     */
    async run(action, sideData) {
        // Prepare logging to physical plan
        // This must be called before getOutput, because we need to override the plan node in the context
        let parentPhysicalQueryPlanNode;
        if (action.context.has(context_entries_1.KeysInitQuery.physicalQueryPlanLogger)) {
            parentPhysicalQueryPlanNode = action.context.get(context_entries_1.KeysInitQuery.physicalQueryPlanNode);
            action.context = action.context.set(context_entries_1.KeysInitQuery.physicalQueryPlanNode, action);
        }
        // Log to physical plan
        const physicalQueryPlanLogger = action.context.get(context_entries_1.KeysInitQuery
            .physicalQueryPlanLogger);
        let planMetadata;
        if (this.includeInLogs && physicalQueryPlanLogger) {
            planMetadata = {};
            // Stash non-join children, as they will be unstashed later in sub-joins.
            physicalQueryPlanLogger.stashChildren(parentPhysicalQueryPlanNode, node => node.logicalOperator.startsWith('join'));
            physicalQueryPlanLogger.logOperation(`join-${this.logicalType}`, this.physicalName, action, parentPhysicalQueryPlanNode, this.name, planMetadata);
        }
        // Get action output
        const { result, physicalPlanMetadata } = await this.getOutput(action, sideData);
        // Fill in the physical plan metadata after determining action output
        if (planMetadata) {
            // eslint-disable-next-line ts/no-floating-promises
            (0, utils_iterator_1.instrumentIterator)(result.bindingsStream)
                .then((counters) => {
                physicalQueryPlanLogger.appendMetadata(action, {
                    cardinalityReal: counters.count,
                    timeSelf: counters.timeSelf,
                    timeLife: counters.timeLife,
                });
            });
            Object.assign(planMetadata, physicalPlanMetadata);
            const cardinalities = sideData.metadatas.map(ActorRdfJoin.getCardinality);
            planMetadata.cardinalities = cardinalities;
            planMetadata.joinCoefficients = (await this.getJoinCoefficients(action, sideData)).getOrThrow();
            // If this is a leaf operation, include join entries in plan metadata.
            if (this.isLeaf) {
                for (let i = 0; i < action.entries.length; i++) {
                    const entry = action.entries[i];
                    physicalQueryPlanLogger.unstashChild(entry.operation, action);
                    physicalQueryPlanLogger.appendMetadata(entry.operation, { cardinality: cardinalities[i] });
                }
            }
        }
        // Cache metadata
        result.metadata = (0, utils_metadata_1.cachifyMetadata)(result.metadata);
        return result;
    }
}
exports.ActorRdfJoin = ActorRdfJoin;
//# sourceMappingURL=ActorRdfJoin.js.map