import type { BindingsStream, FragmentSelectorShape, IActionContext, IQueryBindingsOptions, IQuerySource } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { AsyncIterator } from 'asynciterator';
import type { Algebra } from 'sparqlalgebrajs';
/**
 * A IQuerySource wrapper that skolemizes outgoing quads and bindings.
 */
export declare class QuerySourceAddSourceAttribution implements IQuerySource {
    /**
     * The query source to wrap over.
     */
    readonly innerSource: IQuerySource;
    constructor(innerSource: IQuerySource);
    getSelectorShape(context: IActionContext): Promise<FragmentSelectorShape>;
    queryBindings(operation: Algebra.Operation, context: IActionContext, options: IQueryBindingsOptions | undefined): BindingsStream;
    addSourceUrlToBindingContext(iterator: BindingsStream): BindingsStream;
    queryBoolean(operation: Algebra.Ask, context: IActionContext): Promise<boolean>;
    queryQuads(operation: Algebra.Operation, context: IActionContext): AsyncIterator<RDF.Quad>;
    queryVoid(operation: Algebra.Update, context: IActionContext): Promise<void>;
    get referenceValue(): string | RDF.Source;
    toString(): string;
}
