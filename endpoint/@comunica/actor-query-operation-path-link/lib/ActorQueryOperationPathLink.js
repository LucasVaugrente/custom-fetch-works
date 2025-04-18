"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationPathLink = void 0;
const actor_abstract_path_1 = require("@comunica/actor-abstract-path");
const context_entries_1 = require("@comunica/context-entries");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Path Link Query Operation Actor.
 */
class ActorQueryOperationPathLink extends actor_abstract_path_1.ActorAbstractPath {
    constructor(args) {
        super(args, sparqlalgebrajs_1.Algebra.types.LINK);
    }
    async runOperation(operationOriginal, context) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const predicate = operationOriginal.predicate;
        const operation = Object.assign(algebraFactory.createPattern(operationOriginal.subject, predicate.iri, operationOriginal.object, operationOriginal.graph), { metadata: predicate.metadata });
        return this.mediatorQueryOperation.mediate({ operation, context });
    }
}
exports.ActorQueryOperationPathLink = ActorQueryOperationPathLink;
//# sourceMappingURL=ActorQueryOperationPathLink.js.map