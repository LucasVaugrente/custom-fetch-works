"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfUpdateQuadsRdfJsStore = void 0;
const bus_rdf_update_quads_1 = require("@comunica/bus-rdf-update-quads");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const RdfJsQuadDestination_1 = require("./RdfJsQuadDestination");
/**
 * A comunica RDFJS Store RDF Update Quads Actor.
 */
class ActorRdfUpdateQuadsRdfJsStore extends bus_rdf_update_quads_1.ActorRdfUpdateQuadsDestination {
    constructor(args) {
        super(args);
    }
    async test(action) {
        const destination = (0, bus_rdf_update_quads_1.getContextDestination)(action.context);
        if (!destination || typeof destination === 'string' ||
            (!('remove' in destination) && 'value' in destination && !destination.value?.remove)) {
            return (0, core_1.failTest)(`${this.name} received an invalid rdfjsStore.`);
        }
        return (0, core_1.passTestVoid)();
    }
    async getDestination(context) {
        const destination = (0, bus_rdf_update_quads_1.getContextDestination)(context);
        return new RdfJsQuadDestination_1.RdfJsQuadDestination(context.getSafe(context_entries_1.KeysInitQuery.dataFactory), 'remove' in destination ? destination : destination.value);
    }
}
exports.ActorRdfUpdateQuadsRdfJsStore = ActorRdfUpdateQuadsRdfJsStore;
//# sourceMappingURL=ActorRdfUpdateQuadsRdfJsStore.js.map