import type { MediatorFunctionFactory } from '@comunica/bus-function-factory';
import type { MediatorQueryOperation } from '@comunica/bus-query-operation';
import type { Expression, IActionContext, TermExpression } from '@comunica/types';
import type { BindingsFactory } from '@comunica/utils-bindings-factory';
import type * as RDF from '@rdfjs/types';
import { AlgebraTransformer } from './AlgebraTransformer';
/**
 * This class provides evaluation functionality to already transformed expressions.
 */
export declare class InternalEvaluator {
    readonly context: IActionContext;
    private readonly mediatorQueryOperation;
    private readonly bindingsFactory;
    readonly transformer: AlgebraTransformer;
    private readonly subEvaluators;
    constructor(context: IActionContext, mediatorFunctionFactory: MediatorFunctionFactory, mediatorQueryOperation: MediatorQueryOperation, bindingsFactory: BindingsFactory);
    evaluatorExpressionEvaluation(expr: Expression, mapping: RDF.Bindings): Promise<TermExpression>;
    private term;
    private variable;
    private evalFunction;
    private evalExistence;
    private evalAggregate;
}
