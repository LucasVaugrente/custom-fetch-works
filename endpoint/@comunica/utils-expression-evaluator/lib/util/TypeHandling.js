"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typePromotion = exports.isSubTypeOf = exports.getSuperTypeDict = exports.isInternalSubType = exports.asGeneralType = exports.asOverrideType = exports.asKnownLiteralType = exports.asTypeAlias = exports.typeAliasCheck = exports.extensionTableInit = exports.getSuperTypes = exports.superTypeDictTable = exports.extensionTableInput = void 0;
const expressions_1 = require("../expressions");
const Helpers_1 = require("../functions/Helpers");
const Consts_1 = require("./Consts");
/**
 * Types that are not mentioned just map to 'term'.
 * When editing this, make sure type promotion and substitution don't start interfering.
 * e.g. when saying something like string -> stringly -> anyUri -> term.
 * This would make substitution on types that promote to each other possible. We and the specs don't want that!
 * A DAG will be created based on this. Make sure it doesn't have any cycles!
 */
exports.extensionTableInput = {
    // Datetime types
    [Consts_1.TypeURL.XSD_DATE_TIME_STAMP]: Consts_1.TypeURL.XSD_DATE_TIME,
    // Duration types
    [Consts_1.TypeURL.XSD_DAY_TIME_DURATION]: Consts_1.TypeURL.XSD_DURATION,
    [Consts_1.TypeURL.XSD_YEAR_MONTH_DURATION]: Consts_1.TypeURL.XSD_DURATION,
    // Stringly types
    [Consts_1.TypeURL.RDF_LANG_STRING]: Consts_1.TypeAlias.SPARQL_STRINGLY,
    [Consts_1.TypeURL.XSD_STRING]: Consts_1.TypeAlias.SPARQL_STRINGLY,
    // String types
    [Consts_1.TypeURL.XSD_NORMALIZED_STRING]: Consts_1.TypeURL.XSD_STRING,
    [Consts_1.TypeURL.XSD_TOKEN]: Consts_1.TypeURL.XSD_NORMALIZED_STRING,
    [Consts_1.TypeURL.XSD_LANGUAGE]: Consts_1.TypeURL.XSD_TOKEN,
    [Consts_1.TypeURL.XSD_NM_TOKEN]: Consts_1.TypeURL.XSD_TOKEN,
    [Consts_1.TypeURL.XSD_NAME]: Consts_1.TypeURL.XSD_TOKEN,
    [Consts_1.TypeURL.XSD_NC_NAME]: Consts_1.TypeURL.XSD_NAME,
    [Consts_1.TypeURL.XSD_ENTITY]: Consts_1.TypeURL.XSD_NC_NAME,
    [Consts_1.TypeURL.XSD_ID]: Consts_1.TypeURL.XSD_NC_NAME,
    [Consts_1.TypeURL.XSD_ID_REF]: Consts_1.TypeURL.XSD_NC_NAME,
    // Numeric types
    // https://www.w3.org/TR/sparql11-query/#operandDataTypes
    // > numeric denotes typed literals with datatypes xsd:integer, xsd:decimal, xsd:float, and xsd:double
    [Consts_1.TypeURL.XSD_DOUBLE]: Consts_1.TypeAlias.SPARQL_NUMERIC,
    [Consts_1.TypeURL.XSD_FLOAT]: Consts_1.TypeAlias.SPARQL_NUMERIC,
    [Consts_1.TypeURL.XSD_DECIMAL]: Consts_1.TypeAlias.SPARQL_NUMERIC,
    // Decimal types
    [Consts_1.TypeURL.XSD_INTEGER]: Consts_1.TypeURL.XSD_DECIMAL,
    [Consts_1.TypeURL.XSD_NON_POSITIVE_INTEGER]: Consts_1.TypeURL.XSD_INTEGER,
    [Consts_1.TypeURL.XSD_NEGATIVE_INTEGER]: Consts_1.TypeURL.XSD_NON_POSITIVE_INTEGER,
    [Consts_1.TypeURL.XSD_LONG]: Consts_1.TypeURL.XSD_INTEGER,
    [Consts_1.TypeURL.XSD_INT]: Consts_1.TypeURL.XSD_LONG,
    [Consts_1.TypeURL.XSD_SHORT]: Consts_1.TypeURL.XSD_INT,
    [Consts_1.TypeURL.XSD_BYTE]: Consts_1.TypeURL.XSD_SHORT,
    [Consts_1.TypeURL.XSD_NON_NEGATIVE_INTEGER]: Consts_1.TypeURL.XSD_INTEGER,
    [Consts_1.TypeURL.XSD_POSITIVE_INTEGER]: Consts_1.TypeURL.XSD_NON_NEGATIVE_INTEGER,
    [Consts_1.TypeURL.XSD_UNSIGNED_LONG]: Consts_1.TypeURL.XSD_NON_NEGATIVE_INTEGER,
    [Consts_1.TypeURL.XSD_UNSIGNED_INT]: Consts_1.TypeURL.XSD_UNSIGNED_LONG,
    [Consts_1.TypeURL.XSD_UNSIGNED_SHORT]: Consts_1.TypeURL.XSD_UNSIGNED_INT,
    [Consts_1.TypeURL.XSD_UNSIGNED_BYTE]: Consts_1.TypeURL.XSD_UNSIGNED_SHORT,
    [Consts_1.TypeURL.XSD_DATE_TIME]: 'term',
    [Consts_1.TypeURL.XSD_BOOLEAN]: 'term',
    [Consts_1.TypeURL.XSD_DATE]: 'term',
    [Consts_1.TypeURL.XSD_G_MONTH]: 'term',
    [Consts_1.TypeURL.XSD_G_MONTHDAY]: 'term',
    [Consts_1.TypeURL.XSD_G_YEAR]: 'term',
    [Consts_1.TypeURL.XSD_G_YEAR_MONTH]: 'term',
    [Consts_1.TypeURL.XSD_TIME]: 'term',
    [Consts_1.TypeURL.XSD_G_DAY]: 'term',
    [Consts_1.TypeURL.XSD_DURATION]: 'term',
    [Consts_1.TypeAlias.SPARQL_NUMERIC]: 'term',
    [Consts_1.TypeAlias.SPARQL_STRINGLY]: 'term',
    [Consts_1.TypeURL.XSD_ANY_URI]: 'term',
};
exports.superTypeDictTable = Object.create(null);
/**
 * This will return the super types of a type and cache them.
 * @param type IRI we will decide the super types of.
 * @param openWorldType the enabler that provides a way to find super types.
 */
