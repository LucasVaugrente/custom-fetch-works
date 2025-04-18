"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfJoinOptionalOptPlus = void 0;
const bus_rdf_join_1 = require("@comunica/bus-rdf-join");
const core_1 = require("@comunica/core");
const asynciterator_1 = require("asynciterator");
/**
 * A comunica Optional Opt+ RDF Join Actor.
 */
class ActorRdfJoinOptionalOptPlus extends bus_rdf_join_1.ActorRdfJoin {
    constructor(args) {
        super(args, {
            logicalType: 'optional',
            physicalName: 'nested-loop',
            limitEntries: 2,
            canHandleUndefs: true,
        });
    }
    async getOutput({ entries, context }) {
        const clonedStream = entries[0].output.bindingsStream.clone();
        entries[0].output.bindingsStream = entries[0].output.bindingsStream.clone();
        const joined = await this.mediatorJoin.mediate({ type: 'inner', entries, context });
        return { result: {
                type: 'bindings',
                bindingsStream: new asynciterator_1.UnionIterator([clonedStream, joined.bindingsStream], { autoStart: false }),
                metadata: async () => await this.constructResultMetadata(entries, await bus_rdf_join_1.ActorRdfJoin.getMetadatas(entries), context, {}, true),
            } };
    }
    async getJoinCoefficients(action, sideData) {
        return (0, core_1.passTestWithSideData)({
            iterations: sideData.metadatas[0].cardinality.value + sideData.metadatas[1].cardinality.value,
            persistedItems: 0,
            blockingItems: 0,
            requestTime: 0,
        }, sideData);
    }
}
exports.ActorRdfJoinOptionalOptPlus = ActorRdfJoinOptionalOptPlus;
//# sourceMappingURL=ActorRdfJoinOptionalOptPlus.js.map