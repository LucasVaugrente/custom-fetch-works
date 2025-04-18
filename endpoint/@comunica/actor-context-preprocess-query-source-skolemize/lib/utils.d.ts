import type { BindingsStream, ComunicaDataFactory, IQuerySource, QuerySourceReference } from '@comunica/types';
import { BlankNodeScoped } from '@comunica/utils-data-factory';
import type * as RDF from '@rdfjs/types';
import type { AsyncIterator } from 'asynciterator';
import { Algebra } from 'sparqlalgebrajs';
export declare const SKOLEM_PREFIX = "urn:comunica_skolem:source_";
/**
 * Get the unique, deterministic id for the given source.
 * @param sourceIds ID's of datasources, see KeysRdfResolveQuadPattern.sourceIds.
 * @param source A data source.
 * @return The id of the given source.
 */
export declare function getSourceId(sourceIds: Map<QuerySourceReference, string>, source: IQuerySource): string;
/**
 * If the given term is a blank node, return a deterministic named node for it
 * based on the source id and the blank node value.
 * @param dataFactory The data factory.
 * @param term Any RDF term.
 * @param sourceId A source identifier.
 * @return If the given term was a blank node, this will return a skolemized named node, otherwise the original term.
 */
export declare function skolemizeTerm(dataFactory: ComunicaDataFactory, term: RDF.Term, sourceId: string): RDF.Term | BlankNodeScoped;
/**
 * Skolemize all terms in the given quad.
 * @param dataFactory The data factory.
 * @param quad An RDF quad.
 * @param sourceId A source identifier.
 * @return The skolemized quad.
 */
export declare function skolemizeQuad<Q extends RDF.BaseQuad = RDF.Quad>(dataFactory: ComunicaDataFactory, quad: Q, sourceId: string): Q;
/**
 * Skolemize all terms in the given bindings.
 * @param dataFactory The data factory.
 * @param bindings An RDF bindings object.
 * @param sourceId A source identifier.
 * @return The skolemized bindings.
 */
export declare function skolemizeBindings(dataFactory: ComunicaDataFactory, bindings: RDF.Bindings, sourceId: string): RDF.Bindings;
/**
 * Skolemize all terms in the given quad stream.
 * @param dataFactory The data factory.
 * @param iterator An RDF quad stream.
 * @param sourceId A source identifier.
 * @return The skolemized quad stream.
 */
export declare function skolemizeQuadStream(dataFactory: ComunicaDataFactory, iterator: AsyncIterator<RDF.Quad>, sourceId: string): AsyncIterator<RDF.Quad>;
/**
 * Skolemize all terms in the given bindings stream.
 * @param dataFactory The data factory.
 * @param iterator An RDF bindings stream.
 * @param sourceId A source identifier.
 * @return The skolemized bindings stream.
 */
export declare function skolemizeBindingsStream(dataFactory: ComunicaDataFactory, iterator: BindingsStream, sourceId: string): BindingsStream;
/**
 * If a given term was a skolemized named node for the given source id,
 * deskolemize it again to a blank node.
 * If the given term was a skolemized named node for another source, return false.
 * If the given term was not a skolemized named node, return the original term.
 * @param dataFactory The data factory.
 * @param term Any RDF term.
 * @param sourceId A source identifier.
 */
export declare function deskolemizeTerm(dataFactory: ComunicaDataFactory, term: RDF.Term, sourceId: string): RDF.Term | null;
export declare function deskolemizeTermNestedThrowing(dataFactory: ComunicaDataFactory, term: RDF.Term, sourceId: string): RDF.Term;
/**
 * Deskolemize all terms in the given quad.
 * @param dataFactory The data factory.
 * @param quad An RDF quad.
 * @param sourceId A source identifier.
 * @return The deskolemized quad.
 */
export declare function deskolemizeQuad<Q extends RDF.BaseQuad = RDF.Quad>(dataFactory: ComunicaDataFactory, quad: Q, sourceId: string): Q;
/**
 * Deskolemize all terms in the given quad.
 * Will return undefined if there is at least one blank node not in scope for this sourceId.
 * @param dataFactory The data factory.
 * @param operation An algebra operation.
 * @param sourceId A source identifier.
 */
export declare function deskolemizeOperation<O extends Algebra.Operation>(dataFactory: ComunicaDataFactory, operation: O, sourceId: string): O | undefined;
