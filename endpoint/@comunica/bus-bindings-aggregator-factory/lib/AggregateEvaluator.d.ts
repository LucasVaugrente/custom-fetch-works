import type { IExpressionEvaluator, ISuperTypeProvider } from '@comunica/types';
import * as Eval from '@comunica/utils-expression-evaluator';
import type * as RDF from '@rdfjs/types';
/**
 * This is the base class for all aggregators.
 * NOTE: The wildcard count aggregator significantly differs from the others and overloads parts of this class.
 */
export declare abstract class AggregateEvaluator {
    protected readonly evaluator: IExpressionEvaluator;
    protected readonly distinct: boolean;
    private readonly throwError;
    private errorOccurred;
    protected readonly variableValues: Set<string>;
    protected readonly superTypeProvider: ISuperTypeProvider;
    protected readonly termTransformer: Eval.TermTransformer;
    protected constructor(evaluator: IExpressionEvaluator, distinct: boolean, throwError?: boolean);
    protected abstract putTerm(term: RDF.Term): void;
    protected abstract termResult(): RDF.Term | undefined;
    emptyValueTerm(): RDF.Term | undefined;
    /**
     * The spec says to throw an error when a set function is called on an empty
     * set (unless explicitly mentioned otherwise like COUNT).
     * However, aggregate error handling says to not bind the result in case of an
     * error. So to simplify logic in the caller, we return undefined by default.
     */
    emptyValue(): RDF.Term | undefined;
    /**
     * Base implementation of putBindings, that evaluates to a term and then calls putTerm.
     * The WildcardCountAggregator will completely discard this implementation.
     * @param bindings
     */
    putBindings(bindings: RDF.Bindings): Promise<void>;
    result(): Promise<RDF.Term | undefined>;
    private safeThrow;
    protected termToNumericOrError(term: RDF.Term): Eval.NumericLiteral;
}
