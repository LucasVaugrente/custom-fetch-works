import type { Bindings, MetadataVariable } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { IBindingsIndex } from './IBindingsIndex';
/**
 * A simple efficient tree-based index for maintaining bindings,
 * and checking whether or not a bindings is contained in this index.
 *
 * This will consider bindings with a variable term or an undefined term
 * as a 'match-all' with other terms.
 */
export declare class BindingsIndexUndef<V> implements IBindingsIndex<V> {
    private readonly keys;
    private readonly data;
    private readonly hashFn;
    private readonly allowDisjointDomains;
    constructor(keys: MetadataVariable[], hashFn: (term: RDF.Term | undefined) => string, allowDisjointDomains: boolean);
    /**
     * Add the given bindings to the index.
     * @param {Bindings} bindings A bindings.
     * @param {V} value The value to put.
     */
    put(bindings: Bindings, value: V): V;
    protected isBindingsValid(bindings: Bindings): boolean;
    /**
     * Get the value of the given bindings is contained in this index.
     * @param {Bindings} bindings A bindings.
     * @return {V[]} The values.
     */
    get(bindings: Bindings): V[];
    protected getRecursive(bindings: Bindings | undefined, keys: RDF.Variable[], dataIndexes: IDataIndex<V>[]): V[];
    /**
     * Get the first value of the given bindings is contained in this index.
     * @param {Bindings} bindings A bindings.
     * @param matchUndefsAsWildcard If undefs in the given bindings should match with any existing values.
     *                              Otherwise, undefs will only match values that were inserted as undefs.
     * @return {V | undefined} The value.
     */
    getFirst(bindings: Bindings, matchUndefsAsWildcard?: boolean): V | undefined;
    protected getRecursiveFirst(bindings: Bindings, keys: RDF.Variable[], dataIndexes: IDataIndex<V>[], matchUndefsAsWildcard: boolean): V | undefined;
    values(): V[];
}
export interface IDataIndex<V> {
    [key: string]: IDataIndex<V> | V;
}
