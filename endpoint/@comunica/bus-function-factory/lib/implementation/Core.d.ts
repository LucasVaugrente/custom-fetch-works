import type { Expression, IEvalContext, IInternalEvaluator, TermExpression } from '@comunica/types';
import type { GeneralOperator, OverloadTree } from '@comunica/utils-expression-evaluator';
import type { IExpressionFunction, ITermFunction } from '../ActorFunctionFactory';
interface BaseFunctionDefinitionArgs {
    arity: number | number[];
    operator: GeneralOperator;
    apply: (evalContext: IEvalContext) => Promise<TermExpression>;
}
export declare class ExpressionFunctionBase implements IExpressionFunction {
    protected readonly arity: number | number[];
    readonly operator: GeneralOperator;
    readonly apply: (evalContext: IEvalContext) => Promise<TermExpression>;
    constructor({ arity, operator, apply }: BaseFunctionDefinitionArgs);
    checkArity(args: Expression[]): boolean;
}
interface TermSparqlFunctionArgs {
    arity: number | number[];
    operator: GeneralOperator;
    overloads: OverloadTree;
}
/**
 * Varying kinds of functions take arguments of different types on which the
 * specific behaviour is dependant. Although their behaviour is often varying,
 * it is always relatively simple, and better suited for synced behaviour.
 * The types of their arguments are always terms, but might differ in
 * their term-type (eg: iri, literal),
 * their specific literal type (eg: string, integer),
 * their arity (see BNODE),
 * or even their specific numeric type (eg: integer, float).
 *
 * Examples include:
 *  - Arithmetic operations such as: *, -, /, +
 *  - Bool operators such as: =, !=, <=, <, ...
 *  - Functions such as: str, IRI
 *
 * See also: https://www.w3.org/TR/definitionTypesparql11-query/#func-rdfTerms
 * and https://www.w3.org/TR/sparql11-query/#OperatorMapping
 */
export declare class TermFunctionBase extends ExpressionFunctionBase implements ITermFunction {
    readonly supportsTermExpressions = true;
    protected readonly overloads: OverloadTree;
    constructor({ arity, operator, overloads }: TermSparqlFunctionArgs);
    applyOnTerms(args: TermExpression[], exprEval: IInternalEvaluator): TermExpression;
    protected handleInvalidTypes(args: TermExpression[]): never;
}
export {};
