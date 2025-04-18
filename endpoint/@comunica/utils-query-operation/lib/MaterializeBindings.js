"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materializeOperation = exports.materializeTerm = void 0;
const rdf_string_1 = require("rdf-string");
const rdf_terms_1 = require("rdf-terms");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * Materialize a term with the given binding.
 *
 * If the given term is a variable,
 * and that variable exist in the given bindings object,
 * the value of that binding is returned.
 * In all other cases, the term itself is returned.
 *
 * @param {RDF.Term} term A term.
 * @param {Bindings} bindings A bindings object.
 * @return {RDF.Term} The materialized term.
 */
function materializeTerm(term, bindings) {
    if (term.termType === 'Variable') {
        const value = bindings.get(term);
        if (value) {
            return value;
        }
    }
    if (term.termType === 'Quad' && (0, rdf_terms_1.someTermsNested)(term, value => value.termType === 'Variable')) {
        return (0, rdf_terms_1.mapTermsNested)(term, subTerm => materializeTerm(subTerm, bindings));
    }
    return term;
}
exports.materializeTerm = materializeTerm;
/**
 * Materialize the given operation (recursively) with the given bindings.
 * Essentially, the variables in the given operation
 * which don't appear in the projection operation will be replaced
 * by the terms bound to the variables in the given bindings.
 * @param {Algebra.Operation} operation SPARQL algebra operation.
 * And the variables that appear in the projection operation
 * will be added to a new values operation.
 * @param {Bindings} bindings A bindings object.
 * @param algebraFactory The algebra factory.
 * @param bindingsFactory The bindings factory.
 * @param options Options for materializations.
 * @param options.strictTargetVariables If target variable bindings (such as on SELECT or BIND) should not be allowed.
 * @param options.bindFilter If filter expressions should be materialized.
 * @param options.originalBindings The bindings object as it was at the top level call of materializeOperation.
 * @return Algebra.Operation A new operation materialized with the given bindings.
 */
