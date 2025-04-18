"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfMetadataExtractPutAccepted = void 0;
const bus_rdf_metadata_extract_1 = require("@comunica/bus-rdf-metadata-extract");
const core_1 = require("@comunica/core");
/**
 * A comunica PUT Accepted RDF Metadata Extract Actor.
 */
class ActorRdfMetadataExtractPutAccepted extends bus_rdf_metadata_extract_1.ActorRdfMetadataExtract {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const metadata = {};
        if (action.headers?.get('accept-put')) {
            metadata.putAccepted = action.headers.get('accept-put')?.split(/, */u);
        }
        return { metadata };
    }
}
exports.ActorRdfMetadataExtractPutAccepted = ActorRdfMetadataExtractPutAccepted;
//# sourceMappingURL=ActorRdfMetadataExtractPutAccepted.js.map