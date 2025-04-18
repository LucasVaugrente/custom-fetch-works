"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationPathNps = void 0;
const actor_abstract_path_1 = require("@comunica/actor-abstract-path");
const context_entries_1 = require("@comunica/context-entries");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Path Nps Query Operation Actor.
 */
class ActorQueryOperationPathNps extends actor_abstract_path_1.ActorAbstractPath {
    constructor(args) {
        super(args, sparqlalgebrajs_1.Algebra.types.NPS);
    }
    async runOperation(operation, context) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const predicate = operation.predicate;
        const blank = this.generateVariable(dataFactory, operation);
        const pattern = Object.assign(algebraFactory
            .createPattern(operation.subject, blank, operation.object, operation.graph), { metadata: predicate.metadata });
        const output = (0, utils_query_operation_1.getSafeBindings)(await this.mediatorQueryOperation.mediate({ operation: pattern, context }));
        // Remove the generated blank nodes from the bindings
        const bindingsStream = output.bindingsStream
            .map(bindings => predicate.iris.some(iri => iri.equals(bindings.get(blank))) ? null : bindings.delete(blank));
        return {
            type: 'bindings',
            bindingsStream,
            metadata: output.metadata,
        };
    }
}
exports.ActorQueryOperationPathNps = ActorQueryOperationPathNps;
//# sourceMappingURL=ActorQueryOperationPathNps.js.map