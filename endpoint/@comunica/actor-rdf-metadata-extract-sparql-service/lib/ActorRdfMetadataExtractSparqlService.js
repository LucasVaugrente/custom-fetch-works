"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfMetadataExtractSparqlService = void 0;
const bus_rdf_metadata_extract_1 = require("@comunica/bus-rdf-metadata-extract");
const core_1 = require("@comunica/core");
const relative_to_absolute_iri_1 = require("relative-to-absolute-iri");
/**
 * Comunica RDF metadata extract actor for SPARQL Service Descriptions.
 */
class ActorRdfMetadataExtractSparqlService extends bus_rdf_metadata_extract_1.ActorRdfMetadataExtract {
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
            // Filter the subject URIs to consider, to avoid picking up unrelated entries
            const acceptSubjectUris = new Set([action.url]);
            const metadata = {};
            const inputFormats = new Set();
            const resultFormats = new Set();
            const supportedLanguages = new Set();
            action.metadata.on('data', (quad) => {
                if (quad.predicate.value === 'http://rdfs.org/ns/void#subset' && quad.object.value === action.url) {
                    // When the requested URI is a subset of another dataset, as indicated by this predicate, then also
                    // consider that other dataset for the extraction of the following predicate values.
                    // This works an issue with Quad Pattern Fragments that has the sd:defaultGraph predicate associated
                    // with a subject value that is neither the data source URI nor the sd:defaultDataset.
                    acceptSubjectUris.add(quad.subject.value);
                }
                else if (quad.subject.value === metadata.defaultDataset ||
                    quad.subject.termType === 'BlankNode' ||
                    acceptSubjectUris.has(quad.subject.value)) {
                    switch (quad.predicate.value) {
                        case 'http://www.w3.org/ns/sparql-service-description#endpoint':
                            // The VoID specification defines this as IRI, but does not specify whether or not it can be a literal.
                            // When the IRI is a literal, it can be relative, and needs to be resolved to absolute value.
                            metadata.sparqlService = quad.object.termType === 'Literal' ?
                                (0, relative_to_absolute_iri_1.resolve)(quad.object.value, action.url) :
                                quad.object.value;
                            // Also fix a common mistake in SPARQL endpoint setups where HTTPS SD's refer to a non-existing HTTP API.
                            if (this.inferHttpsEndpoint && action.url.startsWith('https') && !quad.object.value.startsWith('https')) {
                                metadata.sparqlService = metadata.sparqlService.replace(/^http:/u, 'https:');
                            }
                            break;
                        case 'http://www.w3.org/ns/sparql-service-description#defaultDataset':
                            metadata.defaultDataset = quad.object.value;
                            break;
                        case 'http://www.w3.org/ns/sparql-service-description#defaultGraph':
                            metadata.defaultGraph = quad.object.value;
                            break;
                        case 'http://www.w3.org/ns/sparql-service-description#inputFormat':
                            inputFormats.add(quad.object.value);
                            break;
                        case 'http://www.w3.org/ns/sparql-service-description#resultFormat':
                            resultFormats.add(quad.object.value);
                            break;
                        case 'http://www.w3.org/ns/sparql-service-description#supportedLanguage':
                            supportedLanguages.add(quad.object.value);
                            break;
                        case 'http://www.w3.org/ns/sparql-service-description#feature':
                            if (quad.object.value === 'http://www.w3.org/ns/sparql-service-description#UnionDefaultGraph') {
                                metadata.unionDefaultGraph = true;
                            }
                            else if (quad.object.value === 'http://www.w3.org/ns/sparql-service-description#BasicFederatedQuery') {
                                metadata.basicFederatedQuery = true;
                            }
                            break;
                    }
                }
            });
            // Only return the metadata if an endpoint IRI was discovered
            action.metadata.on('end', () => {
                resolve({ metadata: {
                        ...metadata,
                        ...inputFormats.size > 0 ? { inputFormats: [...inputFormats.values()] } : {},
                        ...resultFormats.size > 0 ? { resultFormats: [...resultFormats.values()] } : {},
                        ...supportedLanguages.size > 0 ? { supportedLanguages: [...supportedLanguages.values()] } : {},
                    } });
            });
        });
    }
}
exports.ActorRdfMetadataExtractSparqlService = ActorRdfMetadataExtractSparqlService;
//# sourceMappingURL=ActorRdfMetadataExtractSparqlService.js.map