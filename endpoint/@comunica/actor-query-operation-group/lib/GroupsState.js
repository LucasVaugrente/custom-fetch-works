"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsState = void 0;
const context_entries_1 = require("@comunica/context-entries");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
/**
 * A state manager for the groups constructed by consuming the bindings-stream.
 */
class GroupsState {
    constructor(pattern, mediatorBindingsAggregatorFactory, context, bindingsFactory, variables) {
        this.pattern = pattern;
        this.mediatorBindingsAggregatorFactory = mediatorBindingsAggregatorFactory;
        this.context = context;
        this.bindingsFactory = bindingsFactory;
        this.variables = variables;
        this.groups = new Map();
        this.groupsInitializer = new Map();
        this.groupVariables = new Set(this.pattern.variables.map(x => x.value));
        this.waitCounter = 1;
        this.resultHasBeenCalled = false;
    }
    /**
     * - Consumes a stream binding
     * - Find the corresponding group and create one if need be
     * - Feeds the binding to the group's aggregators
     *
     * @param {Bindings} bindings - The Bindings to consume
     */
    consumeBindings(bindings) {
        const check = this.resultCheck();
        if (check) {
            return check;
        }
        // We increment the counter and decrement him when put action is performed.
        this.waitCounter++;
        // Select the bindings on which we group
        const grouper = bindings
            .filter((_, variable) => this.groupVariables.has(variable.value));
        const groupHash = this.hashBindings(grouper);
        // First member of group -> create new group
        let groupInitializer = this.groupsInitializer.get(groupHash);
        let res;
        if (groupInitializer) {
            const groupInitializerDefined = groupInitializer;
            res = (async () => {
                const group = await groupInitializerDefined;
                await Promise.all(this.pattern.aggregates.map(async (aggregate) => {
                    // Distinct handling is done in the aggregator.
                    const variable = aggregate.variable.value;
                    await group.aggregators[variable].putBindings(bindings);
                }));
            })().then(async () => {
                await this.subtractWaitCounterAndCollect();
            });
        }
        else {
            // Initialize state for all aggregators for new group
            groupInitializer = (async () => {
                const aggregators = {};
                await Promise.all(this.pattern.aggregates.map(async (aggregate) => {
                    const key = aggregate.variable.value;
                    aggregators[key] = await this.mediatorBindingsAggregatorFactory
                        .mediate({ expr: aggregate, context: this.context });
                    await aggregators[key].putBindings(bindings);
                }));
                const group = { aggregators, bindings: grouper };
                this.groups.set(groupHash, group);
                await this.subtractWaitCounterAndCollect();
                return group;
            })();
            this.groupsInitializer.set(groupHash, groupInitializer);
            res = groupInitializer;
        }
        return res;
    }
    async subtractWaitCounterAndCollect() {
        if (--this.waitCounter === 0) {
            await this.handleResultCollection();
        }
    }
    async handleResultCollection() {
        const dataFactory = this.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        // Collect groups
        let rows = await Promise.all([...this.groups].map(async ([_, group]) => {
            const { bindings: groupBindings, aggregators } = group;
            // Collect aggregator bindings
            // If the aggregate errorred, the result will be undefined
            let returnBindings = groupBindings;
            for (const variable in aggregators) {
                const value = await aggregators[variable].result();
                if (value) {
                    // Filter undefined
                    returnBindings = returnBindings.set(dataFactory.variable(variable), value);
                }
            }
            // Merge grouping bindings and aggregator bindings
            return returnBindings;
        }));
        // Case: No Input
        // Some aggregators still define an output on the empty input
        // Result is a single Bindings
        if (rows.length === 0 && this.groupVariables.size === 0) {
            const single = [];
            await Promise.all(this.pattern.aggregates.map(async (aggregate) => {
                const key = aggregate.variable;
                const aggregator = await this.mediatorBindingsAggregatorFactory
                    .mediate({ expr: aggregate, context: this.context });
                const value = await aggregator.result();
                if (value !== undefined) {
                    single.push([key, value]);
                }
            }));
            rows = [this.bindingsFactory.bindings(single)];
        }
        this.waitResolver(rows);
    }
    resultCheck() {
        if (this.resultHasBeenCalled) {
            return Promise.reject(new Error('Calling any function after calling collectResult is invalid.'));
        }
    }
    /**
     * Collect the result of the final state. This returns a Bindings per group,
     * and a (possibly empty) Bindings in case no Bindings have been consumed yet.
     * You can only call this method once, after calling this method,
     * calling any function on this will result in an error being thrown.
     */
    async collectResults() {
        const check = this.resultCheck();
        if (check) {
            return check;
        }
        this.resultHasBeenCalled = true;
        const res = new Promise((resolve) => {
            this.waitResolver = resolve;
        });
        await this.subtractWaitCounterAndCollect();
        return res;
    }
    /**
     * @param {Bindings} bindings - Bindings to hash
     */
    hashBindings(bindings) {
        return (0, utils_bindings_factory_1.bindingsToCompactString)(bindings, this.variables);
    }
}
exports.GroupsState = GroupsState;
//# sourceMappingURL=GroupsState.js.map