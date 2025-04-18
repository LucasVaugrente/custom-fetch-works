"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateEvaluator = void 0;
const context_entries_1 = require("@comunica/context-entries");
const Eval = require("@comunica/utils-expression-evaluator");
const RdfString = require("rdf-string");
/**
 * This is the base class for all aggregators.
 * NOTE: The wildcard count aggregator significantly differs from the others and overloads parts of this class.
 */
class AggregateEvaluator {
    constructor(evaluator, distinct, throwError = false) {
        this.evaluator = evaluator;
        this.distinct = distinct;
        this.throwError = throwError;
        this.errorOccurred = false;
        this.errorOccurred = false;
        this.superTypeProvider = evaluator.context.getSafe(context_entries_1.KeysExpressionEvaluator.superTypeProvider);
        this.termTransformer = new Eval.TermTransformer(this.superTypeProvider);
        this.variableValues = new Set();
    }
    emptyValueTerm() {
        return undefined;
    }
    /**
     * The spec says to throw an error when a set function is called on an empty
     * set (unless explicitly mentioned otherwise like COUNT).
     * However, aggregate error handling says to not bind the result in case of an
     * error. So to simplify logic in the caller, we return undefined by default.
     */
    emptyValue() {
        const val = this.emptyValueTerm();
        if (val === undefined && this.throwError) {
            throw new Eval.EmptyAggregateError();
        }
        return val;
    }
    /**
     * Base implementation of putBindings, that evaluates to a term and then calls putTerm.
     * The WildcardCountAggregator will completely discard this implementation.
     * @param bindings
     */
    async putBindings(bindings) {
        if (this.errorOccurred) {
            return;
        }
        try {
            const term = await this.evaluator.evaluate(bindings);
            if (!term || this.errorOccurred) {
                return;
            }
            // Handle DISTINCT before putting the term
            if (!this.distinct || !this.variableValues.has(RdfString.termToString(term))) {
                this.putTerm(term);
                if (this.distinct) {
                    this.variableValues.add(RdfString.termToString(term));
                }
            }
        }
        catch (error) {
            this.safeThrow(error);
        }
    }
    async result() {
        if (this.errorOccurred) {
            return undefined;
        }
        return this.termResult();
    }
    safeThrow(err) {
        if (this.throwError) {
            throw err;
        }
        else {
            this.errorOccurred = true;
        }
    }
    termToNumericOrError(term) {
        if (term.termType !== 'Literal') {
            throw new Error(`Term with value ${term.value} has type ${term.termType} and is not a numeric literal`);
        }
        else if (!Eval.isSubTypeOf(term.datatype.value, Eval.TypeAlias.SPARQL_NUMERIC, this.superTypeProvider)) {
            throw new Error(`Term datatype ${term.datatype.value} with value ${term.value} has type ${term.termType} and is not a numeric literal`);
        }
        return this.termTransformer.transformLiteral(term);
    }
}
exports.AggregateEvaluator = AggregateEvaluator;
//# sourceMappingURL=AggregateEvaluator.js.map