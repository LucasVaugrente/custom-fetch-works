"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassPartitionEntities = exports.getPredicateTriples = exports.getPredicateSubjects = exports.getPredicateObjects = exports.getDistinctSubjects = exports.getDistinctObjects = exports.getPatternCardinalityRaw = exports.matchPatternVocabularies = exports.matchPatternResourceUris = exports.getJoinCardinality = exports.getGraphCardinality = exports.getFromCardinality = exports.getSliceCardinality = exports.getMinusCardinality = exports.getPatternCardinality = exports.getCardinality = void 0;
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
const Definitions_1 = require("./Definitions");
/**
 * Estimate the cardinality of the provided operation using the specified dataset metadata.
 * This is the primary function that should be called to perform
 */
function getCardinality(dataset, operation) {
    switch (operation.type) {
        case sparqlalgebrajs_1.Algebra.types.PROJECT:
        case sparqlalgebrajs_1.Algebra.types.FILTER:
        case sparqlalgebrajs_1.Algebra.types.ORDER_BY:
        case sparqlalgebrajs_1.Algebra.types.GROUP:
        case sparqlalgebrajs_1.Algebra.types.CONSTRUCT:
            return getCardinality(dataset, operation.input);
        case sparqlalgebrajs_1.Algebra.types.PATTERN:
            return getPatternCardinality(dataset, operation);
        case sparqlalgebrajs_1.Algebra.types.BGP:
            return getJoinCardinality(dataset, operation.patterns);
        case sparqlalgebrajs_1.Algebra.types.JOIN:
            return getJoinCardinality(dataset, operation.input);
        case sparqlalgebrajs_1.Algebra.types.GRAPH:
            return getGraphCardinality(dataset, operation);
        case sparqlalgebrajs_1.Algebra.types.FROM:
            return getFromCardinality(dataset, operation);
        case sparqlalgebrajs_1.Algebra.types.SLICE:
            return getSliceCardinality(dataset, operation);
        case sparqlalgebrajs_1.Algebra.types.MINUS:
            return getMinusCardinality(dataset, operation);
        case sparqlalgebrajs_1.Algebra.types.VALUES:
            return { type: 'exact', value: operation.bindings.length };
        default:
            return { type: 'estimate', value: Number.POSITIVE_INFINITY };
    }
}
exports.getCardinality = getCardinality;
/**
 * Estimate triple pattern cardinality, by first applying heuristics based on void:uriPatternRegex
 * and void:vocabulary data when available, before performing estimations using the formulae.
 */
function getPatternCardinality(dataset, pattern) {
    const estimate = { type: 'exact', value: 0 };
    if (matchPatternVocabularies(dataset, pattern) && matchPatternResourceUris(dataset, pattern)) {
        const value = getPatternCardinalityRaw(dataset, pattern);
        if (value > 0) {
            estimate.value = value;
            estimate.type = 'estimate';
        }
    }
    return estimate;
}
exports.getPatternCardinality = getPatternCardinality;
/**
 * Estimate the cardinality of a minus, by taking into account the input cardinalities.
 */
function getMinusCardinality(dataset, minus) {
    const estimateFirst = getCardinality(dataset, minus.input[0]);
    const estimateSecond = getCardinality(dataset, minus.input[1]);
    return { type: 'estimate', value: Math.max(estimateFirst.value - estimateSecond.value, 0) };
}
exports.getMinusCardinality = getMinusCardinality;
/**
 * Estimate the cardinality of a slice operation, taking into account the input cardinality and the slice range.
 */
function getSliceCardinality(dataset, slice) {
    const estimate = getCardinality(dataset, slice.input);
    if (estimate.value > 0) {
        estimate.value = Math.max(estimate.value - slice.start, 0);
        if (slice.length !== undefined) {
            estimate.value = Math.min(estimate.value, slice.length);
        }
    }
    return estimate;
}
exports.getSliceCardinality = getSliceCardinality;
/**
 * Estimate the cardinality of a from statement, by checking if any of the declared graphs
 * match the current one, and then returning the appropriate estimate.
 */
function getFromCardinality(dataset, from) {
    if (from.default.some(nn => nn.value === dataset.identifier) ||
        from.named.some(nn => nn.value === dataset.identifier)) {
        return getCardinality(dataset, from.input);
    }
    return { type: 'exact', value: 0 };
}
exports.getFromCardinality = getFromCardinality;
/**
 * Estimate the cardinality of a statement wrapped under a graph, by also checking if the graph exists.
 */
function getGraphCardinality(dataset, graph) {
    if (graph.name.termType === 'Variable' || graph.name.value === dataset.identifier) {
        return getCardinality(dataset, graph.input);
    }
    return { type: 'exact', value: 0 };
}
exports.getGraphCardinality = getGraphCardinality;
/**
 * Estimate the cardinality of a join, using a sum of the individual input cardinalities.
 * This should result in a somewhat acceptable estimate that will likely be above the probable join plan,
 * but still below an unreasonably high and unlikely cartesian estimate.
 */
