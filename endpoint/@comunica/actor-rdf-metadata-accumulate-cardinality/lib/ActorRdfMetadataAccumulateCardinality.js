"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfMetadataAccumulateCardinality = void 0;
const bus_rdf_metadata_accumulate_1 = require("@comunica/bus-rdf-metadata-accumulate");
const core_1 = require("@comunica/core");
/**
 * A comunica Cardinality RDF Metadata Accumulate Actor.
 */
class ActorRdfMetadataAccumulateCardinality extends bus_rdf_metadata_accumulate_1.ActorRdfMetadataAccumulate {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        // Return default value on initialize
        if (action.mode === 'initialize') {
            return { metadata: { cardinality: { type: 'exact', value: 0 } } };
        }
        // Otherwise, attempt to update existing value
        const cardinality = { ...action.accumulatedMetadata.cardinality };
        if (cardinality.dataset) {
            // If the accumulated cardinality refers to that of the full default graph (applicable for SPARQL endpoints)
            if (action.accumulatedMetadata.defaultGraph === cardinality.dataset &&
                cardinality.dataset !== action.appendingMetadata.cardinality.dataset) {
                // Use the cardinality of the appending metadata.
                return { metadata: { cardinality: action.appendingMetadata.cardinality } };
            }
            if (action.appendingMetadata.cardinality.dataset) {
                // If the accumulated cardinality is dataset-wide
                if (cardinality.dataset !== action.appendingMetadata.cardinality.dataset &&
                    action.appendingMetadata.subsetOf === cardinality.dataset) {
                    // If the appending cardinality refers to the subset of a dataset,
                    // use the cardinality of the subset.
                    return { metadata: { cardinality: action.appendingMetadata.cardinality } };
                }
                if (cardinality.dataset === action.appendingMetadata.cardinality.dataset) {
                    // If the appending cardinality is for the same dataset,
                    // keep the accumulated cardinality unchanged.
                    return { metadata: { cardinality } };
                }
                // If the appending cardinality refers to another dataset,
                // remove the dataset scopes.
                delete cardinality.dataset;
            }
            else {
                // If the appending cardinality refers to a dataset subset,
                // keep the accumulated cardinality unchanged.
                return { metadata: { cardinality } };
            }
        }
        if (!action.appendingMetadata.cardinality || !Number.isFinite(action.appendingMetadata.cardinality.value)) {
            // We're already at infinite, so ignore any later metadata
            cardinality.type = 'estimate';
            cardinality.value = Number.POSITIVE_INFINITY;
        }
        else {
            if (action.appendingMetadata.cardinality.type === 'estimate') {
                cardinality.type = 'estimate';
            }
            cardinality.value += action.appendingMetadata.cardinality.value;
        }
        return { metadata: { cardinality } };
    }
}
exports.ActorRdfMetadataAccumulateCardinality = ActorRdfMetadataAccumulateCardinality;
//# sourceMappingURL=ActorRdfMetadataAccumulateCardinality.js.map