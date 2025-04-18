"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleAggregator = void 0;
const bus_bindings_aggregator_factory_1 = require("@comunica/bus-bindings-aggregator-factory");
class SampleAggregator extends bus_bindings_aggregator_factory_1.AggregateEvaluator {
    constructor(evaluator, distinct, throwError) {
        super(evaluator, distinct, throwError);
        this.state = undefined;
    }
    putTerm(term) {
        // First value is our sample
        if (this.state === undefined) {
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
exports.SampleAggregator = SampleAggregator;
//# sourceMappingURL=SampleAggregator.js.map