import type { IBindingsContextMergeHandler } from '@comunica/bus-merge-bindings-context';
import type { ComunicaDataFactory, IActionContext, IActionContextKey } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import { Map } from 'immutable';
/**
 * An immutable.js-based Bindings object.
 */
export declare class Bindings implements RDF.Bindings {
    readonly type = "bindings";
    private readonly dataFactory;
    private readonly entries;
    private readonly contextHolder;
    constructor(dataFactory: ComunicaDataFactory, entries: Map<string, RDF.Term>, contextHolder?: IContextHolder);
    has(key: RDF.Variable | string): boolean;
    get(key: RDF.Variable | string): RDF.Term | undefined;
    set(key: RDF.Variable | string, value: RDF.Term): Bindings;
    delete(key: RDF.Variable | string): Bindings;
    keys(): Iterable<RDF.Variable>;
    values(): Iterable<RDF.Term>;
    forEach(fn: (value: RDF.Term, key: RDF.Variable) => any): void;
    get size(): number;
    [Symbol.iterator](): Iterator<[RDF.Variable, RDF.Term]>;
    equals(other: RDF.Bindings | null | undefined): boolean;
    filter(fn: (value: RDF.Term, key: RDF.Variable) => boolean): Bindings;
    map(fn: (value: RDF.Term, key: RDF.Variable) => RDF.Term): Bindings;
    merge(other: RDF.Bindings | Bindings): Bindings | undefined;
    mergeWith(merger: (self: RDF.Term, other: RDF.Term, key: RDF.Variable) => RDF.Term, other: RDF.Bindings | Bindings): Bindings;
    protected createBindingsWithContexts(entries: Map<string, RDF.Term>, other: RDF.Bindings | Bindings): Bindings;
    private static mergeContext;
    setContextEntry<V>(key: IActionContextKey<V>, value: any): Bindings;
    setContextEntryRaw<V>(key: IActionContextKey<V>, value: any): Bindings;
    deleteContextEntry<V>(key: IActionContextKey<V>): Bindings;
    deleteContextEntryRaw<V>(key: IActionContextKey<V>): Bindings;
    getContext(): IActionContext | undefined;
    getContextEntry<V>(key: IActionContextKey<V>): V | undefined;
    toString(): string;
    protected mapIterable<T, U>(iterable: Iterable<T>, callback: (value: T) => U): Iterable<U>;
    protected iteratorToIterable<T>(iterator: Iterator<T>): Iterable<T>;
}
export interface IContextHolder {
    contextMergeHandlers: Record<string, IBindingsContextMergeHandler<any>>;
    context?: IActionContext;
}
