import type { MediatorFunctionFactory } from '@comunica/bus-function-factory';
import type { MediatorQueryOperation } from '@comunica/bus-query-operation';
import type { Expression, IActionContext, IExpressionEvaluator, TermExpression } from '@comunica/types';
import type { BindingsFactory } from '@comunica/utils-bindings-factory';
import type * as RDF from '@rdfjs/types';
export declare class ExpressionEvaluator implements IExpressionEvaluator {
    readonly context: IActionContext;
    readonly expr: Expression;
    readonly mediatorFunctionFactory: MediatorFunctionFactory;
    readonly mediatorQueryOperation: MediatorQueryOperation;
    readonly bindingsFactory: BindingsFactory;
    private readonly internalEvaluator;
    constructor(context: IActionContext, expr: Expression, mediatorFunctionFactory: MediatorFunctionFactory, mediatorQueryOperation: MediatorQueryOperation, bindingsFactory: BindingsFactory);
    evaluate(mapping: RDF.Bindings): Promise<RDF.Term>;
    evaluateAsEBV(mapping: RDF.Bindings): Promise<boolean>;
    evaluateAsEvaluatorExpression(mapping: RDF.Bindings): Promise<TermExpression>;
    evaluatorExpressionEvaluation(expr: Expression, mapping: RDF.Bindings): Promise<TermExpression>;
}
