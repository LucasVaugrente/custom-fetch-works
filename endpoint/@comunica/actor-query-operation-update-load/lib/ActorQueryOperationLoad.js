"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationLoad = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
/**
 * A [Query Operation](https://github.com/comunica/comunica/tree/master/packages/bus-query-operation) actor
 * that handles SPARQL load operations.
 */
class ActorQueryOperationLoad extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'load');
    }
    async testOperation(operation, context) {
        return (0, utils_query_operation_1.testReadOnly)(context);
    }
    async runOperation(operation, context) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const algebraFactory = new sparqlalgebrajs_1.Factory(dataFactory);
        // Determine query source
        let subContext = context;
        if (operation.silent) {
            subContext = subContext.set(context_entries_1.KeysInitQuery.lenient, true);
        }
        const { querySource } = await this.mediatorQuerySourceIdentify.mediate({
            querySourceUnidentified: { value: operation.source.value },
            context: subContext,
        });
        // Create CONSTRUCT query on the given source
        const output = (0, utils_query_operation_1.getSafeQuads)(await this.mediatorQueryOperation.mediate({
            operation: algebraFactory.createConstruct((0, utils_query_operation_1.assignOperationSource)(algebraFactory.createPattern(dataFactory.variable('s'), dataFactory.variable('p'), dataFactory.variable('o')), querySource), [algebraFactory
                    .createPattern(dataFactory.variable('s'), dataFactory.variable('p'), dataFactory.variable('o'))]),
            context: subContext,
        }));
        // Determine quad stream to insert
        let quadStream = output.quadStream;
        if (operation.destination) {
            quadStream = quadStream
                .map(quad => dataFactory.quad(quad.subject, quad.predicate, quad.object, operation.destination));
        }
        // Insert quad stream
        const { execute } = await this.mediatorUpdateQuads.mediate({
            quadStreamInsert: quadStream,
            context,
        });
        return {
            type: 'void',
            execute,
        };
    }
}
exports.ActorQueryOperationLoad = ActorQueryOperationLoad;
//# sourceMappingURL=ActorQueryOperationLoad.js.map