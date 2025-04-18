"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermComparatorExpressionEvaluator = void 0;
class TermComparatorExpressionEvaluator {
    constructor(internalEvaluator, equalityFunction, lessThanFunction) {
        this.internalEvaluator = internalEvaluator;
        this.equalityFunction = equalityFunction;
        this.lessThanFunction = lessThanFunction;
        // SPARQL specifies that blankNode < namedNode < literal. Sparql star expands with < quads and we say < defaultGraph
        this._TERM_ORDERING_PRIORITY = {
            Variable: 0,
            BlankNode: 1,
            NamedNode: 2,
            Literal: 3,
            Quad: 4,
            DefaultGraph: 5,
        };
    }
    // Determine the relative numerical order of the two given terms.
    // In accordance with https://www.w3.org/TR/sparql11-query/#modOrderBy
    orderTypes(termA, termB) {
        // Check if terms are the same by reference
        if (termA === termB) {
            return 0;
        }
        // We handle undefined that is lower than everything else.
        if (termA === undefined) {
            return -1;
        }
        if (termB === undefined) {
            return 1;
        }
        //
        if (termA.termType !== termB.termType) {
            return this._TERM_ORDERING_PRIORITY[termA.termType] < this._TERM_ORDERING_PRIORITY[termB.termType] ? -1 : 1;
        }
        // Check exact term equality
        if (termA.equals(termB)) {
            return 0;
        }
        // Handle quoted triples
        if (termA.termType === 'Quad' && termB.termType === 'Quad') {
            const orderSubject = this.orderTypes(termA.subject, termB.subject);
            if (orderSubject !== 0) {
                return orderSubject;
            }
            const orderPredicate = this.orderTypes(termA.predicate, termB.predicate);
            if (orderPredicate !== 0) {
                return orderPredicate;
            }
            const orderObject = this.orderTypes(termA.object, termB.object);
            if (orderObject !== 0) {
                return orderObject;
            }
            return this.orderTypes(termA.graph, termB.graph);
        }
        // Handle literals
        if (termA.termType === 'Literal') {
            return this.orderLiteralTypes(termA, termB);
        }
        return this.comparePrimitives(termA.value, termB.value);
    }
    orderLiteralTypes(litA, litB) {
        const myLitA = this.internalEvaluator.transformer.transformLiteral(litA);
        const myLitB = this.internalEvaluator.transformer.transformLiteral(litB);
        try {
            if (this.equalityFunction.applyOnTerms([myLitA, myLitB], this.internalEvaluator)
                .typedValue) {
                return 0;
            }
            if (this.lessThanFunction.applyOnTerms([myLitA, myLitB], this.internalEvaluator)
                .typedValue) {
                return -1;
            }
            return 1;
        }
        catch {
            // Fallback to string-based comparison
            const compareType = this.comparePrimitives(myLitA.dataType, myLitB.dataType);
            if (compareType !== 0) {
                return compareType;
            }
            return this.comparePrimitives(myLitA.str(), myLitB.str());
        }
    }
    comparePrimitives(valueA, valueB) {
        return valueA === valueB ? 0 : (valueA < valueB ? -1 : 1);
    }
}
exports.TermComparatorExpressionEvaluator = TermComparatorExpressionEvaluator;
//# sourceMappingURL=TermComparatorExpressionEvaluator.js.map