import type { MetadataVariable } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { IBindingsIndex } from './IBindingsIndex';
/**
 * A simple efficient hash-based index for maintaining bindings,
 * and checking whether or not a bindings is contained in this index.
 *
 * This can not handle bindings with undefined values.
 */
export declare class BindingsIndexDef<V> implements IBindingsIndex<V> {
    private readonly keys;
    private readonly hashFn;
    private readonly index;
    constructor(keys: MetadataVariable[], hashFn: (term: RDF.Bindings, keys: RDF.Variable[]) => string);
    put(bindings: RDF.Bindings, value: V): V;
    get(bindings: RDF.Bindings): V[];
    getFirst(bindings: RDF.Bindings): V | undefined;
    values(): V[];
}
