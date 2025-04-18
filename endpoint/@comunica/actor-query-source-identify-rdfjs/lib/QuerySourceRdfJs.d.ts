import type { IQuerySource, BindingsStream, IActionContext, FragmentSelectorShape, ComunicaDataFactory } from '@comunica/types';
import type { BindingsFactory } from '@comunica/utils-bindings-factory';
import type * as RDF from '@rdfjs/types';
import { AsyncIterator } from 'asynciterator';
import type { Algebra } from 'sparqlalgebrajs';
import type { IRdfJsSourceExtended } from './IRdfJsSourceExtended';
export declare class QuerySourceRdfJs implements IQuerySource {
    protected readonly selectorShape: FragmentSelectorShape;
    referenceValue: string | RDF.Source;
    protected readonly source: IRdfJsSourceExtended;
    private readonly dataFactory;
    private readonly bindingsFactory;
    constructor(source: RDF.Source, dataFactory: ComunicaDataFactory, bindingsFactory: BindingsFactory);
    static nullifyVariables(term: RDF.Term | undefined, quotedTripleFiltering: boolean): RDF.Term | undefined;
    static hasDuplicateVariables(pattern: RDF.BaseQuad): boolean;
    getSelectorShape(): Promise<FragmentSelectorShape>;
    queryBindings(operation: Algebra.Operation, context: IActionContext): BindingsStream;
    protected setMetadata(it: AsyncIterator<RDF.Quad>, operation: Algebra.Pattern): Promise<void>;
    queryQuads(_operation: Algebra.Operation, _context: IActionContext): AsyncIterator<RDF.Quad>;
    queryBoolean(_operation: Algebra.Ask, _context: IActionContext): Promise<boolean>;
    queryVoid(_operation: Algebra.Update, _context: IActionContext): Promise<void>;
    toString(): string;
}
