import type { InternalEvaluator } from '@comunica/actor-expression-evaluator-factory-default/lib/InternalEvaluator';
import type { ITermFunction } from '@comunica/bus-function-factory';
import type { ITermComparator } from '@comunica/bus-term-comparator-factory';
import type * as RDF from '@rdfjs/types';
export declare class TermComparatorExpressionEvaluator implements ITermComparator {
    private readonly internalEvaluator;
    private readonly equalityFunction;
    private readonly lessThanFunction;
    constructor(internalEvaluator: InternalEvaluator, equalityFunction: ITermFunction, lessThanFunction: ITermFunction);
    orderTypes(termA: RDF.Term | undefined, termB: RDF.Term | undefined): -1 | 0 | 1;
    private orderLiteralTypes;
    private comparePrimitives;
    private readonly _TERM_ORDERING_PRIORITY;
}