function getSuperTypes(type, openWorldType) {
    const cached = openWorldType.cache.get(type);
    if (cached) {
        return cached;
    }
    const value = openWorldType.discoverer(type);
    if (value === 'term') {
        const res = Object.create(null);
        res.__depth = 0;
        res[type] = 0;
        openWorldType.cache.set(type, res);
        return res;
    }
    let subExtension;
    const knownValue = asKnownLiteralType(value);
    if (knownValue) {
        subExtension = { ...exports.superTypeDictTable[knownValue] };
    }
    else {
        subExtension = { ...getSuperTypes(value, openWorldType) };
    }
    subExtension.__depth++;
    subExtension[type] = subExtension.__depth;
    openWorldType.cache.set(type, subExtension);
    return subExtension;
}
exports.getSuperTypes = getSuperTypes;
// No circular structure allowed! & No other keys allowed!
function extensionTableInit() {
    for (const [_key, value] of Object.entries(exports.extensionTableInput)) {
        const key = _key;
        if (exports.superTypeDictTable[key]) {
            continue;
        }
        extensionTableBuilderInitKey(key, value, exports.superTypeDictTable);
    }
}
exports.extensionTableInit = extensionTableInit;
extensionTableInit();
function extensionTableBuilderInitKey(key, value, res) {
    if (value === 'term' || value === undefined) {
        const baseRes = Object.create(null);
        baseRes.__depth = 0;
        baseRes[key] = 0;
        res[key] = baseRes;
        return;
    }
    if (!res[value]) {
        extensionTableBuilderInitKey(value, exports.extensionTableInput[value], res);
    }
    res[key] = { ...res[value], [key]: res[value].__depth + 1, __depth: res[value].__depth + 1 };
}
exports.typeAliasCheck = Object.create(null);
function initTypeAliasCheck() {
    for (const val of Object.values(Consts_1.TypeAlias)) {
        exports.typeAliasCheck[val] = true;
    }
}
initTypeAliasCheck();
function asTypeAlias(type) {
    if (type in exports.typeAliasCheck) {
        return type;
    }
    return undefined;
}
exports.asTypeAlias = asTypeAlias;
function asKnownLiteralType(type) {
    if (type in exports.superTypeDictTable) {
        return type;
    }
    return undefined;
}
exports.asKnownLiteralType = asKnownLiteralType;
function asOverrideType(type) {
    if (asKnownLiteralType(type) ?? type === 'term') {
        return type;
    }
    return undefined;
}
exports.asOverrideType = asOverrideType;
function asGeneralType(type) {
    if (type === 'term' || (0, expressions_1.asTermType)(type)) {
        return type;
    }
    return undefined;
}
exports.asGeneralType = asGeneralType;
/**
 * Internal type of @see isSubTypeOf This only takes knownTypes but doesn't need an enabler
 */