function getJoinCardinality(dataset, operations) {
    const estimate = { type: 'exact', value: 0 };
    for (const input of operations) {
        const cardinality = getCardinality(dataset, input);
        if (cardinality.value > 0) {
            estimate.type = 'estimate';
            estimate.value += cardinality.value;
        }
    }
    return estimate;
}
exports.getJoinCardinality = getJoinCardinality;
/**
 * Test whether the given albegra pattern could produce answers from a dataset with the specified resourceUriPattern.
 * Specifically, if both subject and object are IRIs, but neither matches the resourceUriPattern,
 * then the dataset does not contain any RDF resources that would satisfy the pattern.
 */
function matchPatternResourceUris(dataset, pattern) {
    return (!dataset.uriRegexPattern ||
        (pattern.subject.termType !== 'NamedNode' || dataset.uriRegexPattern.test(pattern.subject.value)) ||
        (pattern.object.termType !== 'NamedNode' || dataset.uriRegexPattern.test(pattern.object.value)));
}
exports.matchPatternResourceUris = matchPatternResourceUris;
/**
 * Test whether the given algebra pattern could produce answers from a dataset with the specified vocabularies.
 * Specifically, if the predicate if an IRI but it does not use any of the specifiec vocabularies,
 * then the pattern cannot be answered by the dataset.
 */
function matchPatternVocabularies(dataset, pattern) {
    if (dataset.vocabularies !== undefined && pattern.predicate.termType === 'NamedNode') {
        return dataset.vocabularies.some(vc => pattern.predicate.value.startsWith(vc));
    }
    return true;
}
exports.matchPatternVocabularies = matchPatternVocabularies;
/**
 * Estimate the triple pattern cardinality using the formulae from Hagedorn, Stefan, et al.
 * "Resource Planning for SPARQL Query Execution on Data Sharing Platforms." COLD 1264 (2014)
 */
function getPatternCardinalityRaw(dataset, pattern) {
    // ?s rdf:type <o> (from the original paper)
    // ?s rdf:type _:o (also accounted for)
    if (pattern.subject.termType === 'Variable' &&
        pattern.predicate.termType === 'NamedNode' &&
        pattern.predicate.value === Definitions_1.RDF_TYPE &&
        (pattern.object.termType === 'NamedNode' || pattern.object.termType === 'BlankNode')) {
        return getClassPartitionEntities(dataset, pattern.object);
    }
    // ?s ?p ?o (from the original paper)
    if (pattern.subject.termType === 'Variable' &&
        pattern.predicate.termType === 'Variable' &&
        pattern.object.termType === 'Variable') {
        return dataset.triples;
    }
    // <s> ?p ?o (from the original paper)
    // _:s ?p ?o (also accounted for)
    // <s> ?p "o"
    // _:s ?p "o"
    if ((pattern.subject.termType === 'NamedNode' || pattern.subject.termType === 'BlankNode') &&
        pattern.predicate.termType === 'Variable' &&
        (pattern.object.termType === 'Variable' || pattern.object.termType === 'Literal')) {
        const distinctSubjects = getDistinctSubjects(dataset);
        if (distinctSubjects > 0) {
            return dataset.triples / distinctSubjects;
        }
    }
    // ?s <p> ?o (from the original paper)
    // ?s <p> "o" (also accounted for)
    if (pattern.subject.termType === 'Variable' &&
        pattern.predicate.termType === 'NamedNode' &&
        (pattern.object.termType === 'Variable' || pattern.object.termType === 'Literal')) {
        return getPredicateTriples(dataset, pattern.predicate);
    }
    // ?s ?p <o> (from the original paper)
    // ?s ?p _:o (also accounted for)
    // ?s ?p "o"
    if (pattern.subject.termType === 'Variable' &&
        pattern.predicate.termType === 'Variable' &&
        (pattern.object.termType === 'NamedNode' ||
            pattern.object.termType === 'BlankNode' ||
            pattern.object.termType === 'Literal')) {
        const distinctObjects = getDistinctObjects(dataset);
        if (distinctObjects > 0) {
            return dataset.triples / distinctObjects;
        }
    }
    // <s> <p> ?o (from the original paper)
    // _:s <p> ?o (also accounted for)
    // <s> <p> "o"
    // _:s <p> "o"
    if ((pattern.subject.termType === 'NamedNode' || pattern.subject.termType === 'BlankNode') &&
        pattern.predicate.termType === 'NamedNode' &&
        (pattern.object.termType === 'Variable' || pattern.object.termType === 'Literal')) {
        const predicateTriples = getPredicateTriples(dataset, pattern.predicate);
        const predicateSubjects = getPredicateSubjects(dataset, pattern.predicate);
        return predicateSubjects > 0 ? predicateTriples / predicateSubjects : predicateTriples;
    }
    // <s> ?p <o> (from the original paper)
    // _:s ?p _:o (also accounted for)
    // _:s ?p <o>
    // <s> ?p _:o
    if ((pattern.subject.termType === 'NamedNode' || pattern.subject.termType === 'BlankNode') &&
        pattern.predicate.termType === 'Variable' &&
        (pattern.object.termType === 'NamedNode' || pattern.object.termType === 'BlankNode')) {
        const distinctSubjects = getDistinctSubjects(dataset);
        const distinctObjects = getDistinctObjects(dataset);
        if (distinctSubjects > 0 && distinctObjects > 0) {
            return dataset.triples / (distinctSubjects * distinctObjects);
        }
    }
    // ?s <p> <o> (from the original paper)
    // ?s <p> _:o (also accounted for)
    if (pattern.subject.termType === 'Variable' &&
        pattern.predicate.termType === 'NamedNode' &&
        (pattern.object.termType === 'NamedNode' || pattern.object.termType === 'BlankNode')) {
        const predicateTriples = getPredicateTriples(dataset, pattern.predicate);
        const predicateObjects = getPredicateObjects(dataset, pattern.predicate);
        return predicateObjects > 0 ? predicateTriples / predicateObjects : predicateTriples;
    }
    // <s> <p> <o> (from the original paper)
    // _:s <p> _:o (also accounted for)
    // <s> <p> _:o
    // _:s <p> <o>
    if ((pattern.subject.termType === 'NamedNode' || pattern.subject.termType === 'BlankNode') &&
        pattern.predicate.termType === 'NamedNode' &&
        (pattern.object.termType === 'NamedNode' || pattern.object.termType === 'BlankNode')) {
        const predicateTriples = getPredicateTriples(dataset, pattern.predicate);
        const predicateSubjects = getPredicateSubjects(dataset, pattern.predicate);
        const predicateObjects = getPredicateObjects(dataset, pattern.predicate);
        return predicateSubjects > 0 && predicateObjects > 0 ?
            predicateTriples / (predicateSubjects * predicateObjects) :
            predicateTriples;
    }
    // In all other cases, return the total triple count as absolute upper bound
    return dataset.triples;
}
exports.getPatternCardinalityRaw = getPatternCardinalityRaw;
/**
 * Attempts to retrieve void:distinctObjects, falls back to void:entities.
 * Returns the total triple count as fallback upper bound.
 */
