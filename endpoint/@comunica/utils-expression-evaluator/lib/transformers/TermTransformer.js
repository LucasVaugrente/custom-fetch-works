"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermTransformer = void 0;
const RDFString = require("rdf-string");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
const E = require("../expressions");
const Consts_1 = require("../util/Consts");
const Err = require("../util/Errors");
const Errors_1 = require("../util/Errors");
const Parsing_1 = require("../util/Parsing");
const P = require("../util/Parsing");
const TypeHandling_1 = require("../util/TypeHandling");
class TermTransformer {
    constructor(superTypeProvider) {
        this.superTypeProvider = superTypeProvider;
    }
    /**
     * Transforms an RDF term to the internal representation of a term,
     * assuming it is not a variable, which would be an expression (internally).
     *
     * @param term RDF term to transform into internal representation of a term
     */
    transformRDFTermUnsafe(term) {
        return this.transformTerm({
            term,
            type: sparqlalgebrajs_1.Algebra.types.EXPRESSION,
            expressionType: sparqlalgebrajs_1.Algebra.expressionTypes.TERM,
        });
    }
    transformTerm(term) {
        if (!term.term) {
            throw new Err.InvalidExpression(term);
        }
        switch (term.term.termType) {
            case 'Variable':
                return new E.Variable(RDFString.termToString(term.term));
            case 'Literal':
                return this.transformLiteral(term.term);
            case 'NamedNode':
                return new E.NamedNode(term.term.value);
            case 'BlankNode':
                return new E.BlankNode(term.term.value);
            case 'Quad':
                return new E.Quad(this.transformRDFTermUnsafe(term.term.subject), this.transformRDFTermUnsafe(term.term.predicate), this.transformRDFTermUnsafe(term.term.object), this.transformRDFTermUnsafe(term.term.graph));
            case 'DefaultGraph':
                return new E.DefaultGraph();
        }
    }
    /**
     * @param lit the rdf literal we want to transform to an internal Literal expression.
     */
    transformLiteral(lit) {
        // Both here and within the switch we transform to LangStringLiteral or StringLiteral.
        // We do this when we detect a simple literal being used.
        // Original issue regarding this behaviour: https://github.com/w3c/sparql-12/issues/112
        if (!lit.datatype || [null, undefined, ''].includes(lit.datatype.value)) {
            return lit.language ?
                new E.LangStringLiteral(lit.value, lit.language) :
                new E.StringLiteral(lit.value);
        }
        const dataType = lit.datatype.value;
        const superTypeDict = (0, TypeHandling_1.getSuperTypeDict)(dataType, this.superTypeProvider);
        // The order of checking matters! Check most specific types first!
        try {
            if (Consts_1.TypeURL.XSD_STRING in superTypeDict) {
                return new E.StringLiteral(lit.value, dataType);
            }
            if (Consts_1.TypeURL.RDF_LANG_STRING in superTypeDict) {
                return new E.LangStringLiteral(lit.value, lit.language);
            }
            if (Consts_1.TypeURL.XSD_YEAR_MONTH_DURATION in superTypeDict) {
                return new E.YearMonthDurationLiteral((0, Parsing_1.parseYearMonthDuration)(lit.value), lit.value, dataType);
            }
            if (Consts_1.TypeURL.XSD_DAY_TIME_DURATION in superTypeDict) {
                return new E.DayTimeDurationLiteral((0, Parsing_1.parseDayTimeDuration)(lit.value), lit.value, dataType);
            }
            if (Consts_1.TypeURL.XSD_DURATION in superTypeDict) {
                return new E.DurationLiteral((0, Parsing_1.parseDuration)(lit.value), lit.value, dataType);
            }
            if (Consts_1.TypeURL.XSD_DATE_TIME in superTypeDict) {
                const dateVal = new Date(lit.value);
                if (Number.isNaN(dateVal.getTime())) {
                    return new E.NonLexicalLiteral(undefined, dataType, this.superTypeProvider, lit.value);
                }
                return new E.DateTimeLiteral((0, Parsing_1.parseDateTime)(lit.value), lit.value, dataType);
            }
            if (Consts_1.TypeURL.XSD_DATE in superTypeDict) {
                return new E.DateLiteral((0, Parsing_1.parseDate)(lit.value), lit.value, dataType);
            }
            if (Consts_1.TypeURL.XSD_TIME in superTypeDict) {
                return new E.TimeLiteral((0, Parsing_1.parseTime)(lit.value), lit.value, dataType);
            }
            if (Consts_1.TypeURL.XSD_BOOLEAN in superTypeDict) {
                if (lit.value !== 'true' && lit.value !== 'false' && lit.value !== '1' && lit.value !== '0') {
                    return new E.NonLexicalLiteral(undefined, dataType, this.superTypeProvider, lit.value);
                }
                return new E.BooleanLiteral(lit.value === 'true' || lit.value === '1', lit.value);
            }
            if (Consts_1.TypeURL.XSD_DECIMAL in superTypeDict) {
                const intVal = P.parseXSDDecimal(lit.value);
                if (intVal === undefined) {
                    return new E.NonLexicalLiteral(undefined, dataType, this.superTypeProvider, lit.value);
                }
                if (Consts_1.TypeURL.XSD_INTEGER in superTypeDict) {
                    return new E.IntegerLiteral(intVal, dataType, lit.value);
                }
                // If type is not an integer it's just a decimal.
                return new E.DecimalLiteral(intVal, dataType, lit.value);
            }
            const isFloat = Consts_1.TypeURL.XSD_FLOAT in superTypeDict;
            const isDouble = Consts_1.TypeURL.XSD_DOUBLE in superTypeDict;
            if (isFloat || isDouble) {
                const doubleVal = P.parseXSDFloat(lit.value);
                if (doubleVal === undefined) {
                    return new E.NonLexicalLiteral(undefined, dataType, this.superTypeProvider, lit.value);
                }
                if (isFloat) {
                    return new E.FloatLiteral(doubleVal, dataType, lit.value);
                }
                return new E.DoubleLiteral(doubleVal, dataType, lit.value);
            }
            return new E.Literal(lit.value, dataType, lit.value);
        }
        catch (error) {
            if ((0, Errors_1.isExpressionError)(error)) {
                return new E.NonLexicalLiteral(undefined, dataType, this.superTypeProvider, lit.value);
            }
            throw error;
        }
    }
}
exports.TermTransformer = TermTransformer;
//# sourceMappingURL=TermTransformer.js.map