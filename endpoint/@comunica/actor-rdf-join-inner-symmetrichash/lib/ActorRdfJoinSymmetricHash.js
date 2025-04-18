"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfJoinSymmetricHash = void 0;
const bus_rdf_join_1 = require("@comunica/bus-rdf-join");
const core_1 = require("@comunica/core");
const asyncjoin_1 = require("asyncjoin");
/**
 * A comunica Hash RDF Join Actor.
 */
class ActorRdfJoinSymmetricHash extends bus_rdf_join_1.ActorRdfJoin {
    constructor(args) {
        super(args, {
            logicalType: 'inner',
            physicalName: 'symmetric-hash',
            limitEntries: 2,
            requiresVariableOverlap: true,
        });
    }
    async getOutput(action) {
        const metadatas = await bus_rdf_join_1.ActorRdfJoin.getMetadatas(action.entries);
        const variables = bus_rdf_join_1.ActorRdfJoin.overlappingVariables(metadatas);
        const { hashFunction } = await this.mediatorHashBindings.mediate({ context: action.context });
        const variablesRaw = variables.map(v => v.variable);
        const join = new asyncjoin_1.SymmetricHashJoin(action.entries[0].output.bindingsStream, action.entries[1].output.bindingsStream, entry => hashFunction(entry, variablesRaw), bus_rdf_join_1.ActorRdfJoin.joinBindings);
        return {
            result: {
                type: 'bindings',
                bindingsStream: join,
                metadata: async () => await this.constructResultMetadata(action.entries, metadatas, action.context),
            },
        };
    }
    async getJoinCoefficients(action, sideData) {
        const { metadatas } = sideData;
        const requestInitialTimes = bus_rdf_join_1.ActorRdfJoin.getRequestInitialTimes(metadatas);
        const requestItemTimes = bus_rdf_join_1.ActorRdfJoin.getRequestItemTimes(metadatas);
        return (0, core_1.passTestWithSideData)({
            iterations: metadatas[0].cardinality.value + metadatas[1].cardinality.value,
            persistedItems: metadatas[0].cardinality.value + metadatas[1].cardinality.value,
            blockingItems: 0,
            requestTime: requestInitialTimes[0] + metadatas[0].cardinality.value * requestItemTimes[0] +
                requestInitialTimes[1] + metadatas[1].cardinality.value * requestItemTimes[1],
        }, sideData);
    }
}
exports.ActorRdfJoinSymmetricHash = ActorRdfJoinSymmetricHash;
//# sourceMappingURL=ActorRdfJoinSymmetricHash.js.map