import type { IBindingsAggregator } from '@comunica/bus-bindings-aggregator-factory';
import { AggregateEvaluator } from '@comunica/bus-bindings-aggregator-factory';
import type { ITermFunction } from '@comunica/bus-function-factory';
import type { ComunicaDataFactory, IExpressionEvaluator } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
export declare class AverageAggregator extends AggregateEvaluator implements IBindingsAggregator {
    private readonly dataFactory;
    private readonly additionFunction;
    private readonly divisionFunction;
    private state;
    constructor(evaluator: IExpressionEvaluator, distinct: boolean, dataFactory: ComunicaDataFactory, additionFunction: ITermFunction, divisionFunction: ITermFunction, throwError?: boolean);
    emptyValueTerm(): RDF.Term;
    putTerm(term: RDF.Term): void;
    termResult(): RDF.Term | undefined;
}
