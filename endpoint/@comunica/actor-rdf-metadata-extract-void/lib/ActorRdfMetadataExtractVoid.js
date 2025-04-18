"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfMetadataExtractVoid = void 0;
const bus_rdf_metadata_extract_1 = require("@comunica/bus-rdf-metadata-extract");
const core_1 = require("@comunica/core");
const Definitions_1 = require("./Definitions");
const Estimators_1 = require("./Estimators");
/**
 * A comunica Void RDF Metadata Extract Actor.
 */
class ActorRdfMetadataExtractVoid extends bus_rdf_metadata_extract_1.ActorRdfMetadataExtract {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        return new Promise((resolve, reject) => {
            // Track the URIs of identified datasets to extract
            const datasetUris = new Set();
            // Track the other stats per-URI to allow arbitrary triple ordering in the stream
            const triples = {};
            const entities = {};
            const vocabularies = {};
            const classes = {};
            const distinctObjects = {};
            const distinctSubjects = {};
            const uriRegexPatterns = {};
            const propertyPartitions = {};
            const propertyPartitionProperties = {};
            const classPartitions = {};
            const classPartitionClasses = {};
            // Default dataset and graph to remove in case of sd:UnionDefaultGraph
            let defaultDatasetUri;
            let defaultGraphUri;
            let unionDefaultGraph = false;
            action.metadata
                .on('error', reject)
                .on('data', (quad) => {
                switch (quad.predicate.value) {
                    case Definitions_1.RDF_TYPE:
                        if (quad.object.value === Definitions_1.SD_GRAPH || quad.object.value === Definitions_1.VOID_DATASET) {
                            datasetUris.add(quad.subject.value);
                        }
                        break;
                    case Definitions_1.VOID_TRIPLES:
                        triples[quad.subject.value] = Number.parseInt(quad.object.value, 10);
                        break;
                    case Definitions_1.VOID_ENTITIES:
                        entities[quad.subject.value] = Number.parseInt(quad.object.value, 10);
                        break;
                    case Definitions_1.VOID_CLASSES:
                        classes[quad.subject.value] = Number.parseInt(quad.object.value, 10);
                        break;
                    case Definitions_1.VOID_CLASS:
                        classPartitionClasses[quad.subject.value] = quad.object.value;
                        break;
                    case Definitions_1.VOID_PROPERTY:
                        propertyPartitionProperties[quad.subject.value] = quad.object.value;
                        break;
                    case Definitions_1.VOID_DISTINCT_OBJECTS:
                        distinctObjects[quad.subject.value] = Number.parseInt(quad.object.value, 10);
                        break;
                    case Definitions_1.VOID_DISTINCT_SUBJECTS:
                        distinctSubjects[quad.subject.value] = Number.parseInt(quad.object.value, 10);
                        break;
                    case Definitions_1.VOID_VOCABULARY:
                        if (vocabularies[quad.subject.value]) {
                            vocabularies[quad.subject.value].push(quad.object.value);
                        }
                        else {
                            vocabularies[quad.subject.value] = [quad.object.value];
                        }
                        break;
                    case Definitions_1.VOID_URI_SPACE:
                        if (!uriRegexPatterns[quad.subject.value]) {
                            uriRegexPatterns[quad.subject.value] = new RegExp(`^${quad.object.value}`, 'u');
                        }
                        break;
                    case Definitions_1.VOID_URI_REGEX_PATTERN:
                        uriRegexPatterns[quad.subject.value] = new RegExp(quad.object.value, 'u');
                        break;
                    case Definitions_1.VOID_PROPERTY_PARTITION:
                        if (propertyPartitions[quad.subject.value]) {
                            propertyPartitions[quad.subject.value].push(quad.object.value);
                        }
                        else {
                            propertyPartitions[quad.subject.value] = [quad.object.value];
                        }
                        break;
                    case Definitions_1.VOID_CLASS_PARTITION:
                        if (classPartitions[quad.subject.value]) {
                            classPartitions[quad.subject.value].push(quad.object.value);
                        }
                        else {
                            classPartitions[quad.subject.value] = [quad.object.value];
                        }
                        break;
                    case Definitions_1.SD_DEFAULT_DATASET:
                        defaultDatasetUri = quad.object.value;
                        break;
                    case Definitions_1.SD_DEFAULT_GRAPH:
                        defaultGraphUri = quad.object.value;
                        break;
                    case Definitions_1.SD_FEATURE:
                        if (quad.object.value === Definitions_1.SD_UNION_DEFAULT_GRAPH) {
                            unionDefaultGraph = true;
                        }
                        break;
                }
            })
                .on('end', () => {
                const datasets = [];
                // Helper function to extract property partitions into a map
                const getPropertyPartitions = (uri) => {
                    const partitions = {};
                    for (const partitionUri of propertyPartitions[uri]) {
                        const propertyUri = propertyPartitionProperties[partitionUri];
                        if (propertyUri) {
                            partitions[propertyUri] = {
                                distinctObjects: distinctObjects[partitionUri],
                                distinctSubjects: distinctSubjects[partitionUri],
                                triples: triples[partitionUri],
                            };
                        }
                    }
                    return partitions;
                };
                // Helper function to extract class partitions into a map
                const getClassPartitions = (uri) => {
                    const partitions = {};
                    for (const partitionUri of classPartitions[uri]) {
                        const classUri = classPartitionClasses[partitionUri];
                        if (classUri) {
                            partitions[classUri] = {
                                entities: entities[partitionUri],
                                propertyPartitions: propertyPartitions[partitionUri] ?
                                    getPropertyPartitions(partitionUri) :
                                    undefined,
                            };
                        }
                    }
                    return partitions;
                };
                if (defaultDatasetUri) {
                    if (defaultGraphUri && vocabularies[defaultDatasetUri] && !vocabularies[defaultGraphUri]) {
                        vocabularies[defaultGraphUri] = vocabularies[defaultDatasetUri];
                    }
                    datasetUris.delete(defaultDatasetUri);
                }
                if (unionDefaultGraph && defaultGraphUri) {
                    datasetUris.delete(defaultGraphUri);
                }
                for (const uri of datasetUris) {
                    // Only the VoID descriptions with triple counts and class or property partitions are actually useful,
                    // and any other ones would contain insufficient information to use in estimation, as the formulae
                    // would go to 0 for most estimations.
                    if (triples[uri]) {
                        const dataset = {
                            entities: entities[uri],
                            identifier: uri,
                            classes: classes[uri] ?? classPartitions[uri]?.length ?? 0,
                            classPartitions: classPartitions[uri] ? getClassPartitions(uri) : undefined,
                            distinctObjects: distinctObjects[uri],
                            distinctSubjects: distinctSubjects[uri],
                            propertyPartitions: propertyPartitions[uri] ? getPropertyPartitions(uri) : undefined,
                            triples: triples[uri],
                            uriRegexPattern: uriRegexPatterns[uri],
                            vocabularies: vocabularies[uri],
                        };
                        datasets.push({
                            getCardinality: async (operation) => ({
                                ...(0, Estimators_1.getCardinality)(dataset, operation),
                                dataset: action.url,
                            }),
                            source: action.url,
                            uri,
                        });
                    }
                }
                resolve({ metadata: datasets.length > 0 ? { datasets } : {} });
            });
        });
    }
}
exports.ActorRdfMetadataExtractVoid = ActorRdfMetadataExtractVoid;
//# sourceMappingURL=ActorRdfMetadataExtractVoid.js.map