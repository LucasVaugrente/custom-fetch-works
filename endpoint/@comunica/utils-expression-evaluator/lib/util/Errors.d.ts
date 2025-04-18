import type { Expression } from '@comunica/types';
import type * as RDF from '@rdfjs/types';
import type * as E from '../expressions';
import type * as C from './Consts';
/**
 * This class of error will be thrown when an expression errors.
 * Various reasons this could happen are:
 *   - invalid types for the given operator
 *   - unbound variables
 *   - invalid lexical forms
 *   - ...
 *
 * The distinction is made so that one can catch this specific type
 * and handle it accordingly to the SPARQL spec (relevant for e.g. FILTER, EXTEND),
 * while others (programming errors) can be re-thrown.
 *
 * @see isExpressionError
 */
export declare class ExpressionError extends Error {
}
/**
 * Checks whether a given error is an {@link ExpressionError}.
 * Also useful for mocking in tests for covering all branches.
 *
 * @see ExpressionError
 */
export declare function isExpressionError(error: Error): boolean;
/**
 * A literal has an invalid lexical form for the datatype it is accompanied by.
 * This error is only thrown when the term is as function argument that requires
 * a valid lexical form.
 */
export declare class InvalidLexicalForm extends ExpressionError {
    arg: RDF.Term;
    constructor(arg: RDF.Term);
}
/**
 * A variable in the expression was not bound.
 */
export declare class UnboundVariableError extends ExpressionError {
    variable: string;
    bindings: RDF.Bindings;
    constructor(variable: string, bindings: RDF.Bindings);
}
/**
 * An invalid term was being coerced to an Effective Boolean Value.
 *
 * See the {@link https://www.w3.org/TR/sparql11-query/#ebv | SPARQL docs}
 * on EBVs.
 */
export declare class EBVCoercionError extends ExpressionError {
    arg: E.Term;
    constructor(arg: E.Term);
}
/**
 * An equality test was done on literals with unsupported datatypes.
 *
 * See {@link https://www.w3.org/TR/sparql11-query/#func-RDFterm-equal | term equality spec}.
 */
export declare class RDFEqualTypeError extends ExpressionError {
    args: Expression[];
    constructor(args: Expression[]);
}
/**
 * All the expressions in a COALESCE call threw errors.
 */
export declare class CoalesceError extends ExpressionError {
    errors: Error[];
    constructor(errors: Error[]);
}
/**
 * No arguments to an IN call where equal, and at least one threw an error.
 */
export declare class InError extends ExpressionError {
    errors: (Error | false)[];
    constructor(errors: (Error | false)[]);
}
/**
 * Literals were passed to an operator that doesn't support their datatypes.
 */
export declare class InvalidArgumentTypes extends ExpressionError {
    args: Expression[];
    op: C.GeneralOperator;
    constructor(args: Expression[], op: C.GeneralOperator);
}
/**
 * An invalid typecast happened.
 */
export declare class CastError<T> extends ExpressionError {
    arg: T;
    constructor(arg: T, cast: C.TypeURL);
}
export declare class InvalidTimezoneCall extends ExpressionError {
    dateString: string;
    constructor(dateString: string);
}
export declare class IncompatibleLanguageOperation extends ExpressionError {
    arg1: E.LangStringLiteral;
    arg2: E.LangStringLiteral;
    constructor(arg1: E.LangStringLiteral, arg2: E.LangStringLiteral);
}
export declare class EmptyAggregateError extends ExpressionError {
    constructor();
}
export declare class ParseError extends ExpressionError {
    constructor(str: string, type: string);
}
/**
 * An error that arises when we detect a 'should-be-impossible' state.
 * Given that this error is thrown, it clearly wasn't impossible, and some
 * mistake has been made.
 */
export declare class UnexpectedError<T> extends Error {
    payload?: T | undefined;
    constructor(message: string, payload?: T | undefined);
}
export declare class InvalidArity extends Error {
    args: Expression[];
    op: C.GeneralOperator;
    constructor(args: Expression[], op: C.GeneralOperator);
}
export declare class InvalidExpression<T> extends Error {
    constructor(expr: T);
}
export declare class ExtensionFunctionError extends Error {
    constructor(name: string, functionError: unknown);
}
export declare class NoAggregator extends Error {
    constructor(name?: string);
}
