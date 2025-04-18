import type * as RDF from '@rdfjs/types';
import { Algebra } from 'sparqlalgebrajs';
import type { IVoidDataset } from './Types';
/**
 * Estimate the cardinality of the provided operation using the specified dataset metadata.
 * This is the primary function that should be called to perform
 */
export declare function getCardinality(dataset: IVoidDataset, operation: Algebra.Operation): RDF.QueryResultCardinality;
/**
 * Estimate triple pattern cardinality, by first applying heuristics based on void:uriPatternRegex
 * and void:vocabulary data when available, before performing estimations using the formulae.
 */
export declare function getPatternCardinality(dataset: IVoidDataset, pattern: Algebra.Pattern): RDF.QueryResultCardinality;
/**
 * Estimate the cardinality of a minus, by taking into account the input cardinalities.
 */
export declare function getMinusCardinality(dataset: IVoidDataset, minus: Algebra.Minus): RDF.QueryResultCardinality;
/**
 * Estimate the cardinality of a slice operation, taking into account the input cardinality and the slice range.
 */
export declare function getSliceCardinality(dataset: IVoidDataset, slice: Algebra.Slice): RDF.QueryResultCardinality;
/**
 * Estimate the cardinality of a from statement, by checking if any of the declared graphs
 * match the current one, and then returning the appropriate estimate.
 */
export declare function getFromCardinality(dataset: IVoidDataset, from: Algebra.From): RDF.QueryResultCardinality;
/**
 * Estimate the cardinality of a statement wrapped under a graph, by also checking if the graph exists.
 */
export declare function getGraphCardinality(dataset: IVoidDataset, graph: Algebra.Graph): RDF.QueryResultCardinality;
/**
 * Estimate the cardinality of a join, using a sum of the individual input cardinalities.
 * This should result in a somewhat acceptable estimate that will likely be above the probable join plan,
 * but still below an unreasonably high and unlikely cartesian estimate.
 */
export declare function getJoinCardinality(dataset: IVoidDataset, operations: Algebra.Operation[]): RDF.QueryResultCardinality;
/**
 * Test whether the given albegra pattern could produce answers from a dataset with the specified resourceUriPattern.
 * Specifically, if both subject and object are IRIs, but neither matches the resourceUriPattern,
 * then the dataset does not contain any RDF resources that would satisfy the pattern.
 */
export declare function matchPatternResourceUris(dataset: IVoidDataset, pattern: Algebra.Pattern): boolean;
/**
 * Test whether the given algebra pattern could produce answers from a dataset with the specified vocabularies.
 * Specifically, if the predicate if an IRI but it does not use any of the specifiec vocabularies,
 * then the pattern cannot be answered by the dataset.
 */
export declare function matchPatternVocabularies(dataset: IVoidDataset, pattern: Algebra.Pattern): boolean;
/**
 * Estimate the triple pattern cardinality using the formulae from Hagedorn, Stefan, et al.
 * "Resource Planning for SPARQL Query Execution on Data Sharing Platforms." COLD 1264 (2014)
 */
export declare function getPatternCardinalityRaw(dataset: IVoidDataset, pattern: Algebra.Pattern): number;
/**
 * Attempts to retrieve void:distinctObjects, falls back to void:entities.
 * Returns the total triple count as fallback upper bound.
 */
export declare function getDistinctObjects(dataset: IVoidDataset): number;
/**
 * Attempts to retrieve void:distinctSubjects, falls back to void:entities.
 * Returns the total triple count as fallback upper bound.
 */
export declare function getDistinctSubjects(dataset: IVoidDataset): number;
/**
 * Attempts to retrieve void:distinctObjects from a void:propertyPartition.
 * Returns 0 when property partitions are available but the specific property is not.
 * Falls back to total triple count as upper bound without any property partitions.
 */
export declare function getPredicateObjects(dataset: IVoidDataset, predicate: RDF.NamedNode): number;
/**
 * Attempts to retrieve void:distinctSubjects from a void:propertyPartition.
 * Returns 0 when property partitions are available but the specific property is not.
 * Falls back to total triple count as upper bound without any property partitions.
 */
export declare function getPredicateSubjects(dataset: IVoidDataset, predicate: RDF.NamedNode): number;
/**
 * Attempts to retrieve void:triples from a void:propertyPartition.
 * Returns 0 when property partitions are available but the specific property is not.
 * Falls back to total triple count as upper bound without any property partitions.
 */
export declare function getPredicateTriples(dataset: IVoidDataset, predicate: RDF.NamedNode): number;
/**
 * Attempts to retrieve void:entities from a void:classPartition.
 * Returns 0 when class partitions are available but the specified class is not.
 * Falls back to estimation using void:entities and void:classes on the dataset,
 * and finally total dataset triple count as upper bound.
 */
export declare function getClassPartitionEntities(dataset: IVoidDataset, object: RDF.NamedNode | RDF.BlankNode): number;
