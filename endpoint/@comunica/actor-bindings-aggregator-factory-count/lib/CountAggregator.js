"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountAggregator = void 0;
const bus_bindings_aggregator_factory_1 = require("@comunica/bus-bindings-aggregator-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
class CountAggregator extends bus_bindings_aggregator_factory_1.AggregateEvaluator {
    constructor(evaluator, distinct, throwError) {
        super(evaluator, distinct, throwError);
        this.state = undefined;
    }
    emptyValueTerm() {
        return (0, utils_expression_evaluator_1.typedLiteral)('0', utils_expression_evaluator_1.TypeURL.XSD_INTEGER);
    }
    putTerm(_) {
        if (this.state === undefined) {
            this.state = 0;
        }
        this.state++;
    }
    termResult() {
        if (this.state === undefined) {
            return this.emptyValue();
        }
        return (0, utils_expression_evaluator_1.typedLiteral)(String(this.state), utils_expression_evaluator_1.TypeURL.XSD_INTEGER);
    }
}
exports.CountAggregator = CountAggregator;
//# sourceMappingURL=CountAggregator.js.map