"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationUpdateDeleteInsert = void 0;
const actor_query_operation_construct_1 = require("@comunica/actor-query-operation-construct");
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const asynciterator_1 = require("asynciterator");
/**
 * A comunica Update DeleteInsert Query Operation Actor.
 */
class ActorQueryOperationUpdateDeleteInsert extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'deleteinsert');
        this.blankNodeCounter = 0;
    }
    async testOperation(operation, context) {
        return (0, utils_query_operation_1.testReadOnly)(context);
    }
    async runOperation(operation, context) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const bindingsFactory = await utils_bindings_factory_1.BindingsFactory.create(this.mediatorMergeBindingsContext, context, dataFactory);
        // Evaluate the where clause
        const whereBindings = operation.where ?
            (0, utils_query_operation_1.getSafeBindings)(await this.mediatorQueryOperation
                .mediate({ operation: operation.where, context })).bindingsStream :
            new asynciterator_1.ArrayIterator([bindingsFactory.bindings()], { autoStart: false });
        // Construct triples using the result based on the pattern.
        let quadStreamInsert;
        let quadStreamDelete;
        if (operation.insert) {
            // Localize blank nodes in pattern, to avoid clashes across different INSERT/DELETE calls
            quadStreamInsert = new actor_query_operation_construct_1.BindingsToQuadsIterator(dataFactory, operation.insert.map(actor_query_operation_construct_1.BindingsToQuadsIterator.localizeQuad.bind(null, dataFactory, this.blankNodeCounter)), whereBindings.clone());
            this.blankNodeCounter++;
        }
        if (operation.delete) {
            // Localize blank nodes in pattern, to avoid clashes across different INSERT/DELETE calls
            quadStreamDelete = new actor_query_operation_construct_1.BindingsToQuadsIterator(dataFactory, operation.delete.map(actor_query_operation_construct_1.BindingsToQuadsIterator.localizeQuad.bind(null, dataFactory, this.blankNodeCounter)), whereBindings.clone());
            this.blankNodeCounter++;
        }
        // Evaluate the required modifications
        const { execute } = await this.mediatorUpdateQuads.mediate({
            quadStreamInsert,
            quadStreamDelete,
            context,
        });
        return {
            type: 'void',
            execute,
        };
    }
}
exports.ActorQueryOperationUpdateDeleteInsert = ActorQueryOperationUpdateDeleteInsert;
//# sourceMappingURL=ActorQueryOperationUpdateDeleteInsert.js.map