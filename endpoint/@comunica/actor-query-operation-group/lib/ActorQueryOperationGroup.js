"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationGroup = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const asynciterator_1 = require("asynciterator");
const GroupsState_1 = require("./GroupsState");
/**
 * A comunica Group Query Operation Actor.
 */
class ActorQueryOperationGroup extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'group');
        this.mediatorBindingsAggregatorFactory = args.mediatorBindingsAggregatorFactory;
    }
    async testOperation() {
        return (0, core_1.passTestVoid)();
    }
    async runOperation(operation, context) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const bindingsFactory = await utils_bindings_factory_1.BindingsFactory.create(this.mediatorMergeBindingsContext, context, dataFactory);
        // Get result stream for the input query
        const { input, aggregates } = operation;
        const outputRaw = await this.mediatorQueryOperation.mediate({ operation: input, context });
        const output = (0, utils_query_operation_1.getSafeBindings)(outputRaw);
        // The variables in scope are the variables on which we group, i.e. pattern.variables.
        // For 'GROUP BY ?x, ?z', this is [?x, ?z], for 'GROUP by expr(?x) as ?e' this is [?e].
        // But also in scope are the variables defined by the aggregations, since GROUP has to handle this.
        const variables = [
            ...operation.variables,
            ...aggregates.map(agg => agg.variable),
        ].map(variable => ({ variable, canBeUndef: false }));
        const variablesInner = (await output.metadata()).variables.map(v => v.variable);
        // Wrap a new promise inside an iterator that completes when the stream has ended or when an error occurs
        const bindingsStream = new asynciterator_1.TransformIterator(() => new Promise((resolve, reject) => {
            const groups = new GroupsState_1.GroupsState(operation, this.mediatorBindingsAggregatorFactory, context, bindingsFactory, variablesInner);
            // Phase 2: Collect aggregator results
            // We can only return when the binding stream ends, when that happens
            // we return the identified groups. Which are nothing more than Bindings
            // of the grouping variables merged with the aggregate variables
            // eslint-disable-next-line ts/no-misused-promises
            output.bindingsStream.on('end', async () => {
                try {
                    const bindingsStreamInner = new asynciterator_1.ArrayIterator(await groups.collectResults(), { autoStart: false });
                    resolve(bindingsStreamInner);
                }
                catch (error) {
                    reject(error);
                }
            });
            // Make sure to propagate any errors in the binding stream
            output.bindingsStream.on('error', reject);
            // Phase 1: Consume the stream, identify the groups and populate the aggregators.
            // We need to bind this after the 'error' and 'end' listeners to avoid the
            // stream having ended before those listeners are bound.
            output.bindingsStream.on('data', (bindings) => {
                groups.consumeBindings(bindings).catch(reject);
            });
        }), { autoStart: false });
        return {
            type: 'bindings',
            bindingsStream,
            metadata: async () => ({ ...await output.metadata(), variables }),
        };
    }
}
exports.ActorQueryOperationGroup = ActorQueryOperationGroup;
//# sourceMappingURL=ActorQueryOperationGroup.js.map