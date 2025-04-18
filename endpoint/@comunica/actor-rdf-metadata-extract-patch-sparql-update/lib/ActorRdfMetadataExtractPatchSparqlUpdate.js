"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfMetadataExtractPatchSparqlUpdate = void 0;
const bus_rdf_metadata_extract_1 = require("@comunica/bus-rdf-metadata-extract");
const core_1 = require("@comunica/core");
/**
 * A comunica Patch SPARQL Update RDF Metadata Extract Actor.
 */
class ActorRdfMetadataExtractPatchSparqlUpdate extends bus_rdf_metadata_extract_1.ActorRdfMetadataExtract {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const metadata = {};
        // The ms-author-via header is added for backwards-compatibility with old Solid servers
        if (action.headers?.get('accept-patch')?.includes('application/sparql-update') ??
            action.headers?.get('ms-author-via')?.includes('SPARQL')) {
            metadata.patchSparqlUpdate = true;
        }
        return { metadata };
    }
}
exports.ActorRdfMetadataExtractPatchSparqlUpdate = ActorRdfMetadataExtractPatchSparqlUpdate;
//# sourceMappingURL=ActorRdfMetadataExtractPatchSparqlUpdate.js.map