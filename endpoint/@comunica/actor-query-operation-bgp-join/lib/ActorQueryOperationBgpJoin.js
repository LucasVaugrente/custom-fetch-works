"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationBgpJoin = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A [Query Operation](https://github.com/comunica/comunica/tree/master/packages/bus-query-operation) actor
 * that handles SPARQL BGP operations by rewriting it as a join operator.
 */
class ActorQueryOperationBgpJoin extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'bgp');
    }
    async testOperation(_operation, _context) {
        return (0, core_1.passTestVoid)();
    }
    async runOperation(operation, context) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        return this.mediatorQueryOperation.mediate({
            operation: algebraFactory.createJoin(operation.patterns),
            context,
        });
    }
}
exports.ActorQueryOperationBgpJoin = ActorQueryOperationBgpJoin;
//# sourceMappingURL=ActorQueryOperationBgpJoin.js.map