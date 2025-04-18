"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfJoinOptionalHash = void 0;
const bus_rdf_join_1 = require("@comunica/bus-rdf-join");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const utils_bindings_index_1 = require("@comunica/utils-bindings-index");
const utils_iterator_1 = require("@comunica/utils-iterator");
const asynciterator_1 = require("asynciterator");
const rdf_string_1 = require("rdf-string");
/**
 * A comunica Optional Hash RDF Join Actor.
 */
class ActorRdfJoinOptionalHash extends bus_rdf_join_1.ActorRdfJoin {
    constructor(args) {
        super(args, {
            logicalType: 'optional',
            physicalName: `hash-${args.canHandleUndefs ? 'undef' : 'def'}-${args.blocking ? 'blocking' : 'nonblocking'}`,
            limitEntries: 2,
            canHandleUndefs: args.canHandleUndefs,
            requiresVariableOverlap: true,
        });
    }
    static constructIndex(undef, commonVariables) {
        return undef ?
            new utils_bindings_index_1.BindingsIndexUndef(commonVariables, (term) => term && term.termType !== 'Variable' ? (0, rdf_string_1.termToString)(term) : '', true) :
            new utils_bindings_index_1.BindingsIndexDef(commonVariables, utils_bindings_factory_1.bindingsToCompactString);
    }
    async getOutput(action) {
        const buffer = action.entries[1].output;
        const output = action.entries[0].output;
        const metadatas = await bus_rdf_join_1.ActorRdfJoin.getMetadatas(action.entries);
        const commonVariables = bus_rdf_join_1.ActorRdfJoin.overlappingVariables(metadatas);
        let bindingsStream;
        if (this.blocking) {
            // -- Blocking optional ---
            bindingsStream = new utils_iterator_1.ClosableTransformIterator(async () => {
                // We index all bindings from the right-hand OPTIONAL iterator first in a blocking manner.
                const index = ActorRdfJoinOptionalHash
                    .constructIndex(this.canHandleUndefs, commonVariables);
                await new Promise((resolve) => {
                    buffer.bindingsStream.on('data', (bindings) => {
                        const iterator = index.getFirst(bindings, true) ?? index.put(bindings, []);
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
                    optional: true,
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
            // -- Non-blocking optional ---
            // This can be slightly slower than the blocking one above, due to the streaming overhead.
            bindingsStream = new utils_iterator_1.ClosableTransformIterator(async () => {
                // We index all bindings from the right-hand OPTIONAL iterator.
                // They are indexed with iterator values, so our main stream can already get started.
                const index = ActorRdfJoinOptionalHash
                    .constructIndex(this.canHandleUndefs, commonVariables);
                let indexActive = true;
                buffer.bindingsStream.on('data', (bindings) => {
                    const iterator = index.getFirst(bindings, true) ??
                        index.put(bindings, new asynciterator_1.BufferedIterator({ autoStart: false }));
                    iterator._push(bindings);
                });
                buffer.bindingsStream.on('end', () => {
                    for (const iterator of index.values()) {
                        iterator.close();
                    }
                    indexActive = false;
                });
                buffer.bindingsStream.on('error', (error) => {
                    bindingsStream.emit('error', error);
                });
                // Start our left-hand iterator and try to join with the index
                return new asynciterator_1.MultiTransformIterator(output.bindingsStream, {
                    multiTransform: (bindings) => {
                        // Find iterators from the index
                        let iterators = index.get(bindings);
                        // If no index entry was found, set an empty iterator.
                        // If we index has been closed already, don't modify the index, but just use an empty dummy iterator.
                        if (iterators.length === 0) {
                            if (indexActive) {
                                iterators = [index.put(bindings, new asynciterator_1.BufferedIterator({ autoStart: false }))];
                            }
                            else {
                                iterators = [];
                            }
                        }
                        // Merge all iterators in a single one,
                        // and clone each one to make sure we can still use them in the future.
                        const iterator = new asynciterator_1.UnionIterator(iterators.map(it => it.clone()), { autoStart: false });
                        return iterator.map(indexBindings => bus_rdf_join_1.ActorRdfJoin.joinBindings(bindings, indexBindings));
                    },
                    optional: true,
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
        return {
            result: {
                type: 'bindings',
                bindingsStream,
                metadata: async () => await this.constructResultMetadata(action.entries, metadatas, action.context, {}, true),
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
        if (this.blocking) {
            // Our blocking implementation is slightly more performant.
            iterations *= 0.9;
        }
        return (0, core_1.passTestWithSideData)({
            iterations,
            persistedItems: metadatas[0].cardinality.value,
            blockingItems: this.blocking ? metadatas[0].cardinality.value : 0,
            requestTime: requestInitialTimes[0] + metadatas[0].cardinality.value * requestItemTimes[0] +
                requestInitialTimes[1] + metadatas[1].cardinality.value * requestItemTimes[1],
        }, sideData);
    }
}
exports.ActorRdfJoinOptionalHash = ActorRdfJoinOptionalHash;
//# sourceMappingURL=ActorRdfJoinOptionalHash.js.map