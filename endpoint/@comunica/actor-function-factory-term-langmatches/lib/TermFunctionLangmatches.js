"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermFunctionLangmatches = void 0;
const bus_function_factory_1 = require("@comunica/bus-function-factory");
const utils_expression_evaluator_1 = require("@comunica/utils-expression-evaluator");
/**
 * https://www.w3.org/TR/sparql11-query/#func-langMatches
 */
class TermFunctionLangmatches extends bus_function_factory_1.TermFunctionBase {
    constructor() {
        super({
            arity: 2,
            operator: utils_expression_evaluator_1.SparqlOperator.LANG_MATCHES,
            overloads: (0, utils_expression_evaluator_1.declare)(utils_expression_evaluator_1.SparqlOperator.LANG_MATCHES)
                .onBinaryTyped([utils_expression_evaluator_1.TypeURL.XSD_STRING, utils_expression_evaluator_1.TypeURL.XSD_STRING], () => (tag, range) => (0, utils_expression_evaluator_1.bool)(TermFunctionLangmatches.langMatches(tag, range))).collect(),
        });
    }
    // TODO: Not an XPath function
    // TODO: Publish as package
    // https://www.ietf.org/rfc/rfc4647.txt
    // https://www.w3.org/TR/sparql11-query/#func-langMatches
    static langMatches(tag, range) {
        const langTags = tag.split('-');
        const rangeTags = range.split('-');
        if (!TermFunctionLangmatches.matchLangTag(rangeTags[0], langTags[0]) &&
            !TermFunctionLangmatches.isWildCard(langTags[0])) {
            return false;
        }
        let lI = 1;
        let rI = 1;
        while (rI < rangeTags.length) {
            if (TermFunctionLangmatches.isWildCard(rangeTags[rI])) {
                rI++;
                continue;
            }
            if (lI === langTags.length) {
                return false;
            }
            if (TermFunctionLangmatches.matchLangTag(rangeTags[rI], langTags[lI])) {
                lI++;
                rI++;
                continue;
            }
            if (langTags[lI].length === 1) {
                return false;
            }
            lI++;
        }
        return true;
    }
    static isWildCard(tag) {
        return tag === '*';
    }
    static matchLangTag(left, right) {
        const matchInitial = new RegExp(`/${left}/`, 'iu');
        return matchInitial.test(`/${right}/`);
    }
}
exports.TermFunctionLangmatches = TermFunctionLangmatches;
//# sourceMappingURL=TermFunctionLangmatches.js.map