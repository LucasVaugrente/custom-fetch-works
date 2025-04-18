import type { IBindingsAggregator } from '@comunica/bus-bindings-aggregator-factory';
import { AggregateEvaluator } from '@comunica/bus-bindings-aggregator-factory';
import type { IExpressionEvaluator } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
export declare class WildcardCountAggregator extends AggregateEvaluator implements IBindingsAggregator {
    private readonly bindingValues;
    private state;
    constructor(evaluator: IExpressionEvaluator, distinct: boolean, throwError?: boolean);
    putTerm(_term: RDF.Term): void;
    putBindings(bindings: RDF.Bindings): Promise<void>;
    emptyValueTerm(): RDF.Term;
    termResult(): RDF.Term | undefined;
    /**
     * Returns true if the given bindings should be skipped.
     * @param bindings
     * @private
     */
    private handleDistinct;
}
