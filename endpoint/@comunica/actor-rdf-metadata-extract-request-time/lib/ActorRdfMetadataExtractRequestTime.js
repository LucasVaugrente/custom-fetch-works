"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfMetadataExtractRequestTime = void 0;
const bus_rdf_metadata_extract_1 = require("@comunica/bus-rdf-metadata-extract");
const core_1 = require("@comunica/core");
/**
 * A comunica Request Time RDF Metadata Extract Actor.
 */
class ActorRdfMetadataExtractRequestTime extends bus_rdf_metadata_extract_1.ActorRdfMetadataExtract {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        return { metadata: { requestTime: action.requestTime } };
    }
}
exports.ActorRdfMetadataExtractRequestTime = ActorRdfMetadataExtractRequestTime;
//# sourceMappingURL=ActorRdfMetadataExtractRequestTime.js.map