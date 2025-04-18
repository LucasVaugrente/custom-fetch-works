"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfUpdateHypermediaPutLdp = void 0;
const bus_rdf_update_hypermedia_1 = require("@comunica/bus-rdf-update-hypermedia");
const core_1 = require("@comunica/core");
const QuadDestinationPutLdp_1 = require("./QuadDestinationPutLdp");
/**
 * A comunica Post LDP RDF Update Hypermedia Actor.
 */
class ActorRdfUpdateHypermediaPutLdp extends bus_rdf_update_hypermedia_1.ActorRdfUpdateHypermedia {
    constructor(args) {
        super(args, 'putLdp');
    }
    async testMetadata(action) {
        if (!action.forceDestinationType) {
            if (!action.metadata.allowHttpMethods || !action.metadata.allowHttpMethods.includes('PUT')) {
                return (0, core_1.failTest)(`Actor ${this.name} could not detect a destination with 'Allow: PUT' header.`);
            }
            if (action.exists) {
                return (0, core_1.failTest)(`Actor ${this.name} can only put on a destination that does not already exists.`);
            }
        }
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        this.logInfo(action.context, `Identified as putLdp destination: ${action.url}`);
        return {
            destination: new QuadDestinationPutLdp_1.QuadDestinationPutLdp(action.url, action.context, action.metadata.putAccepted || [], this.mediatorHttp, this.mediatorRdfSerializeMediatypes, this.mediatorRdfSerialize),
        };
    }
}
exports.ActorRdfUpdateHypermediaPutLdp = ActorRdfUpdateHypermediaPutLdp;
//# sourceMappingURL=ActorRdfUpdateHypermediaPutLdp.js.map