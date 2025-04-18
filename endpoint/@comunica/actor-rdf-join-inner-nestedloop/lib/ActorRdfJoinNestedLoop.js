"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfJoinNestedLoop = void 0;
const bus_rdf_join_1 = require("@comunica/bus-rdf-join");
const core_1 = require("@comunica/core");
const asyncjoin_1 = require("asyncjoin");
/**
 * A comunica NestedLoop RDF Join Actor.
 */
class ActorRdfJoinNestedLoop extends bus_rdf_join_1.ActorRdfJoin {
    constructor(args) {
        super(args, {
            logicalType: 'inner',
            physicalName: 'nested-loop',
            limitEntries: 2,
            canHandleUndefs: true,
        });
    }
    async getOutput(action) {
        const join = new asyncjoin_1.NestedLoopJoin(action.entries[0].output.bindingsStream, action.entries[1].output.bindingsStream, bus_rdf_join_1.ActorRdfJoin.joinBindings, { autoStart: false });
        return {
            result: {
                type: 'bindings',
                bindingsStream: join,
                metadata: async () => await this.constructResultMetadata(action.entries, await bus_rdf_join_1.ActorRdfJoin.getMetadatas(action.entries), action.context),
            },
        };
    }
    async getJoinCoefficients(action, sideData) {
        const { metadatas } = sideData;
        const requestInitialTimes = bus_rdf_join_1.ActorRdfJoin.getRequestInitialTimes(metadatas);
        const requestItemTimes = bus_rdf_join_1.ActorRdfJoin.getRequestItemTimes(metadatas);
        return (0, core_1.passTestWithSideData)({
            iterations: metadatas[0].cardinality.value * metadatas[1].cardinality.value,
            persistedItems: 0,
            blockingItems: 0,
            requestTime: requestInitialTimes[0] + metadatas[0].cardinality.value * requestItemTimes[0] +
                requestInitialTimes[1] + metadatas[1].cardinality.value * requestItemTimes[1],
        }, sideData);
    }
}
exports.ActorRdfJoinNestedLoop = ActorRdfJoinNestedLoop;
//# sourceMappingURL=ActorRdfJoinNestedLoop.js.map