function materializeOperation(operation, bindings, algebraFactory, bindingsFactory, options = {}) {
    options = {
        strictTargetVariables: 'strictTargetVariables' in options ? options.strictTargetVariables : false,
        bindFilter: 'bindFilter' in options ? options.bindFilter : true,
        originalBindings: 'originalBindings' in options ? options.originalBindings : bindings,
    };
    return sparqlalgebrajs_1.Util.mapOperation(operation, {
        path(op, factory) {
            // Materialize variables in a path expression.
            // The predicate expression will be recursed.
            return {
                recurse: false,
                result: Object.assign(factory.createPath(materializeTerm(op.subject, bindings), op.predicate, materializeTerm(op.object, bindings), materializeTerm(op.graph, bindings)), { metadata: op.metadata }),
            };
        },
        pattern(op, factory) {
            // Materialize variables in the quad pattern.
            return {
                recurse: false,
                result: Object.assign(factory.createPattern(materializeTerm(op.subject, bindings), materializeTerm(op.predicate, bindings), materializeTerm(op.object, bindings), materializeTerm(op.graph, bindings)), { metadata: op.metadata }),
            };
        },
        extend(op) {
            // Materialize an extend operation.
            // If strictTargetVariables is true, we throw if the extension target variable is attempted to be bound.
            // Otherwise, we remove the extend operation.
            if (bindings.has(op.variable)) {
                if (options.strictTargetVariables) {
                    throw new Error(`Tried to bind variable ${(0, rdf_string_1.termToString)(op.variable)} in a BIND operator.`);
                }
                else {
                    return {
                        recurse: true,
                        result: materializeOperation(op.input, bindings, algebraFactory, bindingsFactory, options),
                    };
                }
            }
            return {
                recurse: true,
                result: op,
            };
        },
        group(op, factory) {
            // Materialize a group operation.
            // If strictTargetVariables is true, we throw if the group target variable is attempted to be bound.
            // Otherwise, we just filter out the bound variables.
            if (options.strictTargetVariables) {
                for (const variable of op.variables) {
                    if (bindings.has(variable)) {
                        throw new Error(`Tried to bind variable ${(0, rdf_string_1.termToString)(variable)} in a GROUP BY operator.`);
                    }
                }
                return {
                    recurse: true,
                    result: op,
                };
            }
            const variables = op.variables.filter(variable => !bindings.has(variable));
            return {
                recurse: true,
                result: factory.createGroup(op.input, variables, op.aggregates),
            };
        },
        filter(op, factory) {
            const originalBindings = options.originalBindings;
            if (op.expression.expressionType !== 'operator' || originalBindings.size === 0) {
                return {
                    recurse: false,
                    result: op,
                };
            }
            // Make a values clause using all the variables from originalBindings.
            const values = createValuesFromBindings(factory, originalBindings);
            // Recursively materialize the filter expression
            const recursionResultExpression = materializeOperation(op.expression, bindings, algebraFactory, bindingsFactory, options);
            // Recursively materialize the filter input
            let recursionResultInput = materializeOperation(op.input, bindings, algebraFactory, bindingsFactory, options);
            if (values.length > 0) {
                recursionResultInput = factory.createJoin([...values, recursionResultInput]);
            }
            return {
                // Recursion already taken care of above.
                recurse: false,
                result: factory.createFilter(recursionResultInput, recursionResultExpression),
            };
        },
        project(op, factory) {
            // Materialize a project operation.
            // If strictTargetVariables is true, we throw if the project target variable is attempted to be bound.
            // Otherwise, we make a values clause out of the target variable and its value in InitialBindings.
            if (options.strictTargetVariables) {
                for (const variable of op.variables) {
                    if (bindings.has(variable)) {
                        throw new Error(`Tried to bind variable ${(0, rdf_string_1.termToString)(variable)} in a SELECT operator.`);
                    }
                }
                return {
                    recurse: true,
                    result: op,
                };
            }
            // Only include non-projected variables in the bindings that will be passed down recursively.
            // This will result in non-projected variables being replaced with their InitialBindings values.
            for (const bindingKey of bindings.keys()) {
                for (const curVariable of op.variables) {
                    if (curVariable.equals(bindingKey)) {
                        bindings = bindings.delete(bindingKey);
                        break;
                    }
                }
            }
            // Find projected variables which are present in the originalBindings.
            // This will result in projected variables being handled via a values clause.
            const values = createValuesFromBindings(factory, options.originalBindings, op.variables);
            let recursionResult = materializeOperation(op.input, bindings, algebraFactory, bindingsFactory, options);
            if (values.length > 0) {
                recursionResult = factory.createJoin([...values, recursionResult]);
            }
            return {
                recurse: false,
                result: factory.createProject(recursionResult, op.variables),
            };
        },
        values(op, factory) {
            // Materialize a values operation.
            // If strictTargetVariables is true, we throw if the values target variable is attempted to be bound.
            // Otherwise, we just filter out the bound variables and their bindings.
            if (options.strictTargetVariables) {
                for (const variable of op.variables) {
                    if (bindings.has(variable)) {
                        throw new Error(`Tried to bind variable ${(0, rdf_string_1.termToString)(variable)} in a VALUES operator.`);
                    }
                }
            }
            else {
                const variables = op.variables.filter(variable => !bindings.has(variable));
                const valueBindings = op.bindings.map((binding) => {
                    const newBinding = { ...binding };
                    let valid = true;
                    // eslint-disable-next-line unicorn/no-array-for-each
                    bindings.forEach((value, key) => {
                        const keyString = (0, rdf_string_1.termToString)(key);
                        if (keyString in newBinding) {
                            if (!value.equals(newBinding[keyString])) {
                                // If the value of the binding is not equal, remove this binding completely from the VALUES clause
                                valid = false;
                            }
                            delete newBinding[keyString];
                        }
                    });
                    return valid ? newBinding : undefined;
                }).filter(Boolean);
                return {
                    recurse: true,
                    result: factory.createValues(variables, valueBindings),
                };
            }
            return {
                recurse: false,
                result: op,
            };
        },
        expression(op, factory) {
            if (!options.bindFilter) {
                return {
                    recurse: false,
                    result: op,
                };
            }
            if (op.expressionType === 'term') {
                // Materialize a term expression
                return {
                    recurse: false,
                    result: factory.createTermExpression(materializeTerm(op.term, bindings)),
                };
            }
            if (op.expressionType === 'operator') {
                if (op.operator === 'bound' && op.args.length === 1 && op.args[0].expressionType === 'term' &&
                    [...bindings.keys()].some(variable => op.args[0].term.equals(variable))) {
                    return {
                        recurse: false,
                        result: factory.createTermExpression(factory.dataFactory.literal('true', factory.dataFactory.namedNode('http://www.w3.org/2001/XMLSchema#boolean'))),
                    };
                }
                return {
                    recurse: true,
                    result: op,
                };
            }
            if (op.expressionType === 'aggregate' &&
                'variable' in op &&
                bindings.has(op.variable)) {
                // Materialize a bound aggregate operation.
                // If strictTargetVariables is true, we throw if the expression target variable is attempted to be bound.
                // Otherwise, we ignore this operation.
                if (options.strictTargetVariables) {
                    throw new Error(`Tried to bind ${(0, rdf_string_1.termToString)(op.variable)} in a ${op.aggregator} aggregate.`);
                }
                else {
                    return {
                        recurse: true,
                        result: op,
                    };
                }
            }
            return {
                recurse: true,
                result: op,
            };
        },
    }, algebraFactory);
}
exports.materializeOperation = materializeOperation;
/**
 * Make a values operation containing the values that are present in `bindings` for variables present in `variables`.
 * If no `variables` argument is given, this method returns a values operation
 * containing every binding from `bindings`.
 * @param {Factory} factory The Factory used to create the values operation.
 * @param {Bindings} bindings A bindings object.
 * @param {Variable[]} variables A list of variables.
 * @returns Algebra.Values A new values operation the given bindings.
 */
function createValuesFromBindings(factory, bindings, variables) {
    const values = [];
    for (const [variable, binding] of bindings) {
        if (!variables || variables.some(v => v.equals(variable))) {
            const newBinding = { [(0, rdf_string_1.termToString)(variable)]: binding };
            values.push(factory.createValues([variable], [newBinding]));
        }
    }
    return values;
}
//# sourceMappingURL=MaterializeBindings.js.map