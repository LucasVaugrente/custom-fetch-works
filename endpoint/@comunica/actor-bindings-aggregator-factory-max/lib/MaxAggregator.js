"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxAggregator = void 0;
const bus_bindings_aggregator_factory_1 = require("@comunica/bus-bindings-aggregator-factory");
class MaxAggregator extends bus_bindings_aggregator_factory_1.AggregateEvaluator {
    constructor(evaluator, distinct, orderByEvaluator, throwError) {
        super(evaluator, distinct, throwError);
        this.orderByEvaluator = orderByEvaluator;
        this.state = undefined;
    }
    putTerm(term) {
        if (term.termType !== 'Literal') {
            throw new Error(`Term with value ${term.value} has type ${term.termType} and is not a literal`);
        }
        if (this.state === undefined) {
            this.state = term;
        }
        else if (this.orderByEvaluator.orderTypes(this.state, term) === -1) {
            this.state = term;
        }
    }
    termResult() {
        if (this.state === undefined) {
            return this.emptyValue();
        }
        return this.state;
    }
}
exports.MaxAggregator = MaxAggregator;
//# sourceMappingURL=MaxAggregator.js.map