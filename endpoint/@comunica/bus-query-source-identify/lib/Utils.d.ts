import type { BindingsStream, ComunicaDataFactory, MetadataBindings, MetadataQuads, TermsOrder } from '@comunica/types';
import type { BindingsFactory } from '@comunica/utils-bindings-factory';
import type * as RDF from '@rdfjs/types';
import type { AsyncIterator } from 'asynciterator';
import type { QuadTermName } from 'rdf-terms';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * Convert an iterator of quads to an iterator of bindings.
 * @param quads The quads to convert.
 * @param pattern The pattern to get variables from to determine bindings.
 *                All quads are also assumed to match the pattern.
 * @param dataFactory The data factory.
 * @param bindingsFactory The factory for creating bindings.
 * @param unionDefaultGraph If union default graph mode is enabled.
 *                          If true, variable graphs will match all graphs, including the default graph.
 *                          If false, variable graphs will only match named graphs, and not the default graph.
 */
export declare function quadsToBindings(quads: AsyncIterator<RDF.Quad>, pattern: Algebra.Pattern, dataFactory: ComunicaDataFactory, bindingsFactory: BindingsFactory, unionDefaultGraph: boolean): BindingsStream;
/**
 * Check if a term is a variable.
 * @param {RDF.Term} term An RDF term.
 * @return {any} If the term is a variable or blank node.
 */
export declare function isTermVariable(term: RDF.Term): term is RDF.Variable;
/**
 * Get all variables in the given pattern.
 * No duplicates are returned.
 * @param {RDF.BaseQuad} pattern A quad pattern.
 */
export declare function getVariables(pattern: RDF.BaseQuad): RDF.Variable[];
/**
 * A helper function to find a hash with quad elements that have duplicate variables.
 *
 * @param {RDF.Quad} pattern A quad pattern.
 *
 * @return {{[p: string]: string[]}} If no equal variable names are present in the four terms, this returns undefined.
 *                                   Otherwise, this maps quad elements paths (['subject'], ['predicate'], ['object'],
 *                                   ['graph'])
 *                                   to the list of quad elements it shares a variable name with.
 *                                   For quoted triples, paths such as ['subject', 'object'] may occur.
 *                                   If no links for a certain element exist, this element will
 *                                   not be included in the hash.
 *                                   Note 1: Quad elements will never have a link to themselves.
 *                                           So this can never occur: { subject: [[ 'subject']] },
 *                                           instead 'null' would be returned.
 *                                   Note 2: Links only exist in one direction,
 *                                           this means that { subject: [[ 'predicate']], predicate: [[ 'subject' ]] }
 *                                           will not occur, instead only { subject: [[ 'predicate']] }
 *                                           will be returned.
 *                                   Note 3: Keys can also be paths, but they are delimited by '_', such as:
 *                                           { subject_object_subject: [[ 'predicate']] }
 */
export declare function getDuplicateElementLinks(pattern: RDF.BaseQuad): Record<string, QuadTermName[][]> | undefined;
/**
 * Set the metadata of the bindings stream derived from the metadata of the quads stream.
 * @param dataFactory The data factory.
 * @param {BindingsStream} bindings The bindings stream that will receive the metadata property.
 * @param {AsyncIterator<Quad>} quads The quads stream that is guaranteed to emit the metadata property.
 * @param elementVariables Mapping of quad term name to variable name.
 * @param variables Variables to include in the metadata
 * @param forceEstimateCardinality Set the cardinality to estimate
 * @return {() => Promise<{[p: string]: any}>} A lazy promise behind a callback resolving to a metadata object.
 */
export declare function setMetadata(dataFactory: ComunicaDataFactory, bindings: BindingsStream, quads: AsyncIterator<RDF.Quad>, elementVariables: Record<string, string>, variables: RDF.Variable[], forceEstimateCardinality: boolean): void;
/**
 * Convert the metadata of quads to the metadata of bindings.
 * @param dataFactory The data factory.
 * @param metadataQuads Quads metadata.
 * @param elementVariables A mapping from quad elements to variables.
 * @param variables The variables in the bindings.
 */
export declare function quadsMetadataToBindingsMetadata(dataFactory: ComunicaDataFactory, metadataQuads: MetadataQuads, elementVariables: Record<string, string>, variables: RDF.Variable[]): MetadataBindings;
/**
 * Convert the quads order metadata element to a bindings order metadata element.
 * @param dataFactory The data factory.
 * @param quadsOrder Quads order.
 * @param elementVariables A mapping from quad elements to variables.
 */
export declare function quadsOrderToBindingsOrder(dataFactory: ComunicaDataFactory, quadsOrder: TermsOrder<RDF.QuadTermName>, elementVariables: Record<string, string>): TermsOrder<RDF.Variable>;
/**
 * Perform post-match-filtering if the source does not support quoted triple filtering,
 * but we have a variable inside a quoted triple.
 * @param pattern The current quad pattern operation.
 * @param it The iterator to filter.
 */
export declare function filterMatchingQuotedQuads(pattern: RDF.BaseQuad, it: AsyncIterator<RDF.Quad>): AsyncIterator<RDF.Quad>;
