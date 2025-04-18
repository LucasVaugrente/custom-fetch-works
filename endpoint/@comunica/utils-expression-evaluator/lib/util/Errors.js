"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoAggregator = exports.ExtensionFunctionError = exports.InvalidExpression = exports.InvalidArity = exports.UnexpectedError = exports.ParseError = exports.EmptyAggregateError = exports.IncompatibleLanguageOperation = exports.InvalidTimezoneCall = exports.CastError = exports.InvalidArgumentTypes = exports.InError = exports.CoalesceError = exports.RDFEqualTypeError = exports.EBVCoercionError = exports.UnboundVariableError = exports.InvalidLexicalForm = exports.isExpressionError = exports.ExpressionError = void 0;
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
class ExpressionError extends Error {
}
exports.ExpressionError = ExpressionError;
/**
 * Checks whether a given error is an {@link ExpressionError}.
 * Also useful for mocking in tests for covering all branches.
 *
 * @see ExpressionError
 */
function isExpressionError(error) {
    return error instanceof ExpressionError;
}
exports.isExpressionError = isExpressionError;
/**
 * A literal has an invalid lexical form for the datatype it is accompanied by.
 * This error is only thrown when the term is as function argument that requires
 * a valid lexical form.
 */
class InvalidLexicalForm extends ExpressionError {
    constructor(arg) {
        super(`Invalid lexical form '${pp(arg)}'`);
        this.arg = arg;
    }
}
exports.InvalidLexicalForm = InvalidLexicalForm;
/**
 * A variable in the expression was not bound.
 */
class UnboundVariableError extends ExpressionError {
    constructor(variable, bindings) {
        super(`Unbound variable '${pp(variable)}'`);
        this.variable = variable;
        this.bindings = bindings;
    }
}
exports.UnboundVariableError = UnboundVariableError;
/**
 * An invalid term was being coerced to an Effective Boolean Value.
 *
 * See the {@link https://www.w3.org/TR/sparql11-query/#ebv | SPARQL docs}
 * on EBVs.
 */
class EBVCoercionError extends ExpressionError {
    constructor(arg) {
        super(`Cannot coerce term to EBV '${pp(arg)}'`);
        this.arg = arg;
    }
}
exports.EBVCoercionError = EBVCoercionError;
/**
 * An equality test was done on literals with unsupported datatypes.
 *
 * See {@link https://www.w3.org/TR/sparql11-query/#func-RDFterm-equal | term equality spec}.
 */
class RDFEqualTypeError extends ExpressionError {
    constructor(args) {
        super('Equality test for literals with unsupported datatypes');
        this.args = args;
    }
}
exports.RDFEqualTypeError = RDFEqualTypeError;
/**
 * All the expressions in a COALESCE call threw errors.
 */
class CoalesceError extends ExpressionError {
    constructor(errors) {
        super('All COALESCE arguments threw errors');
        this.errors = errors;
    }
}
exports.CoalesceError = CoalesceError;
/**
 * No arguments to an IN call where equal, and at least one threw an error.
 */
class InError extends ExpressionError {
    constructor(errors) {
        super(`Some argument to IN errorred and none where equal. ${errors.map(err => `(${err.toString()}) `).join('and ')}`);
        this.errors = errors;
    }
}
exports.InError = InError;
/**
 * Literals were passed to an operator that doesn't support their datatypes.
 */
class InvalidArgumentTypes extends ExpressionError {
    constructor(args, op) {
        super(`Argument types not valid for operator: '${pp(op)}' with '${pp(args)}`);
        this.args = args;
        this.op = op;
    }
}
exports.InvalidArgumentTypes = InvalidArgumentTypes;
/**
 * An invalid typecast happened.
 */
class CastError extends ExpressionError {
    constructor(arg, cast) {
        super(`Invalid cast: '${pp(arg)}' to '${pp(cast)}'`);
        this.arg = arg;
    }
}
exports.CastError = CastError;
class InvalidTimezoneCall extends ExpressionError {
    constructor(dateString) {
        super(`TIMEZONE call on ${dateString} which has no timezone`);
        this.dateString = dateString;
    }
}
exports.InvalidTimezoneCall = InvalidTimezoneCall;
class IncompatibleLanguageOperation extends ExpressionError {
    constructor(arg1, arg2) {
        super(`Operation on incompatible language literals '${pp(arg1)}' and '${pp(arg2)}'`);
        this.arg1 = arg1;
        this.arg2 = arg2;
    }
}
exports.IncompatibleLanguageOperation = IncompatibleLanguageOperation;
class EmptyAggregateError extends ExpressionError {
    constructor() {
        super('Empty aggregate expression');
    }
}
exports.EmptyAggregateError = EmptyAggregateError;
class ParseError extends ExpressionError {
    constructor(str, type) {
        super(`Failed to parse "${str}" as ${type}.`);
    }
}
exports.ParseError = ParseError;
// Non Expression Errors ------------------------------------------------------
/**
 * An error that arises when we detect a 'should-be-impossible' state.
 * Given that this error is thrown, it clearly wasn't impossible, and some
 * mistake has been made.
 */
class UnexpectedError extends Error {
    constructor(message, payload) {
        super(`Programmer Error '${message}'`);
        this.payload = payload;
    }
}
exports.UnexpectedError = UnexpectedError;
class InvalidArity extends Error {
    constructor(args, op) {
        super(`The number of args does not match the arity of the operator '${pp(op)}'.`);
        this.args = args;
        this.op = op;
    }
}
exports.InvalidArity = InvalidArity;
class InvalidExpression extends Error {
    constructor(expr) {
        super(`Invalid SPARQL Expression '${pp(expr)}'`);
    }
}
exports.InvalidExpression = InvalidExpression;
class ExtensionFunctionError extends Error {
    constructor(name, functionError) {
        if (functionError instanceof Error) {
            super(`Error thrown in ${name}: ${functionError.message}${functionError.stack ? `\n${functionError.stack}` : ''}`);
        }
        else {
            super(`Error thrown in ${name}`);
        }
    }
}
exports.ExtensionFunctionError = ExtensionFunctionError;
class NoAggregator extends Error {
    constructor(name) {
        super(`Aggregate expression ${pp(name)} found, but no aggregate hook provided.`);
    }
}
exports.NoAggregator = NoAggregator;
function pp(object) {
    return JSON.stringify(object);
}
//# sourceMappingURL=Errors.js.map