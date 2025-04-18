"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationPathZeroOrMore = void 0;
const actor_abstract_path_1 = require("@comunica/actor-abstract-path");
const context_entries_1 = require("@comunica/context-entries");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const asynciterator_1 = require("asynciterator");
const rdf_string_1 = require("rdf-string");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Path ZeroOrMore Query Operation Actor.
 */
class ActorQueryOperationPathZeroOrMore extends actor_abstract_path_1.ActorAbstractPath {
    constructor(args) {
        super(args, sparqlalgebrajs_1.Algebra.types.ZERO_OR_MORE_PATH);
    }
    async runOperation(operation, context) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const bindingsFactory = await utils_bindings_factory_1.BindingsFactory.create(this.mediatorMergeBindingsContext, context, dataFactory);
        const distinct = await this.isPathArbitraryLengthDistinct(algebraFactory, context, operation);
        if (distinct.operation) {
            return distinct.operation;
        }
        context = distinct.context;
        const predicate = operation.predicate;
        const sources = this.getPathSources(predicate);
        const sVar = operation.subject.termType === 'Variable';
        const oVar = operation.object.termType === 'Variable';
        if (operation.subject.termType === 'Variable' && operation.object.termType === 'Variable') {
            // Query ?s ?p ?o, to get all possible namedNodes in de the db
            const predVar = this.generateVariable(dataFactory, operation);
            const single = this.assignPatternSources(algebraFactory, algebraFactory
                .createPattern(operation.subject, predVar, operation.object, operation.graph), sources);
            const results = (0, utils_query_operation_1.getSafeBindings)(await this.mediatorQueryOperation.mediate({ context, operation: single }));
            const subjectVar = operation.subject;
            const objectVar = operation.object;
            // Set with all namedNodes we have already started a predicate* search from
            const entities = new Set();
            const termHashes = {};
            const bindingsStream = new asynciterator_1.MultiTransformIterator(results.bindingsStream, {
                multiTransform: (bindings) => {
                    // Get the subject and object of the triples (?s ?p ?o) and extract graph if it was a variable
                    const subject = bindings.get(subjectVar);
                    const object = bindings.get(objectVar);
                    const graph = operation.graph.termType === 'Variable' ?
                        bindings.get(operation.graph) :
                        operation.graph;
                    // Make a hash of namedNode + graph to remember from where we already started a search
                    const subjectGraphHash = (0, rdf_string_1.termToString)(subject) + (0, rdf_string_1.termToString)(graph);
                    const objectGraphHash = (0, rdf_string_1.termToString)(object) + (0, rdf_string_1.termToString)(graph);
                    return new asynciterator_1.TransformIterator(async () => {
                        // If no new namedNodes in this triple, return nothing
                        if (entities.has(subjectGraphHash) && entities.has(objectGraphHash)) {
                            return new asynciterator_1.EmptyIterator();
                        }
                        // Set up an iterator to which getSubjectAndObjectBindingsPredicateStar will push solutions
                        const it = new asynciterator_1.BufferedIterator();
                        const counter = { count: 0 };
                        // If not started from this namedNode (subject in triple) in this graph, start a search
                        if (!entities.has(subjectGraphHash)) {
                            entities.add(subjectGraphHash);
                            await this.getSubjectAndObjectBindingsPredicateStar(subjectVar, objectVar, subject, subject, predicate.path, graph, context, termHashes, {}, it, counter, algebraFactory, bindingsFactory);
                        }
                        // If not started from this namedNode (object in triple) in this graph, start a search
                        if (!entities.has(objectGraphHash)) {
                            entities.add(objectGraphHash);
                            await this.getSubjectAndObjectBindingsPredicateStar(subjectVar, objectVar, object, object, predicate.path, graph, context, termHashes, {}, it, counter, algebraFactory, bindingsFactory);
                        }
                        return it.transform({
                            transform(item, next, push) {
                                // If the graph was a variable, fill in it's binding (we got it from the ?s ?p ?o binding)
                                if (operation.graph.termType === 'Variable') {
                                    item = item.set(operation.graph, graph);
                                }
                                push(item);
                                next();
                            },
                        });
                    });
                },
            });
            const variables = (operation.graph.termType === 'Variable' ?
                [subjectVar, operation.object, operation.graph] :
                [subjectVar, operation.object])
                .map(variable => ({ variable, canBeUndef: false }));
            return {
                type: 'bindings',
                bindingsStream,
                metadata: async () => ({ ...await results.metadata(), variables }),
            };
        }
        if (!sVar && !oVar) {
            const variable = this.generateVariable(dataFactory);
            const starEval = await this.getObjectsPredicateStarEval(operation.subject, predicate.path, variable, operation.graph, context, true, algebraFactory, bindingsFactory);
            // Check this
            const bindingsStream = starEval.bindingsStream.transform({
                filter: item => operation.object.equals(item.get(variable)),
                transform(item, next, push) {
                    // Return graph binding if graph was a variable, otherwise empty binding
                    const binding = operation.graph.termType === 'Variable' ?
                        bindingsFactory.bindings([[operation.graph, item.get(operation.graph)]]) :
                        bindingsFactory.bindings();
                    push(binding);
                    next();
                },
            });
            return {
                type: 'bindings',
                bindingsStream,
                metadata: async () => ({
                    ...await starEval.metadata(),
                    variables: (operation.graph.termType === 'Variable' ? [operation.graph] : [])
                        .map(variable => ({ variable, canBeUndef: false })),
                }),
            };
        }
        // If (sVar || oVar)
        const subject = sVar ? operation.object : operation.subject;
        const value = (sVar ? operation.subject : operation.object);
        const pred = sVar ? algebraFactory.createInv(predicate.path) : predicate.path;
        const starEval = await this.getObjectsPredicateStarEval(subject, pred, value, operation.graph, context, true, algebraFactory, bindingsFactory);
        const variables = (operation.graph.termType === 'Variable' ? [value, operation.graph] : [value])
            .map(variable => ({ variable, canBeUndef: false }));
        return {
            type: 'bindings',
            bindingsStream: starEval.bindingsStream,
            metadata: async () => ({ ...await starEval.metadata(), variables }),
        };
    }
}
exports.ActorQueryOperationPathZeroOrMore = ActorQueryOperationPathZeroOrMore;
//# sourceMappingURL=ActorQueryOperationPathZeroOrMore.js.map