"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupConcatAggregator = void 0;
const bus_bindings_aggregator_factory_1 = require("@comunica/bus-bindings-aggregator-factory");
const Eval = require("@comunica/utils-expression-evaluator");
class GroupConcatAggregator extends bus_bindings_aggregator_factory_1.AggregateEvaluator {
    constructor(evaluator, distinct, dataFactory, separator, throwError) {
        super(evaluator, distinct, throwError);
        this.dataFactory = dataFactory;
        this.state = undefined;
        this.lastLanguageValid = true;
        this.lastLanguage = undefined;
        this.separator = separator ?? ' ';
    }
    emptyValueTerm() {
        return Eval.typedLiteral('', Eval.TypeURL.XSD_STRING);
    }
    putTerm(term) {
        if (this.state === undefined) {
            this.state = term.value;
            if (term.termType === 'Literal') {
                this.lastLanguage = term.language;
            }
        }
        else {
            this.state += this.separator + term.value;
            if (this.lastLanguageValid && term.termType === 'Literal' && this.lastLanguage !== term.language) {
                this.lastLanguageValid = false;
                this.lastLanguage = undefined;
            }
        }
    }
    termResult() {
        if (this.state === undefined) {
            return this.emptyValue();
        }
        if (this.lastLanguageValid && this.lastLanguage) {
            return Eval.langString(this.state, this.lastLanguage).toRDF(this.dataFactory);
        }
        return Eval.typedLiteral(this.state, Eval.TypeURL.XSD_STRING);
    }
}
exports.GroupConcatAggregator = GroupConcatAggregator;
//# sourceMappingURL=GroupConcatAggregator.js.map