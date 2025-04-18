import type { IBindingsAggregator } from '@comunica/bus-bindings-aggregator-factory';
import { AggregateEvaluator } from '@comunica/bus-bindings-aggregator-factory';
import type { IExpressionEvaluator } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
export declare class SampleAggregator extends AggregateEvaluator implements IBindingsAggregator {
    private state;
    constructor(evaluator: IExpressionEvaluator, distinct: boolean, throwError?: boolean);
    putTerm(term: RDF.Term): void;
    termResult(): RDF.Term | undefined;
}
