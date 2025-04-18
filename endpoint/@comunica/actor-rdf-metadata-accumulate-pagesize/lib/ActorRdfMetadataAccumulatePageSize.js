"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfMetadataAccumulatePageSize = void 0;
const bus_rdf_metadata_accumulate_1 = require("@comunica/bus-rdf-metadata-accumulate");
const core_1 = require("@comunica/core");
/**
 * A comunica PageSize RDF Metadata Accumulate Actor.
 */
class ActorRdfMetadataAccumulatePageSize extends bus_rdf_metadata_accumulate_1.ActorRdfMetadataAccumulate {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        // Return nothing on initialize
        if (action.mode === 'initialize') {
            return { metadata: {} };
        }
        // Otherwise, attempt to increment existing value
        return {
            metadata: {
                ...('pageSize' in action.accumulatedMetadata) || ('pageSize' in action.appendingMetadata) ?
                    {
                        pageSize: (action.accumulatedMetadata.pageSize ?? 0) + (action.appendingMetadata.pageSize ?? 0),
                    } :
                    {},
            },
        };
    }
}
exports.ActorRdfMetadataAccumulatePageSize = ActorRdfMetadataAccumulatePageSize;
//# sourceMappingURL=ActorRdfMetadataAccumulatePageSize.js.map