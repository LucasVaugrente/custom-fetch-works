"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WildcardCountAggregator = void 0;
const bus_bindings_aggregator_factory_1 = require("@comunica/bus-bindings-aggregator-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
const RdfString = require("rdf-string");
class WildcardCountAggregator extends bus_bindings_aggregator_factory_1.AggregateEvaluator {
    constructor(evaluator, distinct, throwError) {
        super(evaluator, distinct, throwError);
        this.bindingValues = new Map();
        this.state = undefined;
    }
    putTerm(_term) {
        // Do nothing, not needed
    }
    async putBindings(bindings) {
        if (!this.handleDistinct(bindings)) {
            if (this.state === undefined) {
                this.state = 0;
            }
            this.state += 1;
        }
    }
    emptyValueTerm() {
        return (0, utils_expression_evaluator_1.typedLiteral)('0', utils_expression_evaluator_1.TypeURL.XSD_INTEGER);
    }
    termResult() {
        if (this.state === undefined) {
            return this.emptyValue();
        }
        return (0, utils_expression_evaluator_1.typedLiteral)(String(this.state), utils_expression_evaluator_1.TypeURL.XSD_INTEGER);
    }
    /**
     * Returns true if the given bindings should be skipped.
     * @param bindings
     * @private
     */
    handleDistinct(bindings) {
        if (this.distinct) {
            const bindingList = [...bindings];
            bindingList.sort((first, snd) => first[0].value.localeCompare(snd[0].value));
            const variables = bindingList.map(([variable]) => variable.value).join(',');
            const terms = bindingList.map(([, term]) => RdfString.termToString(term)).join(',');
            const set = this.bindingValues.get(variables);
            const result = set !== undefined && set.has(terms);
            // Add to the set:
            if (!set) {
                this.bindingValues.set(variables, new Set());
            }
            this.bindingValues.get(variables).add(terms);
            return result;
        }
        return false;
    }
}
exports.WildcardCountAggregator = WildcardCountAggregator;
//# sourceMappingURL=WildcardCountAggregator.js.map