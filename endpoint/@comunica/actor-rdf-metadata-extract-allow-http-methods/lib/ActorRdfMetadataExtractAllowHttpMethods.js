"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfMetadataExtractAllowHttpMethods = void 0;
const bus_rdf_metadata_extract_1 = require("@comunica/bus-rdf-metadata-extract");
const core_1 = require("@comunica/core");
/**
 * A comunica Allow HTTP Methods RDF Metadata Extract Actor.
 */
class ActorRdfMetadataExtractAllowHttpMethods extends bus_rdf_metadata_extract_1.ActorRdfMetadataExtract {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const metadata = {};
        if (action.headers?.get('allow')) {
            metadata.allowHttpMethods = action.headers.get('allow')?.split(/, */u);
        }
        return { metadata };
    }
}
exports.ActorRdfMetadataExtractAllowHttpMethods = ActorRdfMetadataExtractAllowHttpMethods;
//# sourceMappingURL=ActorRdfMetadataExtractAllowHttpMethods.js.map