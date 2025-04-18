"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfJoinHash = void 0;
const bus_rdf_join_1 = require("@comunica/bus-rdf-join");
const core_1 = require("@comunica/core");
const utils_bindings_index_1 = require("@comunica/utils-bindings-index");
const utils_iterator_1 = require("@comunica/utils-iterator");
const asynciterator_1 = require("asynciterator");
const asyncjoin_1 = require("asyncjoin");
const rdf_string_1 = require("rdf-string");
/**
 * A comunica Hash RDF Join Actor.
 */
class ActorRdfJoinHash extends bus_rdf_join_1.ActorRdfJoin {
    constructor(args) {
        super(args, {
            logicalType: 'inner',
            physicalName: `hash-${args.canHandleUndefs ? 'undef' : 'def'}`,
            limitEntries: 2,
            requiresVariableOverlap: true,
            canHandleUndefs: args.canHandleUndefs,
        });
    }
    async getOutput(action, sideData) {
        const metadatas = sideData.metadatas;
        let bindingsStream;
        const variables = bus_rdf_join_1.ActorRdfJoin.overlappingVariables(metadatas);
        if (this.canHandleUndefs) {
            /* Handle undefined values in bindings */
            const buffer = sideData.entriesSorted[0].output;
            const output = sideData.entriesSorted[1].output;
            bindingsStream = new utils_iterator_1.ClosableTransformIterator(async () => {
                // We index all bindings from the left-hand iterator first in a blocking manner.
                const index = new utils_bindings_index_1.BindingsIndexUndef(variables, (term) => term && term.termType !== 'Variable' ? (0, rdf_string_1.termToString)(term) : '', true);
                await new Promise((resolve) => {
                    buffer.bindingsStream.on('data', (bindings) => {
                        const iterator = index.getFirst(bindings, false) ?? index.put(bindings, []);
                        iterator.push(bindings);
                    });
                    buffer.bindingsStream.on('end', resolve);
                    buffer.bindingsStream.on('error', (error) => {
                        bindingsStream.emit('error', error);
                    });
                });
                // Start our left-hand iterator and try to join with the index
                return new asynciterator_1.MultiTransformIterator(output.bindingsStream, {
                    multiTransform: (bindings) => new asynciterator_1.ArrayIterator((index.get(bindings).flat())
                        .map(indexBindings => bus_rdf_join_1.ActorRdfJoin.joinBindings(bindings, indexBindings))
                        .filter(b => b !== null), { autoStart: false }),
                    autoStart: false,
                });
            }, {
                autoStart: false,
                onClose() {
                    buffer.bindingsStream.destroy();
                    output.bindingsStream.destroy();
                },
            });
        }
        else {
            /* Don't handle undefined values in bindings */
            const { hashFunction } = await this.mediatorHashBindings.mediate({ context: action.context });
            const variablesRaw = variables.map(v => v.variable);
            bindingsStream = new asyncjoin_1.HashJoin(sideData.entriesSorted[0].output.bindingsStream, sideData.entriesSorted[1].output.bindingsStream, entry => hashFunction(entry, variablesRaw), bus_rdf_join_1.ActorRdfJoin.joinBindings);
        }
        return {
            result: {
                type: 'bindings',
                bindingsStream,
                metadata: async () => await this.constructResultMetadata(sideData.entriesSorted, metadatas, action.context),
            },
        };
    }
    async getJoinCoefficients(action, sideData) {
        // Ensure the left build stream is the smallest
        let entriesSorted = action.entries;
        if (sideData.metadatas[1].cardinality.value < sideData.metadatas[0].cardinality.value) {
            sideData.metadatas = [sideData.metadatas[1], sideData.metadatas[0]];
            entriesSorted = [action.entries[1], action.entries[0]];
        }
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
        }, { ...sideData, entriesSorted });
    }
}
exports.ActorRdfJoinHash = ActorRdfJoinHash;
//# sourceMappingURL=ActorRdfJoinHash.js.map