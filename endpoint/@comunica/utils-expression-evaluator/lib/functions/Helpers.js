"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressionToVar = exports.dateTime = exports.langString = exports.string = exports.double = exports.float = exports.decimal = exports.integer = exports.bool = exports.Builder = exports.declare = void 0;
/**
 * These helpers provide a (albeit inflexible) DSL for writing function
 * definitions for the SPARQL functions.
 */
const context_entries_1 = require("@comunica/context-entries");
const E = require("../expressions");
const expressions_1 = require("../expressions");
const C = require("../util/Consts");
const Consts_1 = require("../util/Consts");
const Err = require("../util/Errors");
const OverloadTree_1 = require("./OverloadTree");
function declare(identifier) {
    return new Builder(identifier);
}
exports.declare = declare;
class Builder {
    constructor(identifier) {
        this.overloadTree = new OverloadTree_1.OverloadTree(identifier);
        this.collected = false;
    }
    collect() {
        if (this.collected) {
            // Only 1 time allowed because we can't copy a tree. (And we don't need this).
            throw new Error('Builders can only be collected once!');
        }
        this.collected = true;
        return this.overloadTree;
    }
    static wrapInvalidLexicalProtected(func) {
        return (expressionEvaluator) => (args) => {
            for (const [index, arg] of args.entries()) {
                if (arg instanceof expressions_1.NonLexicalLiteral) {
                    throw new Err.InvalidLexicalForm(args[index].toRDF(expressionEvaluator.context.getSafe(context_entries_1.KeysInitQuery.dataFactory)));
                }
            }
            return func(expressionEvaluator)(args);
        };
    }
    set(argTypes, func, addInvalidHandling = true) {
        this.overloadTree.addOverload(argTypes, addInvalidHandling ? Builder.wrapInvalidLexicalProtected(func) : func);
        return this;
    }
    copy({ from, to }) {
        const impl = this.overloadTree.getImplementationExact(from);
        if (!impl) {
            throw new Err.UnexpectedError('Tried to copy implementation, but types not found', { from, to });
        }
        return this.set(to, impl);
    }
    onUnary(type, op, addInvalidHandling = true) {
        return this.set([type], expressionEvaluator => ([val]) => op(expressionEvaluator)(val), addInvalidHandling);
    }
    onUnaryTyped(type, op, addInvalidHandling = true) {
        return this.set([type], expressionEvaluator => ([val]) => op(expressionEvaluator)(val.typedValue), addInvalidHandling);
    }
    onBinary(types, op, addInvalidHandling = true) {
        return this.set(types, expressionEvaluator => ([left, right]) => op(expressionEvaluator)(left, right), addInvalidHandling);
    }
    onBinaryTyped(types, op, addInvalidHandling = true) {
        return this.set(types, expressionEvaluator => ([left, right]) => op(expressionEvaluator)(left.typedValue, right.typedValue), addInvalidHandling);
    }
    onTernaryTyped(types, op, addInvalidHandling = true) {
        return this.set(types, expressionEvaluator => ([a1, a2, a3]) => op(expressionEvaluator)(a1.typedValue, a2.typedValue, a3.typedValue), addInvalidHandling);
    }
    onTernary(types, op, addInvalidHandling = true) {
        return this.set(types, expressionEvaluator => ([a1, a2, a3]) => op(expressionEvaluator)(a1, a2, a3), addInvalidHandling);
    }
    onQuaternaryTyped(types, op, addInvalidHandling = true) {
        return this.set(types, expressionEvaluator => ([a1, a2, a3, a4]) => op(expressionEvaluator)(a1.typedValue, a2.typedValue, a3.typedValue, a4.typedValue), addInvalidHandling);
    }
    onTerm1(op, addInvalidHandling = false) {
        return this.set(['term'], expressionEvaluator => ([term]) => op(expressionEvaluator)(term), addInvalidHandling);
    }
    onTerm3(op) {
        return this.set(['term', 'term', 'term'], expressionEvaluator => ([t1, t2, t3]) => op(expressionEvaluator)(t1, t2, t3));
    }
    onQuad1(op) {
        return this.set(['quad'], expressionEvaluator => ([term]) => op(expressionEvaluator)(term));
    }
    onLiteral1(op, addInvalidHandling = true) {
        return this.set(['literal'], expressionEvaluator => ([term]) => op(expressionEvaluator)(term), addInvalidHandling);
    }
    onBoolean1(op, addInvalidHandling = true) {
        return this.set([C.TypeURL.XSD_BOOLEAN], expressionEvaluator => ([lit]) => op(expressionEvaluator)(lit), addInvalidHandling);
    }
    onBoolean1Typed(op, addInvalidHandling = true) {
        return this.set([C.TypeURL.XSD_BOOLEAN], expressionEvaluator => ([lit]) => op(expressionEvaluator)(lit.typedValue), addInvalidHandling);
    }
    onString1(op, addInvalidHandling = true) {
        return this.set([C.TypeURL.XSD_STRING], expressionEvaluator => ([lit]) => op(expressionEvaluator)(lit), addInvalidHandling);
    }
    onString1Typed(op, addInvalidHandling = true) {
        return this.set([C.TypeURL.XSD_STRING], expressionEvaluator => ([lit]) => op(expressionEvaluator)(lit.typedValue), addInvalidHandling);
    }
    onLangString1(op, addInvalidHandling = true) {
        return this.set([C.TypeURL.RDF_LANG_STRING], expressionEvaluator => ([lit]) => op(expressionEvaluator)(lit), addInvalidHandling);
    }
    onStringly1(op, addInvalidHandling = true) {
        return this.set([C.TypeAlias.SPARQL_STRINGLY], expressionEvaluator => ([lit]) => op(expressionEvaluator)(lit), addInvalidHandling);
    }
    onStringly1Typed(op, addInvalidHandling = true) {
        return this.set([C.TypeAlias.SPARQL_STRINGLY], expressionEvaluator => ([lit]) => op(expressionEvaluator)(lit.typedValue), addInvalidHandling);
    }
    onNumeric1(op, addInvalidHandling = true) {
        return this.set([C.TypeAlias.SPARQL_NUMERIC], expressionEvaluator => ([val]) => op(expressionEvaluator)(val), addInvalidHandling);
    }
    onDateTime1(op, addInvalidHandling = true) {
        return this
            .set([C.TypeURL.XSD_DATE_TIME], expressionEvaluator => ([val]) => op(expressionEvaluator)(val), addInvalidHandling);
    }
    /**
     * We return the base types and not the provided types because we don't want to create invalid terms.
     * Providing negative number to a function unary - for example should not
     * return a term of type negative number having a positive value.
     * @param op the numeric operator performed
     * @param addInvalidHandling whether to add invalid handling,
     *   whether to add @param op in @see wrapInvalidLexicalProtected
     */
    numericConverter(op, addInvalidHandling = true) {
        const evalHelper = (expressionEvaluator) => (arg) => op(expressionEvaluator)(arg.typedValue);
        return this.onUnary(Consts_1.TypeURL.XSD_INTEGER, expressionEvaluator => arg => integer(evalHelper(expressionEvaluator)(arg)), addInvalidHandling)
            .onUnary(Consts_1.TypeURL.XSD_DECIMAL, expressionEvaluator => arg => decimal(evalHelper(expressionEvaluator)(arg)), addInvalidHandling)
            .onUnary(Consts_1.TypeURL.XSD_FLOAT, expressionEvaluator => arg => float(evalHelper(expressionEvaluator)(arg)), addInvalidHandling)
            .onUnary(Consts_1.TypeURL.XSD_DOUBLE, expressionEvaluator => arg => double(evalHelper(expressionEvaluator)(arg)), addInvalidHandling);
    }
    /**
     * !!! Be aware when using this function, it will create different overloads with different return types !!!
     * Arithmetic operators take 2 numeric arguments, and return a single numerical
     * value. The type of the return value is heavily dependent on the types of the
     * input arguments. In JS everything is a double, but in SPARQL it is not.
     *
     * The different arguments are handled by type promotion and subtype substitution.
     * The way numeric function arguments work is described here:
     * https://www.w3.org/TR/xpath20/#mapping
     * Above url is referenced in the sparql spec: https://www.w3.org/TR/sparql11-query/#OperatorMapping
     */
    arithmetic(op, addInvalidHandling = true) {
        const evalHelper = (expressionEvaluator) => (left, right) => op(expressionEvaluator)(left.typedValue, right.typedValue);
        return this.onBinary([Consts_1.TypeURL.XSD_INTEGER, Consts_1.TypeURL.XSD_INTEGER], expressionEvaluator => (left, right) => integer(evalHelper(expressionEvaluator)(left, right)), addInvalidHandling)
            .onBinary([Consts_1.TypeURL.XSD_DECIMAL, Consts_1.TypeURL.XSD_DECIMAL], expressionEvaluator => (left, right) => decimal(evalHelper(expressionEvaluator)(left, right)), addInvalidHandling)
            .onBinary([Consts_1.TypeURL.XSD_FLOAT, Consts_1.TypeURL.XSD_FLOAT], expressionEvaluator => (left, right) => float(evalHelper(expressionEvaluator)(left, right)), addInvalidHandling)
            .onBinary([Consts_1.TypeURL.XSD_DOUBLE, Consts_1.TypeURL.XSD_DOUBLE], expressionEvaluator => (left, right) => double(evalHelper(expressionEvaluator)(left, right)), addInvalidHandling);
    }
    numberTest(test) {
        return this.numeric(expressionEvaluator => ([left, right]) => {
            const result = test(expressionEvaluator)(left.typedValue, right.typedValue);
            return bool(result);
        });
    }
    stringTest(test, addInvalidHandling = true) {
        return this
            .set([C.TypeURL.XSD_STRING, C.TypeURL.XSD_STRING], expressionEvaluator => ([left, right]) => {
            const result = test(expressionEvaluator)(left.typedValue, right.typedValue);
            return bool(result);
        }, addInvalidHandling);
    }
    booleanTest(test, addInvalidHandling = true) {
        return this
            .set([C.TypeURL.XSD_BOOLEAN, C.TypeURL.XSD_BOOLEAN], expressionEvaluator => ([left, right]) => {
            const result = test(expressionEvaluator)(left.typedValue, right.typedValue);
            return bool(result);
        }, addInvalidHandling);
    }
    dateTimeTest(test, addInvalidHandling = true) {
        return this
            .set([C.TypeURL.XSD_DATE_TIME, C.TypeURL.XSD_DATE_TIME], expressionEvaluator => ([left, right]) => {
            const result = test(expressionEvaluator)(left.typedValue, right.typedValue);
            return bool(result);
        }, addInvalidHandling);
    }
    numeric(op) {
        return this.set([C.TypeAlias.SPARQL_NUMERIC, C.TypeAlias.SPARQL_NUMERIC], op);
    }
}
exports.Builder = Builder;
// ----------------------------------------------------------------------------
// Literal Construction helpers
// ----------------------------------------------------------------------------
function bool(val) {
    return new E.BooleanLiteral(val);
}
exports.bool = bool;
function integer(num) {
    return new E.IntegerLiteral(num);
}
exports.integer = integer;
function decimal(num) {
    return new E.DecimalLiteral(num);
}
exports.decimal = decimal;
function float(num) {
    return new E.FloatLiteral(num);
}
exports.float = float;
function double(num) {
    return new E.DoubleLiteral(num);
}
exports.double = double;
function string(str) {
    return new E.StringLiteral(str);
}
exports.string = string;
function langString(str, lang) {
    return new E.LangStringLiteral(str, lang);
}
exports.langString = langString;
function dateTime(date, str) {
    return new E.DateTimeLiteral(date, str);
}
exports.dateTime = dateTime;
function expressionToVar(dataFactory, variableExpression) {
    return dataFactory.variable(variableExpression.name.slice(1));
}
exports.expressionToVar = expressionToVar;
//# sourceMappingURL=Helpers.js.map