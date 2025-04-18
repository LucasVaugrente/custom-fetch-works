"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AverageAggregator = void 0;
const bus_bindings_aggregator_factory_1 = require("@comunica/bus-bindings-aggregator-factory");
const Eval = require("@comunica/utils-expression-evaluator");
class AverageAggregator extends bus_bindings_aggregator_factory_1.AggregateEvaluator {
    constructor(evaluator, distinct, dataFactory, additionFunction, divisionFunction, throwError) {
        super(evaluator, distinct, throwError);
        this.dataFactory = dataFactory;
        this.additionFunction = additionFunction;
        this.divisionFunction = divisionFunction;
        this.state = undefined;
    }
    emptyValueTerm() {
        return Eval.typedLiteral('0', Eval.TypeURL.XSD_INTEGER);
    }
    putTerm(term) {
        if (this.state === undefined) {
            const sum = this.termToNumericOrError(term);
            this.state = { sum, count: 1 };
        }
        else {
            const internalTerm = this.termToNumericOrError(term);
            this.state.sum = this.additionFunction
                .applyOnTerms([this.state.sum, internalTerm], this.evaluator);
            this.state.count++;
        }
    }
    termResult() {
        if (this.state === undefined) {
            return this.emptyValue();
        }
        const count = new Eval.IntegerLiteral(this.state.count);
        const result = this.divisionFunction.applyOnTerms([this.state.sum, count], this.evaluator);
        return result.toRDF(this.dataFactory);
    }
}
exports.AverageAggregator = AverageAggregator;
//# sourceMappingURL=AverageAggregator.js.map