"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionBase = exports.ExpressionFunctionBase = void 0;
const context_entries_1 = require("@comunica/context-entries");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class ExpressionFunctionBase {
    constructor({ arity, operator, apply }) {
        this.arity = arity;
        this.operator = operator;
        this.apply = apply;
    }
    checkArity(args) {
        if (Array.isArray(this.arity)) {
            return this.arity.includes(args.length);
        }
        if (this.arity === Number.POSITIVE_INFINITY) {
            // Infinity is used to represent var-args, so it's always correct.
            return true;
        }
        return args.length === this.arity;
    }
}
exports.ExpressionFunctionBase = ExpressionFunctionBase;
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
class TermFunctionBase extends ExpressionFunctionBase {
    constructor({ arity, operator, overloads }) {
        super({
            arity,
            operator,
            apply: async ({ args, exprEval, mapping }) => this.applyOnTerms(await Promise.all(args.map(arg => exprEval.evaluatorExpressionEvaluation(arg, mapping))), exprEval),
        });
        this.supportsTermExpressions = true;
        this.overloads = overloads;
    }
    applyOnTerms(args, exprEval) {
        const concreteFunction = this.overloads.search(args, exprEval.context.getSafe(context_entries_1.KeysExpressionEvaluator.superTypeProvider), exprEval.context.getSafe(context_entries_1.KeysInitQuery.functionArgumentsCache)) ?? this.handleInvalidTypes(args);
        return concreteFunction(exprEval)(args);
    }
    handleInvalidTypes(args) {
        throw new utils_expression_evaluator_1.InvalidArgumentTypes(args, this.operator);
    }
}
exports.TermFunctionBase = TermFunctionBase;
//# sourceMappingURL=Core.js.map