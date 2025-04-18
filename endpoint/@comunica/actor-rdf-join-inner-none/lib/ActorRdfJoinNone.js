"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfJoinNone = void 0;
const bus_rdf_join_1 = require("@comunica/bus-rdf-join");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const utils_metadata_1 = require("@comunica/utils-metadata");
const asynciterator_1 = require("asynciterator");
/**
 * A comunica None RDF Join Actor.
 */
class ActorRdfJoinNone extends bus_rdf_join_1.ActorRdfJoin {
    constructor(args) {
        super(args, {
            logicalType: 'inner',
            physicalName: 'none',
            limitEntries: 0,
        });
    }
    async test(action) {
        // Allow joining of one or zero streams
        if (action.entries.length > 0) {
            return (0, core_1.failTest)(`Actor ${this.name} can only join zero entries`);
        }
        return await this.getJoinCoefficients(action, undefined);
    }
    async getOutput(action) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const bindingsFactory = await utils_bindings_factory_1.BindingsFactory.create(this.mediatorMergeBindingsContext, action.context, dataFactory);
        return {
            result: {
                bindingsStream: new asynciterator_1.ArrayIterator([bindingsFactory.bindings()], { autoStart: false }),
                metadata: () => Promise.resolve({
                    state: new utils_metadata_1.MetadataValidationState(),
                    cardinality: { type: 'exact', value: 1 },
                    variables: [],
                }),
                type: 'bindings',
            },
        };
    }
    async getJoinCoefficients(action, sideData) {
        return (0, core_1.passTestWithSideData)({
            iterations: 0,
            persistedItems: 0,
            blockingItems: 0,
            requestTime: 0,
        }, sideData);
    }
}
exports.ActorRdfJoinNone = ActorRdfJoinNone;
//# sourceMappingURL=ActorRdfJoinNone.js.map