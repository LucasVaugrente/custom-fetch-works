"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationPathAlt = void 0;
const actor_abstract_path_1 = require("@comunica/actor-abstract-path");
const actor_query_operation_union_1 = require("@comunica/actor-query-operation-union");
const context_entries_1 = require("@comunica/context-entries");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const asynciterator_1 = require("asynciterator");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Path Alt Query Operation Actor.
 */
class ActorQueryOperationPathAlt extends actor_abstract_path_1.ActorAbstractPath {
    constructor(args) {
        super(args, sparqlalgebrajs_1.Algebra.types.ALT);
    }
    async runOperation(operation, context) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const predicate = operation.predicate;
        const subOperations = (await Promise.all(predicate.input
            .map(subPredicate => this.mediatorQueryOperation.mediate({
            context,
            operation: algebraFactory.createPath(operation.subject, subPredicate, operation.object, operation.graph),
        }))))
            .map(utils_query_operation_1.getSafeBindings);
        const bindingsStream = new asynciterator_1.UnionIterator(subOperations.map(op => op.bindingsStream), { autoStart: false });
        const metadata = () => Promise.all(subOperations.map(output => output.metadata()))
            .then(subMeta => actor_query_operation_union_1.ActorQueryOperationUnion
            .unionMetadata(subMeta, true, context, this.mediatorRdfMetadataAccumulate));
        return {
            type: 'bindings',
            bindingsStream,
            metadata,
        };
    }
}
exports.ActorQueryOperationPathAlt = ActorQueryOperationPathAlt;
//# sourceMappingURL=ActorQueryOperationPathAlt.js.map