function isInternalSubType(baseType, argumentType) {
    return baseType !== 'term' &&
        (exports.superTypeDictTable[baseType] && exports.superTypeDictTable[baseType][argumentType] !== undefined);
}
exports.isInternalSubType = isInternalSubType;
/**
 * This function can be used to check the base type is a restriction on a type in the dict.
 * If we want to check if type x is a restriction on string we do this by calling:
 * 'http://www.w3.org/2001/XMLSchema#string' in getSuperTypeDict(X, superTypeProvider)
 * @param baseType
 * @param superTypeProvider
 */
function getSuperTypeDict(baseType, superTypeProvider) {
    const concreteType = asKnownLiteralType(baseType);
    if (concreteType) {
        // Concrete dataType is known by utils-expression-evaluator.
        return exports.superTypeDictTable[concreteType];
    }
    // Datatype is a custom datatype
    return getSuperTypes(baseType, superTypeProvider);
}
exports.getSuperTypeDict = getSuperTypeDict;
/**
 * This function needs to be O(1)! The execution time of this function is vital!
 * We define typeA isSubtypeOf typeA as true.
 * If you find yourself using this function a lot (e.g. in a case) please use getSuperTypeDict instead.
 * @param baseType type you want to provide.
 * @param argumentType type you want to provide @param baseType to.
 * @param superTypeProvider the enabler to discover super types of unknown types.
 */
function isSubTypeOf(baseType, argumentType, superTypeProvider) {
    if (baseType === 'term') {
        return false;
    }
    return getSuperTypeDict(baseType, superTypeProvider)[argumentType] !== undefined;
}
exports.isSubTypeOf = isSubTypeOf;
// Defined by https://www.w3.org/TR/xpath-31/#promotion .
// e.g. When a function takes a string, it can also accept a XSD_ANY_URI if it's cast first.
exports.typePromotion = {
    [Consts_1.TypeURL.XSD_STRING]: [
        { typeToPromote: Consts_1.TypeURL.XSD_ANY_URI, conversionFunction: arg => (0, Helpers_1.string)(arg.str()) },
    ],
    [Consts_1.TypeURL.XSD_DOUBLE]: [
        { typeToPromote: Consts_1.TypeURL.XSD_FLOAT, conversionFunction: arg => (0, Helpers_1.double)(arg.typedValue) },
        // TODO: in case of decimal a round needs to happen.
        { typeToPromote: Consts_1.TypeURL.XSD_DECIMAL, conversionFunction: arg => (0, Helpers_1.double)(arg.typedValue) },
    ],
    [Consts_1.TypeURL.XSD_FLOAT]: [
        // TODO: in case of decimal a round needs to happen.
        { typeToPromote: Consts_1.TypeURL.XSD_DECIMAL, conversionFunction: arg => (0, Helpers_1.float)(arg.typedValue) },
    ],
};
//# sourceMappingURL=TypeHandling.js.map