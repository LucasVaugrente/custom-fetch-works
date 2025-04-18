"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationPathInv = void 0;
const actor_abstract_path_1 = require("@comunica/actor-abstract-path");
const context_entries_1 = require("@comunica/context-entries");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A comunica Path Inv Query Operation Actor.
 */
class ActorQueryOperationPathInv extends actor_abstract_path_1.ActorAbstractPath {
    constructor(args) {
        super(args, sparqlalgebrajs_1.Algebra.types.INV);
    }
    async runOperation(operation, context) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const predicate = operation.predicate;
        const invPath = algebraFactory.createPath(operation.object, predicate.path, operation.subject, operation.graph);
        return this.mediatorQueryOperation.mediate({ operation: invPath, context });
    }
}
exports.ActorQueryOperationPathInv = ActorQueryOperationPathInv;
//# sourceMappingURL=ActorQueryOperationPathInv.js.map