"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationFromQuad = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica From Query Operation Actor.
 */
class ActorQueryOperationFromQuad extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'from');
    }
    /**
     * Create a deep copy of the given operation.
     * @param {Operation} operation An operation.
     * @param {(subOperation: Operation) => Operation} recursiveCb A callback for recursive operation calls.
     * @return {Operation} The copied operation.
     */
    static copyOperation(operation, recursiveCb) {
        const copiedOperation = {};
        for (const key of Object.keys(operation)) {
            if (Array.isArray(operation[key]) && key !== 'template') {
                // We exclude the 'template' entry, as we don't want to modify the template value of construct operations
                if (key === 'variables') {
                    copiedOperation[key] = operation[key];
                }
                else {
                    copiedOperation[key] = operation[key].map(recursiveCb);
                }
            }
            else if (ActorQueryOperationFromQuad.ALGEBRA_TYPES.includes(operation[key].type)) {
                copiedOperation[key] = recursiveCb(operation[key]);
            }
            else {
                copiedOperation[key] = operation[key];
            }
        }
        return copiedOperation;
    }
    /**
     * Recursively transform the given operation to use the given graphs as default graph
     * This will (possibly) create a new operation and not modify the given operation.
     * @package
     * @param algebraFactory The algebra factory.
     * @param {Operation} operation An operation.
     * @param {RDF.Term[]} defaultGraphs Graph terms.
     * @return {Operation} A new operation.
     */
    static applyOperationDefaultGraph(algebraFactory, operation, defaultGraphs) {
        // If the operation is a BGP or Path, change the graph.
        if ((operation.type === 'bgp' && operation.patterns.length > 0) ||
            operation.type === 'path' ||
            operation.type === 'pattern') {
            if (operation.type === 'bgp') {
                return ActorQueryOperationFromQuad
                    .joinOperations(algebraFactory, operation.patterns.map((pattern) => {
                    if (pattern.graph.termType !== 'DefaultGraph') {
                        return algebraFactory.createBgp([pattern]);
                    }
                    const bgps = defaultGraphs.map((graph) => algebraFactory.createBgp([Object.assign(algebraFactory
                            .createPattern(pattern.subject, pattern.predicate, pattern.object, graph), { metadata: pattern.metadata })]));
                    return ActorQueryOperationFromQuad.unionOperations(algebraFactory, bgps);
                }));
            }
            if (operation.graph.termType !== 'DefaultGraph') {
                return operation;
            }
            const paths = defaultGraphs.map((graph) => {
                if (operation.type === 'path') {
                    return algebraFactory
                        .createPath(operation.subject, operation.predicate, operation.object, graph);
                }
                return Object.assign(algebraFactory
                    .createPattern(operation.subject, operation.predicate, operation.object, graph), { metadata: operation.metadata });
            });
            return ActorQueryOperationFromQuad.unionOperations(algebraFactory, paths);
        }
        return ActorQueryOperationFromQuad.copyOperation(operation, (subOperation) => this.applyOperationDefaultGraph(algebraFactory, subOperation, defaultGraphs));
    }
    /**
     * Recursively transform the given operation to use the given graphs as named graph
     * This will (possibly) create a new operation and not modify the given operation.
     * @package
     * @param algebraFactory The algebra factory.
     * @param {Operation} operation An operation.
     * @param {RDF.Term[]} namedGraphs Graph terms.
     * @param {RDF.Term[]} defaultGraphs Default graph terms.
     * @return {Operation} A new operation.
     */
    static applyOperationNamedGraph(algebraFactory, operation, namedGraphs, defaultGraphs) {
        // If the operation is a BGP or Path, change the graph.
        if ((operation.type === 'bgp' && operation.patterns.length > 0) ||
            operation.type === 'path' ||
            operation.type === 'pattern') {
            const patternGraph = operation.type === 'bgp' ? operation.patterns[0].graph : operation.graph;
            if (patternGraph.termType === 'DefaultGraph') {
                // SPARQL spec (8.2) describes that when FROM NAMED's are used without a FROM, the default graph must be empty.
                // The FROMs are transformed before this step to a named node, so this will not apply to this case anymore.
                return { type: sparqlalgebrajs_1.Algebra.types.BGP, patterns: [] };
            }
            if (patternGraph.termType === 'Variable') {
                if (namedGraphs.length === 1) {
                    const graph = namedGraphs[0];
                    // If the pattern graph is a variable, replace the graph and bind the variable using VALUES
                    const bindings = {};
                    bindings[`?${patternGraph.value}`] = graph;
                    const values = algebraFactory
                        .createValues([patternGraph], [bindings]);
                    let pattern;
                    if (operation.type === 'bgp') {
                        pattern = algebraFactory
                            .createBgp(operation.patterns.map((pat) => algebraFactory
                            .createPattern(pat.subject, pat.predicate, pat.object, graph)));
                    }
                    else if (operation.type === 'path') {
                        pattern = algebraFactory
                            .createPath(operation.subject, operation.predicate, operation.object, graph);
                    }
                    else {
                        pattern = algebraFactory
                            .createPattern(operation.subject, operation.predicate, operation.object, graph);
                    }
                    return algebraFactory.createJoin([values, pattern]);
                }
                // If the pattern graph is a variable, take the union of the pattern applied to each available named graph
                return ActorQueryOperationFromQuad.unionOperations(algebraFactory, namedGraphs.map((graph) => ActorQueryOperationFromQuad.applyOperationNamedGraph(algebraFactory, operation, [graph], defaultGraphs)));
            }
            // The pattern's graph is defined (including the default graphs)
            const isNamedGraphAvailable = [...namedGraphs, ...defaultGraphs].some((namedGraph) => namedGraph.equals(patternGraph));
            if (isNamedGraphAvailable) {
                // Return the pattern as-is if the pattern's graph was selected in a FROM NAMED
                return operation;
            }
            // No-op if the pattern's graph was not selected in a FROM NAMED.
            return { type: sparqlalgebrajs_1.Algebra.types.BGP, patterns: [] };
        }
        return ActorQueryOperationFromQuad.copyOperation(operation, (subOperation) => this
            .applyOperationNamedGraph(algebraFactory, subOperation, namedGraphs, defaultGraphs));
    }
    /**
     * Transform the given array of operations into a join operation.
     * @package
     * @param algebraFactory The algebra factory.
     * @param {Operation[]} operations An array of operations, must contain at least one operation.
     * @return {Join} A join operation.
     */
    static joinOperations(algebraFactory, operations) {
        if (operations.length === 1) {
            return operations[0];
        }
        if (operations.length > 1) {
            return algebraFactory.createJoin(operations);
        }
        throw new Error('A join can only be applied on at least one operation');
    }
    /**
     * Transform the given array of operations into a union operation.
     * @package
     * @param algebraFactory The algebra factory.
     * @param {Operation[]} operations An array of operations, must contain at least one operation.
     * @return {Union} A union operation.
     */
    static unionOperations(algebraFactory, operations) {
        if (operations.length === 1) {
            return operations[0];
        }
        if (operations.length > 1) {
            return algebraFactory.createUnion(operations);
        }
        throw new Error('A union can only be applied on at least one operation');
    }
    /**
     * Transform an operation based on the default and named graphs in the pattern.
     *
     * FROM sets the default graph.
     * If multiple are available, take the union of the operation for all of them at quad-pattern level.
     *
     * FROM NAMED indicates which named graphs are available.
     * This will rewrite the query so that only triples from the given named graphs can be selected.
     *
     * @package
     * @param algebraFactory The algebra factory.
     * @param {From} pattern A from operation.
     * @return {Operation} The transformed operation.
     */
    static createOperation(algebraFactory, pattern) {
        let operation = pattern.input;
        if (pattern.default.length > 0) {
            operation = ActorQueryOperationFromQuad.applyOperationDefaultGraph(algebraFactory, operation, pattern.default);
        }
        if (pattern.named.length > 0 || pattern.default.length > 0) {
            operation = ActorQueryOperationFromQuad
                .applyOperationNamedGraph(algebraFactory, operation, pattern.named, pattern.default);
        }
        return operation;
    }
    async testOperation(_operation, _context) {
        return (0, core_1.passTestVoid)();
    }
    async runOperation(operationOriginal, context) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const operation = ActorQueryOperationFromQuad.createOperation(algebraFactory, operationOriginal);
        return this.mediatorQueryOperation.mediate({ operation, context });
    }
}
exports.ActorQueryOperationFromQuad = ActorQueryOperationFromQuad;
ActorQueryOperationFromQuad.ALGEBRA_TYPES = Object.keys(sparqlalgebrajs_1.Algebra.types).map(key => sparqlalgebrajs_1.Algebra.types[key]);
//# sourceMappingURL=ActorQueryOperationFromQuad.js.map