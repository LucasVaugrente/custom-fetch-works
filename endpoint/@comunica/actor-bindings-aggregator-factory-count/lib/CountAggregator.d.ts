import type { IBindingsAggregator } from '@comunica/bus-bindings-aggregator-factory';
import { AggregateEvaluator } from '@comunica/bus-bindings-aggregator-factory';
import type { IExpressionEvaluator } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
export declare class CountAggregator extends AggregateEvaluator implements IBindingsAggregator {
    private state;
    constructor(evaluator: IExpressionEvaluator, distinct: boolean, throwError?: boolean);
    emptyValueTerm(): RDF.Term;
    protected putTerm(_: RDF.Term): void;
    protected termResult(): RDF.Term | undefined;
}
