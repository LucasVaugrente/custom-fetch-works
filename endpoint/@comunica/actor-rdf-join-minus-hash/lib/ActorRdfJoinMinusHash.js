"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfJoinMinusHash = void 0;
const bus_rdf_join_1 = require("@comunica/bus-rdf-join");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const utils_bindings_index_1 = require("@comunica/utils-bindings-index");
const utils_iterator_1 = require("@comunica/utils-iterator");
const rdf_string_1 = require("rdf-string");
/**
 * A comunica Minus Hash RDF Join Actor.
 */
class ActorRdfJoinMinusHash extends bus_rdf_join_1.ActorRdfJoin {
    constructor(args) {
        super(args, {
            logicalType: 'minus',
            physicalName: `hash-${args.canHandleUndefs ? 'undef' : 'def'}`,
            limitEntries: 2,
            canHandleUndefs: args.canHandleUndefs,
        });
    }
    static constructIndex(undef, commonVariables) {
        return undef ?
            new utils_bindings_index_1.BindingsIndexUndef(commonVariables, (term) => term && term.termType !== 'Variable' ? (0, rdf_string_1.termToString)(term) : '', false) :
            new utils_bindings_index_1.BindingsIndexDef(commonVariables, utils_bindings_factory_1.bindingsToCompactString);
    }
    async getOutput(action) {
        const buffer = action.entries[1].output;
        const output = action.entries[0].output;
        const metadatas = await bus_rdf_join_1.ActorRdfJoin.getMetadatas(action.entries);
        const commonVariables = bus_rdf_join_1.ActorRdfJoin.overlappingVariables(metadatas);
        // Destroy the buffer stream since it is not needed when
        // there are no common variables.
        if (commonVariables.length === 0) {
            buffer.bindingsStream.destroy();
            return { result: output };
        }
        const bindingsStream = new utils_iterator_1.ClosableTransformIterator(async () => {
            // We index all bindings from the buffer iterator first in a blocking manner.
            const index = ActorRdfJoinMinusHash
                .constructIndex(this.canHandleUndefs, commonVariables);
            await new Promise((resolve) => {
                buffer.bindingsStream.on('data', bindings => index.put(bindings, true));
                buffer.bindingsStream.on('end', resolve);
                buffer.bindingsStream.on('error', error => bindingsStream.emit('error', error));
            });
            // From the left-hand iterator filter out all entries of the index
            return output.bindingsStream.filter(bindings => !index.getFirst(bindings, true));
        }, {
            autoStart: false,
            onClose() {
                buffer.bindingsStream.destroy();
                output.bindingsStream.destroy();
            },
        });
        return {
            result: {
                type: 'bindings',
                bindingsStream,
                metadata: output.metadata,
            },
        };
    }
    async getJoinCoefficients(action, sideData) {
        const { metadatas } = sideData;
        const requestInitialTimes = bus_rdf_join_1.ActorRdfJoin.getRequestInitialTimes(metadatas);
        const requestItemTimes = bus_rdf_join_1.ActorRdfJoin.getRequestItemTimes(metadatas);
        let iterations = metadatas[0].cardinality.value + metadatas[1].cardinality.value;
        if (!this.canHandleUndefs) {
            // Our non-undef implementation is slightly more performant.
            iterations *= 0.8;
        }
        return (0, core_1.passTestWithSideData)({
            iterations,
            persistedItems: metadatas[0].cardinality.value,
            blockingItems: metadatas[0].cardinality.value,
            requestTime: requestInitialTimes[0] + metadatas[0].cardinality.value * requestItemTimes[0] +
                requestInitialTimes[1] + metadatas[1].cardinality.value * requestItemTimes[1],
        }, sideData);
    }
}
exports.ActorRdfJoinMinusHash = ActorRdfJoinMinusHash;
//# sourceMappingURL=ActorRdfJoinMinusHash.js.map