"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationPathOneOrMore = void 0;
const actor_abstract_path_1 = require("@comunica/actor-abstract-path");
const context_entries_1 = require("@comunica/context-entries");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const asynciterator_1 = require("asynciterator");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Path OneOrMore Query Operation Actor.
 */
class ActorQueryOperationPathOneOrMore extends actor_abstract_path_1.ActorAbstractPath {
    constructor(args) {
        super(args, sparqlalgebrajs_1.Algebra.types.ONE_OR_MORE_PATH);
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
        if (operation.subject.termType !== 'Variable' && operation.object.termType === 'Variable') {
            const objectVar = operation.object;
            const starEval = await this.getObjectsPredicateStarEval(operation.subject, predicate.path, objectVar, operation.graph, context, false, algebraFactory, bindingsFactory);
            const variables = (operation.graph.termType === 'Variable' ? [objectVar, operation.graph] : [objectVar])
                .map(variable => ({ variable, canBeUndef: false }));
            return {
                type: 'bindings',
                bindingsStream: starEval.bindingsStream,
                metadata: async () => ({ ...await starEval.metadata(), variables }),
            };
        }
        if (operation.subject.termType === 'Variable' && operation.object.termType === 'Variable') {
            // Get all the results of subjects with same predicate, but once, then fill in first variable for those
            const single = algebraFactory.createDistinct(algebraFactory.createPath(operation.subject, operation.predicate.path, operation.object, operation.graph));
            const results = (0, utils_query_operation_1.getSafeBindings)(await this.mediatorQueryOperation.mediate({ context, operation: single }));
            const subjectVar = operation.subject;
            const objectVar = operation.object;
            const termHashes = {};
            const bindingsStream = new asynciterator_1.MultiTransformIterator(results.bindingsStream, {
                multiTransform: (bindings) => {
                    const subject = bindings.get(subjectVar);
                    const object = bindings.get(objectVar);
                    const graph = operation.graph.termType === 'Variable' ? bindings.get(operation.graph) : operation.graph;
                    return new asynciterator_1.TransformIterator(async () => {
                        const it = new asynciterator_1.BufferedIterator();
                        await this.getSubjectAndObjectBindingsPredicateStar(subjectVar, objectVar, subject, object, predicate.path, graph, context, termHashes, {}, it, { count: 0 }, algebraFactory, bindingsFactory);
                        return it.transform({
                            transform(item, next, push) {
                                if (operation.graph.termType === 'Variable') {
                                    item = item.set(operation.graph, graph);
                                }
                                push(item);
                                next();
                            },
                        });
                    }, { maxBufferSize: 128 });
                },
                autoStart: false,
            });
            const variables = (operation.graph.termType === 'Variable' ?
                [subjectVar, objectVar, operation.graph] :
                [subjectVar, objectVar])
                .map(variable => ({ variable, canBeUndef: false }));
            return {
                type: 'bindings',
                bindingsStream,
                metadata: async () => ({ ...await results.metadata(), variables }),
            };
        }
        if (operation.subject.termType === 'Variable' && operation.object.termType !== 'Variable') {
            return this.mediatorQueryOperation.mediate({
                context,
                operation: algebraFactory.createPath(operation.object, algebraFactory.createOneOrMorePath(algebraFactory.createInv(predicate.path)), operation.subject, operation.graph),
            });
        }
        // If (!sVar && !oVar)
        const variable = this.generateVariable(dataFactory);
        const results = (0, utils_query_operation_1.getSafeBindings)(await this.mediatorQueryOperation.mediate({
            context,
            operation: algebraFactory.createPath(operation.subject, predicate, variable, operation.graph),
        }));
        const bindingsStream = results.bindingsStream.transform({
            filter: item => operation.object.equals(item.get(variable)),
            transform(item, next, push) {
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
                ...await results.metadata(),
                variables: (operation.graph.termType === 'Variable' ? [operation.graph] : [])
                    .map(variable => ({ variable, canBeUndef: false })),
            }),
        };
    }
}
exports.ActorQueryOperationPathOneOrMore = ActorQueryOperationPathOneOrMore;
//# sourceMappingURL=ActorQueryOperationPathOneOrMore.js.map