function getDistinctObjects(dataset) {
    return dataset.distinctObjects ?? dataset.entities ?? dataset.triples;
}
exports.getDistinctObjects = getDistinctObjects;
/**
 * Attempts to retrieve void:distinctSubjects, falls back to void:entities.
 * Returns the total triple count as fallback upper bound.
 */
function getDistinctSubjects(dataset) {
    return dataset.distinctSubjects ?? dataset.entities ?? dataset.triples;
}
exports.getDistinctSubjects = getDistinctSubjects;
/**
 * Attempts to retrieve void:distinctObjects from a void:propertyPartition.
 * Returns 0 when property partitions are available but the specific property is not.
 * Falls back to total triple count as upper bound without any property partitions.
 */
function getPredicateObjects(dataset, predicate) {
    if (dataset.propertyPartitions) {
        const partition = dataset.propertyPartitions[predicate.value];
        return partition?.distinctObjects ?? partition?.triples ?? 0;
    }
    return dataset.triples;
}
exports.getPredicateObjects = getPredicateObjects;
/**
 * Attempts to retrieve void:distinctSubjects from a void:propertyPartition.
 * Returns 0 when property partitions are available but the specific property is not.
 * Falls back to total triple count as upper bound without any property partitions.
 */
function getPredicateSubjects(dataset, predicate) {
    if (dataset.propertyPartitions) {
        const partition = dataset.propertyPartitions[predicate.value];
        return partition?.distinctSubjects ?? partition?.triples ?? 0;
    }
    return dataset.triples;
}
exports.getPredicateSubjects = getPredicateSubjects;
/**
 * Attempts to retrieve void:triples from a void:propertyPartition.
 * Returns 0 when property partitions are available but the specific property is not.
 * Falls back to total triple count as upper bound without any property partitions.
 */
function getPredicateTriples(dataset, predicate) {
    if (dataset.propertyPartitions) {
        return dataset.propertyPartitions[predicate.value]?.triples ?? 0;
    }
    return dataset.triples;
}
exports.getPredicateTriples = getPredicateTriples;
/**
 * Attempts to retrieve void:entities from a void:classPartition.
 * Returns 0 when class partitions are available but the specified class is not.
 * Falls back to estimation using void:entities and void:classes on the dataset,
 * and finally total dataset triple count as upper bound.
 */
function getClassPartitionEntities(dataset, object) {
    if (dataset.classPartitions) {
        return dataset.classPartitions[object.value]?.entities ?? 0;
    }
    if (dataset.entities !== undefined && dataset.classes) {
        return dataset.entities / dataset.classes;
    }
    return dataset.triples;
}
exports.getClassPartitionEntities = getClassPartitionEntities;
//# sourceMappingURL=Estimators.js.map