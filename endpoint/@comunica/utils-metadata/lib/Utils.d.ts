import type { BindingsStream, IMetadata, MetadataBindings, MetadataQuads } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { AsyncIterator } from 'asynciterator';
/**
 * Return a cached callback to the metadata from the given quad stream as a promise.
 * @param data A quad stream.
 */
export declare function getMetadataQuads(data: AsyncIterator<RDF.Quad>): () => Promise<MetadataQuads>;
/**
 * Return a cached callback to the metadata from the given bindings stream as a promise.
 * @param data A bindings stream.
 */
export declare function getMetadataBindings(data: BindingsStream): () => Promise<MetadataBindings>;
/**
 * Ensure that the given raw metadata object contains all required metadata entries.
 * @param metadataRaw A raw metadata object.
 */
export declare function validateMetadataQuads(metadataRaw: Record<string, any>): MetadataQuads;
/**
 * Ensure that the given raw metadata object contains all required metadata entries.
 * @param metadataRaw A raw metadata object.
 */
export declare function validateMetadataBindings(metadataRaw: Record<string, any>): MetadataBindings;
/**
 * Convert a metadata callback to a lazy callback where the response value is cached.
 * @param {() => Promise<IMetadata>} metadata A metadata callback
 * @return {() => Promise<{[p: string]: any}>} The callback where the response will be cached.
 */
export declare function cachifyMetadata<M extends IMetadata<T>, T extends RDF.Variable | RDF.QuadTermName>(metadata: () => Promise<M>): () => Promise<M>;
