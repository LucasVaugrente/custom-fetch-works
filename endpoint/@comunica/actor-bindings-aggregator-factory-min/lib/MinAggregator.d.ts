import type { IBindingsAggregator } from '@comunica/bus-bindings-aggregator-factory';
import { AggregateEvaluator } from '@comunica/bus-bindings-aggregator-factory';
import type { ITermComparator } from '@comunica/bus-term-comparator-factory';
import type { IExpressionEvaluator } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
export declare class MinAggregator extends AggregateEvaluator implements IBindingsAggregator {
    private readonly orderByEvaluator;
    private state;
    constructor(evaluator: IExpressionEvaluator, distinct: boolean, orderByEvaluator: ITermComparator, throwError?: boolean);
    putTerm(term: RDF.Term): void;
    termResult(): RDF.Term | undefined;
}
