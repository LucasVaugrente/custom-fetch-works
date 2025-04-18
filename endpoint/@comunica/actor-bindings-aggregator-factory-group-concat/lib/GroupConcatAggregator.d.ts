import type { IBindingsAggregator } from '@comunica/bus-bindings-aggregator-factory';
import { AggregateEvaluator } from '@comunica/bus-bindings-aggregator-factory';
import type { ComunicaDataFactory, IExpressionEvaluator } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
export declare class GroupConcatAggregator extends AggregateEvaluator implements IBindingsAggregator {
    private readonly dataFactory;
    private state;
    private lastLanguageValid;
    private lastLanguage;
    private readonly separator;
    constructor(evaluator: IExpressionEvaluator, distinct: boolean, dataFactory: ComunicaDataFactory, separator?: string, throwError?: boolean);
    emptyValueTerm(): RDF.Term;
    putTerm(term: RDF.Term): void;
    termResult(): RDF.Term | undefined;
}
