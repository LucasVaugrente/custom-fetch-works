"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfMetadataAccumulateRequestTime = void 0;
const bus_rdf_metadata_accumulate_1 = require("@comunica/bus-rdf-metadata-accumulate");
const core_1 = require("@comunica/core");
/**
 * A comunica RequestTime RDF Metadata Accumulate Actor.
 */
class ActorRdfMetadataAccumulateRequestTime extends bus_rdf_metadata_accumulate_1.ActorRdfMetadataAccumulate {
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
                ...('requestTime' in action.accumulatedMetadata) || ('requestTime' in action.appendingMetadata) ?
                    {
                        requestTime: (action.accumulatedMetadata.requestTime ?? 0) + (action.appendingMetadata.requestTime ?? 0),
                    } :
                    {},
            },
        };
    }
}
exports.ActorRdfMetadataAccumulateRequestTime = ActorRdfMetadataAccumulateRequestTime;
//# sourceMappingURL=ActorRdfMetadataAccumulateRequestTime.js.map