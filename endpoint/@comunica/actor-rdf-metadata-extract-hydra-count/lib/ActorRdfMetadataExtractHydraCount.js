"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfMetadataExtractHydraCount = void 0;
const bus_rdf_metadata_extract_1 = require("@comunica/bus-rdf-metadata-extract");
const core_1 = require("@comunica/core");
/**
 * An RDF Metadata Extract Actor that extracts total items counts from a metadata stream based on the given predicates.
 */
class ActorRdfMetadataExtractHydraCount extends bus_rdf_metadata_extract_1.ActorRdfMetadataExtract {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    run(action) {
        return new Promise((resolve, reject) => {
            // Forward errors
            action.metadata.on('error', reject);
            // Immediately resolve when a value has been found.
            action.metadata.on('data', (quad) => {
                if (this.predicates.includes(quad.predicate.value)) {
                    resolve({
                        metadata: {
                            cardinality: {
                                type: 'estimate',
                                value: Number.parseInt(quad.object.value, 10),
                                dataset: quad.subject.value,
                            },
                        },
                    });
                }
            });
            // If no value has been found, assume infinity.
            action.metadata.on('end', () => {
                resolve({ metadata: { cardinality: { type: 'estimate', value: 0 } } });
            });
        });
    }
}
exports.ActorRdfMetadataExtractHydraCount = ActorRdfMetadataExtractHydraCount;
//# sourceMappingURL=ActorRdfMetadataExtractHydraCount.js.map