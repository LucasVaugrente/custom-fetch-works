import type { ComunicaDataFactory, IDateTimeRepresentation, IInternalEvaluator, ImplementationFunction, ImplementationFunctionTuple, TermExpression, VariableExpression } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type { ISerializable, Quad } from '../expressions';
import * as E from '../expressions';
import type { ArgumentType } from './OverloadTree';
import { OverloadTree } from './OverloadTree';
type Term = TermExpression;
export declare function declare(identifier: string): Builder;
export declare class Builder {
    private readonly overloadTree;
    private collected;
    constructor(identifier: string);
    collect(): OverloadTree;
    private static wrapInvalidLexicalProtected;
    set(argTypes: [], func: ImplementationFunctionTuple<[]>, addInvalidHandling?: boolean): Builder;
    set<T1 extends TermExpression>(argTypes: [ArgumentType], func: ImplementationFunctionTuple<[T1]>, addInvalidHandling?: boolean): Builder;
    set<T1 extends TermExpression, T2 extends TermExpression>(argTypes: [ArgumentType, ArgumentType], func: ImplementationFunctionTuple<[T1, T2]>, addInvalidHandling?: boolean): Builder;
    set<T1 extends TermExpression, T2 extends TermExpression, T3 extends TermExpression>(argTypes: [ArgumentType, ArgumentType, ArgumentType], func: ImplementationFunctionTuple<[T1, T2, T3]>, addInvalidHandling?: boolean): Builder;
    set<T1 extends TermExpression, T2 extends TermExpression, T3 extends TermExpression, T4 extends TermExpression>(argTypes: [ArgumentType, ArgumentType, ArgumentType, ArgumentType], func: ImplementationFunctionTuple<[T1, T2, T3, T4]>, addInvalidHandling?: boolean): Builder;
    set(argTypes: ArgumentType[], func: ImplementationFunction, addInvalidHandling?: boolean): Builder;
    copy({ from, to }: {
        from: ArgumentType[];
        to: ArgumentType[];
    }): Builder;
    onUnary<T extends Term>(type: ArgumentType, op: (expressionEvaluator: IInternalEvaluator) => (val: T) => Term, addInvalidHandling?: boolean): Builder;
    onUnaryTyped<T extends ISerializable>(type: ArgumentType, op: (expressionEvaluator: IInternalEvaluator) => (val: T) => Term, addInvalidHandling?: boolean): Builder;
    onBinary<L extends Term, R extends Term>(types: [ArgumentType, ArgumentType], op: (expressionEvaluator: IInternalEvaluator) => (left: L, right: R) => Term, addInvalidHandling?: boolean): Builder;
    onBinaryTyped<L extends ISerializable, R extends ISerializable>(types: [ArgumentType, ArgumentType], op: (expressionEvaluator: IInternalEvaluator) => (left: L, right: R) => Term, addInvalidHandling?: boolean): Builder;
    onTernaryTyped<A1 extends ISerializable, A2 extends ISerializable, A3 extends ISerializable>(types: [ArgumentType, ArgumentType, ArgumentType], op: (expressionEvaluator: IInternalEvaluator) => (a1: A1, a2: A2, a3: A3) => Term, addInvalidHandling?: boolean): Builder;
    onTernary<A1 extends Term, A2 extends Term, A3 extends Term>(types: [ArgumentType, ArgumentType, ArgumentType], op: (expressionEvaluator: IInternalEvaluator) => (a1: A1, a2: A2, a3: A3) => Term, addInvalidHandling?: boolean): Builder;
    onQuaternaryTyped<A1 extends ISerializable, A2 extends ISerializable, A3 extends ISerializable, A4 extends ISerializable>(types: [ArgumentType, ArgumentType, ArgumentType, ArgumentType], op: (expressionEvaluator: IInternalEvaluator) => (a1: A1, a2: A2, a3: A3, a4: A4) => Term, addInvalidHandling?: boolean): Builder;
    onTerm1<T extends Term>(op: (expressionEvaluator: IInternalEvaluator) => (term: T) => Term, addInvalidHandling?: boolean): Builder;
    onTerm3(op: (expressionEvaluator: IInternalEvaluator) => (t1: Term, t2: Term, t3: Term) => Term): Builder;
    onQuad1(op: (expressionEvaluator: IInternalEvaluator) => (term: Term & Quad) => Term): Builder;
    onLiteral1<T extends ISerializable>(op: (expressionEvaluator: IInternalEvaluator) => (lit: E.Literal<T>) => Term, addInvalidHandling?: boolean): Builder;
    onBoolean1(op: (expressionEvaluator: IInternalEvaluator) => (lit: E.BooleanLiteral) => Term, addInvalidHandling?: boolean): Builder;
    onBoolean1Typed(op: (expressionEvaluator: IInternalEvaluator) => (lit: boolean) => Term, addInvalidHandling?: boolean): Builder;
    onString1(op: (expressionEvaluator: IInternalEvaluator) => (lit: E.Literal<string>) => Term, addInvalidHandling?: boolean): Builder;
    onString1Typed(op: (expressionEvaluator: IInternalEvaluator) => (lit: string) => Term, addInvalidHandling?: boolean): Builder;
    onLangString1(op: (expressionEvaluator: IInternalEvaluator) => (lit: E.LangStringLiteral) => Term, addInvalidHandling?: boolean): Builder;
    onStringly1(op: (expressionEvaluator: IInternalEvaluator) => (lit: E.Literal<string>) => Term, addInvalidHandling?: boolean): Builder;
    onStringly1Typed(op: (expressionEvaluator: IInternalEvaluator) => (lit: string) => Term, addInvalidHandling?: boolean): Builder;
    onNumeric1(op: (expressionEvaluator: IInternalEvaluator) => (val: E.NumericLiteral) => Term, addInvalidHandling?: boolean): Builder;
    onDateTime1(op: (expressionEvaluator: IInternalEvaluator) => (date: E.DateTimeLiteral) => Term, addInvalidHandling?: boolean): Builder;
    /**
     * We return the base types and not the provided types because we don't want to create invalid terms.
     * Providing negative number to a function unary - for example should not
     * return a term of type negative number having a positive value.
     * @param op the numeric operator performed
     * @param addInvalidHandling whether to add invalid handling,
     *   whether to add @param op in @see wrapInvalidLexicalProtected
     */
    numericConverter(op: (expressionEvaluator: IInternalEvaluator) => (val: number) => number, addInvalidHandling?: boolean): Builder;
    /**
     * !!! Be aware when using this function, it will create different overloads with different return types !!!
     * Arithmetic operators take 2 numeric arguments, and return a single numerical
     * value. The type of the return value is heavily dependent on the types of the
     * input arguments. In JS everything is a double, but in SPARQL it is not.
     *
     * The different arguments are handled by type promotion and subtype substitution.
     * The way numeric function arguments work is described here:
     * https://www.w3.org/TR/xpath20/#mapping
     * Above url is referenced in the sparql spec: https://www.w3.org/TR/sparql11-query/#OperatorMapping
     */
    arithmetic(op: (expressionEvaluator: IInternalEvaluator) => (left: number, right: number) => number, addInvalidHandling?: boolean): Builder;
    numberTest(test: (expressionEvaluator: IInternalEvaluator) => (left: number, right: number) => boolean): Builder;
    stringTest(test: (expressionEvaluator: IInternalEvaluator) => (left: string, right: string) => boolean, addInvalidHandling?: boolean): Builder;
    booleanTest(test: (expressionEvaluator: IInternalEvaluator) => (left: boolean, right: boolean) => boolean, addInvalidHandling?: boolean): Builder;
    dateTimeTest(test: (expressionEvaluator: IInternalEvaluator) => (left: IDateTimeRepresentation, right: IDateTimeRepresentation) => boolean, addInvalidHandling?: boolean): Builder;
    numeric<T extends TermExpression>(op: ImplementationFunctionTuple<[T, T]>): Builder;
}
export declare function bool(val: boolean): E.BooleanLiteral;
export declare function integer(num: number): E.IntegerLiteral;
export declare function decimal(num: number): E.DecimalLiteral;
export declare function float(num: number): E.FloatLiteral;
export declare function double(num: number): E.DoubleLiteral;
export declare function string(str: string): E.StringLiteral;
export declare function langString(str: string, lang: string): E.LangStringLiteral;
export declare function dateTime(date: IDateTimeRepresentation, str: string): E.DateTimeLiteral;
export declare function expressionToVar(dataFactory: ComunicaDataFactory, variableExpression: VariableExpression): RDF.Variable;
export {};
