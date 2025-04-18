"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorOptimizeQueryOperationRewriteAdd = void 0;
const bus_optimize_query_operation_1 = require("@comunica/bus-optimize-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const rdf_data_factory_1 = require("rdf-data-factory");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
const DF = new rdf_data_factory_1.DataFactory();
/**
 * A comunica Rewrite Add Optimize Query Operation Actor.
 */
class ActorOptimizeQueryOperationRewriteAdd extends bus_optimize_query_operation_1.ActorOptimizeQueryOperation {
    constructor(args) {
        super(args);
    }
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        const operation = sparqlalgebrajs_1.Util.mapOperation(action.operation, {
            [sparqlalgebrajs_1.Algebra.types.ADD](operationOriginal, factory) {
                // CONSTRUCT all quads from the source, and INSERT them into the destination
                const destination = operationOriginal.destination === 'DEFAULT' ?
                    DF.defaultGraph() :
                    operationOriginal.destination;
                const source = operationOriginal.source === 'DEFAULT' ? DF.defaultGraph() : operationOriginal.source;
                const result = factory.createDeleteInsert(undefined, [
                    factory.createPattern(DF.variable('s'), DF.variable('p'), DF.variable('o'), destination),
                ], factory.createPattern(DF.variable('s'), DF.variable('p'), DF.variable('o'), source));
                return {
                    result,
                    recurse: false,
                };
            },
        }, algebraFactory);
        return { operation, context: action.context };
    }
}
exports.ActorOptimizeQueryOperationRewriteAdd = ActorOptimizeQueryOperationRewriteAdd;
//# sourceMappingURL=ActorOptimizeQueryOperationRewriteAdd.js.map