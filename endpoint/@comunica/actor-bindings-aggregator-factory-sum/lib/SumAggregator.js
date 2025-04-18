"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SumAggregator = void 0;
const bus_bindings_aggregator_factory_1 = require("@comunica/bus-bindings-aggregator-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class SumAggregator extends bus_bindings_aggregator_factory_1.AggregateEvaluator {
    constructor(evaluator, distinct, dataFactory, additionFunction, throwError) {
        super(evaluator, distinct, throwError);
        this.dataFactory = dataFactory;
        this.additionFunction = additionFunction;
        this.state = undefined;
    }
    emptyValueTerm() {
        return (0, utils_expression_evaluator_1.typedLiteral)('0', utils_expression_evaluator_1.TypeURL.XSD_INTEGER);
    }
    putTerm(term) {
        if (this.state === undefined) {
            this.state = this.termToNumericOrError(term);
        }
        else {
            const internalTerm = this.termToNumericOrError(term);
            this.state = this.additionFunction.applyOnTerms([this.state, internalTerm], this.evaluator);
        }
    }
    termResult() {
        if (this.state === undefined) {
            return this.emptyValue();
        }
        return this.state.toRDF(this.dataFactory);
    }
}
exports.SumAggregator = SumAggregator;
//# sourceMappingURL=SumAggregator.js.map