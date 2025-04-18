import type { IBindingsContextMergeHandler, MediatorMergeBindingsContext } from '@comunica/bus-merge-bindings-context';
import type { ComunicaDataFactory, IActionContext } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import { Bindings } from './Bindings';
/**
 * A Bindings factory that provides Bindings backed by immutable.js.
 */
export declare class BindingsFactory implements RDF.BindingsFactory {
    private readonly dataFactory;
    private readonly contextMergeHandlers;
    constructor(dataFactory: ComunicaDataFactory, contextMergeHandlers?: Record<string, IBindingsContextMergeHandler<any>>);
    static create(mediatorMergeBindingsContext: MediatorMergeBindingsContext, context: IActionContext, dataFactory: ComunicaDataFactory): Promise<BindingsFactory>;
    bindings(entries?: [RDF.Variable, RDF.Term][]): Bindings;
    fromBindings(bindings: RDF.Bindings): Bindings;
    fromRecord(record: Record<string, RDF.Term>): Bindings;
}
