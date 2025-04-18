"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfUpdateHypermediaPatchSparqlUpdate = void 0;
const bus_rdf_update_hypermedia_1 = require("@comunica/bus-rdf-update-hypermedia");
const core_1 = require("@comunica/core");
const QuadDestinationPatchSparqlUpdate_1 = require("./QuadDestinationPatchSparqlUpdate");
/**
 * A comunica Patch SPARQL Update RDF Update Hypermedia Actor.
 */
class ActorRdfUpdateHypermediaPatchSparqlUpdate extends bus_rdf_update_hypermedia_1.ActorRdfUpdateHypermedia {
    constructor(args) {
        super(args, 'patchSparqlUpdate');
    }
    async testMetadata(action) {
        if (!action.forceDestinationType && !action.metadata.patchSparqlUpdate) {
            return (0, core_1.failTest)(`Actor ${this.name} could not detect a destination with 'application/sparql-update' as 'Accept-Patch' header.`);
        }
        if (!action.forceDestinationType && !action.exists) {
            return (0, core_1.failTest)(`Actor ${this.name} can only patch a destination that already exists.`);
        }
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        this.logInfo(action.context, `Identified as patchSparqlUpdate destination: ${action.url}`);
        return {
            destination: new QuadDestinationPatchSparqlUpdate_1.QuadDestinationPatchSparqlUpdate(action.url, action.context, this.mediatorHttp),
        };
    }
}
exports.ActorRdfUpdateHypermediaPatchSparqlUpdate = ActorRdfUpdateHypermediaPatchSparqlUpdate;
//# sourceMappingURL=ActorRdfUpdateHypermediaPatchSparqlUpdate.js.map