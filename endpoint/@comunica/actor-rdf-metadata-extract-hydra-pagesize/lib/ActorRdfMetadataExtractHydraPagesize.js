"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfMetadataExtractHydraPagesize = void 0;
const bus_rdf_metadata_extract_1 = require("@comunica/bus-rdf-metadata-extract");
const core_1 = require("@comunica/core");
/**
 * A comunica Hydra Pagesize RDF Metadata Extract Actor.
 */
class ActorRdfMetadataExtractHydraPagesize extends bus_rdf_metadata_extract_1.ActorRdfMetadataExtract {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        return new Promise((resolve, reject) => {
            // Forward errors
            action.metadata.on('error', reject);
            // Immediately resolve when a value has been found.
            action.metadata.on('data', (quad) => {
                if (this.predicates.includes(quad.predicate.value)) {
                    resolve({ metadata: { pageSize: Number.parseInt(quad.object.value, 10) } });
                }
            });
            // If no value has been found, don't define the pageSize value.
            action.metadata.on('end', () => {
                resolve({ metadata: {} });
            });
        });
    }
}
exports.ActorRdfMetadataExtractHydraPagesize = ActorRdfMetadataExtractHydraPagesize;
//# sourceMappingURL=ActorRdfMetadataExtractHydraPagesize.js.map