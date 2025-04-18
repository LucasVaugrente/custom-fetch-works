"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfJoinOptionalBind = void 0;
const actor_rdf_join_inner_multi_bind_1 = require("@comunica/actor-rdf-join-inner-multi-bind");
const bus_rdf_join_1 = require("@comunica/bus-rdf-join");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Optional Bind RDF Join Actor.
 */
class ActorRdfJoinOptionalBind extends bus_rdf_join_1.ActorRdfJoin {
    constructor(args) {
        super(args, {
            logicalType: 'optional',
            physicalName: 'bind',
            limitEntries: 2,
            canHandleUndefs: true,
            isLeaf: false,
            requiresVariableOverlap: true,
        });
    }
    async getOutput(action) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const bindingsFactory = await utils_bindings_factory_1.BindingsFactory.create(this.mediatorMergeBindingsContext, action.context, dataFactory);
        // Close the right stream, since we don't need that one
        action.entries[1].output.bindingsStream.close();
        // Bind the right pattern for each binding in the stream
        const subContext = action.context
            .set(context_entries_1.KeysQueryOperation.joinLeftMetadata, await action.entries[0].output.metadata())
            .set(context_entries_1.KeysQueryOperation.joinRightMetadatas, [await action.entries[1].output.metadata()]);
        const bindingsStream = actor_rdf_join_inner_multi_bind_1.ActorRdfJoinMultiBind.createBindStream(this.bindOrder, action.entries[0].output.bindingsStream, [action.entries[1].operation], async (operations, operationBindings) => {
            // Send the materialized patterns to the mediator for recursive join evaluation.
            // Length of operations will always be 1
            const operation = operations[0];
            const output = (0, utils_query_operation_1.getSafeBindings)(await this.mediatorQueryOperation.mediate({ operation, context: subContext?.set(context_entries_1.KeysQueryOperation.joinBindings, operationBindings) }));
            return output.bindingsStream;
        }, true, algebraFactory, bindingsFactory);
        return {
            result: {
                type: 'bindings',
                bindingsStream,
                metadata: async () => await this.constructResultMetadata(action.entries, await bus_rdf_join_1.ActorRdfJoin.getMetadatas(action.entries), action.context, {}, true),
            },
        };
    }
    async getJoinCoefficients(action, sideData) {
        const { metadatas } = sideData;
        const requestInitialTimes = bus_rdf_join_1.ActorRdfJoin.getRequestInitialTimes(metadatas);
        const requestItemTimes = bus_rdf_join_1.ActorRdfJoin.getRequestItemTimes(metadatas);
        // Reject binding on some operation types
        if (action.entries[1].operation.type === sparqlalgebrajs_1.Algebra.types.EXTEND ||
            action.entries[1].operation.type === sparqlalgebrajs_1.Algebra.types.GROUP) {
            return (0, core_1.failTest)(`Actor ${this.name} can not bind on Extend and Group operations`);
        }
        // Determine selectivity of join
        const selectivity = (await this.mediatorJoinSelectivity.mediate({
            entries: action.entries,
            context: action.context,
        })).selectivity * this.selectivityModifier;
        return (0, core_1.passTestWithSideData)({
            iterations: metadatas[0].cardinality.value * metadatas[1].cardinality.value * selectivity,
            persistedItems: 0,
            blockingItems: 0,
            requestTime: requestInitialTimes[0] +
                metadatas[0].cardinality.value * (requestItemTimes[0] +
                    requestInitialTimes[1] +
                    selectivity * metadatas[1].cardinality.value * requestItemTimes[1]),
        }, sideData);
    }
}
exports.ActorRdfJoinOptionalBind = ActorRdfJoinOptionalBind;
//# sourceMappingURL=ActorRdfJoinOptionalBind.js.map