"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SparqlOperator = exports.TypeURL = exports.typedLiteral = exports.TypeAlias = void 0;
const rdf_data_factory_1 = require("rdf-data-factory");
var TypeAlias;
(function (TypeAlias) {
    // Numeric is everything defined in https://www.w3.org/TR/sparql11-query/#operandDataTypes
    TypeAlias["SPARQL_NUMERIC"] = "SPARQL_NUMERIC";
    /**
     * Stringly is everything defined in https://www.w3.org/TR/sparql11-query/#func-strings
     * In other words it is a simple literal, a plain literal with language tag, or a literal with datatype xsd:string
     * In other words, since utils-expression-evaluator transforms a simple literal to xsd_string.
     * It is RDF_LANG_STRING or XSD_STRING.
     * Reasons for this are mentioned here: w3c/sparql-12#112
     */
    TypeAlias["SPARQL_STRINGLY"] = "SPARQL_STRINGLY";
})(TypeAlias || (exports.TypeAlias = TypeAlias = {}));
const DF = new rdf_data_factory_1.DataFactory();
function typedLiteral(value, type) {
    return DF.literal(value, DF.namedNode(type));
}
exports.typedLiteral = typedLiteral;
var TypeURL;
(function (TypeURL) {
    TypeURL["XSD_ANY_URI"] = "http://www.w3.org/2001/XMLSchema#anyURI";
    TypeURL["XSD_STRING"] = "http://www.w3.org/2001/XMLSchema#string";
    TypeURL["RDF_LANG_STRING"] = "http://www.w3.org/1999/02/22-rdf-syntax-ns#langString";
    TypeURL["XSD_BOOLEAN"] = "http://www.w3.org/2001/XMLSchema#boolean";
    TypeURL["XSD_DATE_TIME"] = "http://www.w3.org/2001/XMLSchema#dateTime";
    TypeURL["XSD_DATE_TIME_STAMP"] = "http://www.w3.org/2001/XMLSchema#dateTimeStamp";
    TypeURL["XSD_DATE"] = "http://www.w3.org/2001/XMLSchema#date";
    TypeURL["XSD_G_MONTH"] = "http://www.w3.org/2001/XMLSchema#gMonth";
    TypeURL["XSD_G_MONTHDAY"] = "http://www.w3.org/2001/XMLSchema#gMonthDay";
    TypeURL["XSD_G_YEAR"] = "http://www.w3.org/2001/XMLSchema#gYear";
    TypeURL["XSD_G_YEAR_MONTH"] = "http://www.w3.org/2001/XMLSchema#gYearMonth";
    TypeURL["XSD_TIME"] = "http://www.w3.org/2001/XMLSchema#time";
    TypeURL["XSD_G_DAY"] = "http://www.w3.org/2001/XMLSchema#gDay";
    // Numeric types
    TypeURL["XSD_DECIMAL"] = "http://www.w3.org/2001/XMLSchema#decimal";
    TypeURL["XSD_FLOAT"] = "http://www.w3.org/2001/XMLSchema#float";
    TypeURL["XSD_DOUBLE"] = "http://www.w3.org/2001/XMLSchema#double";
    // Derived numeric types
    TypeURL["XSD_INTEGER"] = "http://www.w3.org/2001/XMLSchema#integer";
    TypeURL["XSD_NON_POSITIVE_INTEGER"] = "http://www.w3.org/2001/XMLSchema#nonPositiveInteger";
    TypeURL["XSD_NEGATIVE_INTEGER"] = "http://www.w3.org/2001/XMLSchema#negativeInteger";
    TypeURL["XSD_LONG"] = "http://www.w3.org/2001/XMLSchema#long";
    TypeURL["XSD_INT"] = "http://www.w3.org/2001/XMLSchema#int";
    TypeURL["XSD_SHORT"] = "http://www.w3.org/2001/XMLSchema#short";
    TypeURL["XSD_BYTE"] = "http://www.w3.org/2001/XMLSchema#byte";
    TypeURL["XSD_NON_NEGATIVE_INTEGER"] = "http://www.w3.org/2001/XMLSchema#nonNegativeInteger";
    TypeURL["XSD_POSITIVE_INTEGER"] = "http://www.w3.org/2001/XMLSchema#positiveInteger";
    TypeURL["XSD_UNSIGNED_LONG"] = "http://www.w3.org/2001/XMLSchema#unsignedLong";
    TypeURL["XSD_UNSIGNED_INT"] = "http://www.w3.org/2001/XMLSchema#unsignedInt";
    TypeURL["XSD_UNSIGNED_SHORT"] = "http://www.w3.org/2001/XMLSchema#unsignedShort";
    TypeURL["XSD_UNSIGNED_BYTE"] = "http://www.w3.org/2001/XMLSchema#unsignedByte";
    // Derived String Type
    TypeURL["XSD_NORMALIZED_STRING"] = "http://www.w3.org/2001/XMLSchema#normalizedString";
    TypeURL["XSD_TOKEN"] = "http://www.w3.org/2001/XMLSchema#token";
    TypeURL["XSD_LANGUAGE"] = "http://www.w3.org/2001/XMLSchema#language";
    TypeURL["XSD_NM_TOKEN"] = "http://www.w3.org/2001/XMLSchema#NMTOKEN";
    TypeURL["XSD_NAME"] = "http://www.w3.org/2001/XMLSchema#name";
    TypeURL["XSD_NC_NAME"] = "http://www.w3.org/2001/XMLSchema#NCName";
    TypeURL["XSD_ENTITY"] = "http://www.w3.org/2001/XMLSchema#ENTITY";
    TypeURL["XSD_ID"] = "http://www.w3.org/2001/XMLSchema#ID";
    TypeURL["XSD_ID_REF"] = "http://www.w3.org/2001/XMLSchema#IDREF";
    // Other types
    TypeURL["XSD_DURATION"] = "http://www.w3.org/2001/XMLSchema#duration";
    TypeURL["XSD_YEAR_MONTH_DURATION"] = "http://www.w3.org/2001/XMLSchema#yearMonthDuration";
    TypeURL["XSD_DAY_TIME_DURATION"] = "http://www.w3.org/2001/XMLSchema#dayTimeDuration";
})(TypeURL || (exports.TypeURL = TypeURL = {}));
// TODO: Remove unneeded double typing
var SparqlOperator;
(function (SparqlOperator) {
    // Operator mapping
    // https://www.w3.org/TR/sparql11-query/#OperatorMapping
    SparqlOperator["NOT"] = "!";
    SparqlOperator["UMINUS"] = "uminus";
    SparqlOperator["UPLUS"] = "uplus";
    SparqlOperator["LOGICAL_OR"] = "||";
    SparqlOperator["LOGICAL_AND"] = "&&";
    SparqlOperator["EQUAL"] = "=";
    SparqlOperator["NOT_EQUAL"] = "!=";
    SparqlOperator["LT"] = "<";
    SparqlOperator["GT"] = ">";
    SparqlOperator["LTE"] = "<=";
    SparqlOperator["GTE"] = ">=";
    SparqlOperator["SAME_TERM"] = "sameterm";
    SparqlOperator["IN"] = "in";
    SparqlOperator["NOT_IN"] = "notin";
    SparqlOperator["MULTIPLICATION"] = "*";
    SparqlOperator["DIVISION"] = "/";
    SparqlOperator["ADDITION"] = "+";
    SparqlOperator["SUBTRACTION"] = "-";
    // Functional Forms
    // https://www.w3.org/TR/sparql11-query/#func-forms
    // See SpecialOperators
    // Functions on RDF Terms
    // https://www.w3.org/TR/sparql11-query/#func-rdfTerms
    SparqlOperator["IS_IRI"] = "isiri";
    SparqlOperator["IS_URI"] = "isuri";
    SparqlOperator["IS_BLANK"] = "isblank";
    SparqlOperator["IS_LITERAL"] = "isliteral";
    SparqlOperator["IS_NUMERIC"] = "isnumeric";
    SparqlOperator["STR"] = "str";
    SparqlOperator["LANG"] = "lang";
    SparqlOperator["DATATYPE"] = "datatype";
    SparqlOperator["IRI"] = "iri";
    SparqlOperator["URI"] = "uri";
    SparqlOperator["BNODE"] = "bnode";
    SparqlOperator["STRDT"] = "strdt";
    SparqlOperator["STRLANG"] = "strlang";
    SparqlOperator["UUID"] = "uuid";
    SparqlOperator["STRUUID"] = "struuid";
    // Functions on strings
    // https://www.w3.org/TR/sparql11-query/#func-strings
    SparqlOperator["STRLEN"] = "strlen";
    SparqlOperator["SUBSTR"] = "substr";
    SparqlOperator["UCASE"] = "ucase";
    SparqlOperator["LCASE"] = "lcase";
    SparqlOperator["STRSTARTS"] = "strstarts";
    SparqlOperator["STRENDS"] = "strends";
    SparqlOperator["CONTAINS"] = "contains";
    SparqlOperator["STRBEFORE"] = "strbefore";
    SparqlOperator["STRAFTER"] = "strafter";
    SparqlOperator["ENCODE_FOR_URI"] = "encode_for_uri";
    SparqlOperator["CONCAT"] = "concat";
    SparqlOperator["LANG_MATCHES"] = "langmatches";
    SparqlOperator["REGEX"] = "regex";
    SparqlOperator["REPLACE"] = "replace";
    // Functions on numerics
    // https://www.w3.org/TR/sparql11-query/#func-numerics
    SparqlOperator["ABS"] = "abs";
    SparqlOperator["ROUND"] = "round";
    SparqlOperator["CEIL"] = "ceil";
    SparqlOperator["FLOOR"] = "floor";
    SparqlOperator["RAND"] = "rand";
    // Functions on Dates and Times
    // https://www.w3.org/TR/sparql11-query/#func-date-time
    SparqlOperator["NOW"] = "now";
    SparqlOperator["YEAR"] = "year";
    SparqlOperator["MONTH"] = "month";
    SparqlOperator["DAY"] = "day";
    SparqlOperator["HOURS"] = "hours";
    SparqlOperator["MINUTES"] = "minutes";
    SparqlOperator["SECONDS"] = "seconds";
    SparqlOperator["TIMEZONE"] = "timezone";
    SparqlOperator["TZ"] = "tz";
    // Hash functions
    // https://www.w3.org/TR/sparql11-query/#func-hash
    SparqlOperator["MD5"] = "md5";
    SparqlOperator["SHA1"] = "sha1";
    SparqlOperator["SHA256"] = "sha256";
    SparqlOperator["SHA384"] = "sha384";
    SparqlOperator["SHA512"] = "sha512";
    // XPath Constructor functions
    // https://www.w3.org/TR/sparql11-query/#FunctionMapping
    // See Named Operators
    // Functions for quoted triples
    // https://w3c.github.io/rdf-star/cg-spec/editors_draft.html#triple-function
    SparqlOperator["TRIPLE"] = "triple";
    SparqlOperator["SUBJECT"] = "subject";
    SparqlOperator["PREDICATE"] = "predicate";
    SparqlOperator["OBJECT"] = "object";
    SparqlOperator["IS_TRIPLE"] = "istriple";
    // Functional Forms
    // https://www.w3.org/TR/sparql11-query/#func-forms
    SparqlOperator["BOUND"] = "bound";
    SparqlOperator["IF"] = "if";
    SparqlOperator["COALESCE"] = "coalesce";
})(SparqlOperator || (exports.SparqlOperator = SparqlOperator = {}));
//# sourceMappingURL=Consts.js.map