"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorOptimizeQueryOperationDescribeToConstructsSubject = void 0;
const bus_optimize_query_operation_1 = require("@comunica/bus-optimize-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Describe To Constructs Subject Optimize Query Operation Actor.
 */
class ActorOptimizeQueryOperationDescribeToConstructsSubject extends bus_optimize_query_operation_1.ActorOptimizeQueryOperation {
    constructor(args) {
        super(args);
    }
    async test(action) {
        if (action.operation.type !== sparqlalgebrajs_1.Algebra.types.DESCRIBE) {
            return (0, core_1.failTest)(`Actor ${this.name} only supports describe operations, but got ${action.operation.type}`);
        }
        return (0, core_1.passTest)(true);
    }
    async run(action) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const operationOriginal = action.operation;
        // Create separate construct queries for all non-variable terms
        const operations = operationOriginal.terms
            .filter(term => term.termType !== 'Variable')
            .map((term) => {
            // Transform each term to a separate construct operation with S ?p ?o patterns (BGP) for all terms
            const patterns = [
                dataFactory.quad(term, dataFactory.variable('__predicate'), dataFactory.variable('__object')),
            ];
            // eslint-disable-next-line unicorn/no-array-for-each
            patterns.forEach((templatePattern) => templatePattern.type = 'pattern');
            const templateOperation = {
                type: sparqlalgebrajs_1.Algebra.types.BGP,
                patterns: patterns,
            };
            // Create a construct query
            return {
                input: templateOperation,
                template: patterns,
                type: 'construct',
            };
        });
        // If we have variables in the term list,
        // create one separate construct operation to determine these variables using the input pattern.
        if (operations.length !== operationOriginal.terms.length) {
            let variablePatterns = [];
            operationOriginal.terms
                .filter(term => term.termType === 'Variable')
                // eslint-disable-next-line unicorn/no-array-for-each
                .forEach((term, i) => {
                // Transform each term to an S ?p ?o pattern in a non-conflicting way
                const patterns = [
                    dataFactory.quad(term, dataFactory.variable(`__predicate${i}`), dataFactory.variable(`__object${i}`)),
                ];
                // eslint-disable-next-line unicorn/no-array-for-each
                patterns.forEach((templatePattern) => templatePattern.type = 'pattern');
                variablePatterns = [...variablePatterns, ...patterns];
            });
            // Add a single construct for the variables
            // This requires a join between the input pattern and our variable patterns that form a simple BGP
            operations.push({
                input: {
                    type: sparqlalgebrajs_1.Algebra.types.JOIN,
                    input: [
                        operationOriginal.input,
                        { type: sparqlalgebrajs_1.Algebra.types.BGP, patterns: variablePatterns },
                    ],
                },
                template: variablePatterns,
                type: sparqlalgebrajs_1.Algebra.types.CONSTRUCT,
            });
        }
        // Union the construct operations
        const operation = algebraFactory.createUnion(operations, false);
        return { operation, context: action.context };
    }
}
exports.ActorOptimizeQueryOperationDescribeToConstructsSubject = ActorOptimizeQueryOperationDescribeToConstructsSubject;
//# sourceMappingURL=ActorOptimizeQueryOperationDescribeToConstructsSubject.js.map