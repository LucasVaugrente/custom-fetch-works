"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationDrop = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
/**
 * A [Query Operation](https://github.com/comunica/comunica/tree/master/packages/bus-query-operation) actor
 * that handles SPARQL drop operations.
 */
class ActorQueryOperationDrop extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'drop');
    }
    async testOperation(operation, context) {
        return (0, utils_query_operation_1.testReadOnly)(context);
    }
    async runOperation(operation, context) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        // Delegate to update-quads bus
        let graphs;
        if (operation.source === 'DEFAULT') {
            graphs = dataFactory.defaultGraph();
        }
        else if (typeof operation.source === 'string') {
            graphs = operation.source;
        }
        else {
            graphs = [operation.source];
        }
        const { execute } = await this.mediatorUpdateQuads.mediate({
            deleteGraphs: {
                graphs,
                requireExistence: !operation.silent,
                dropGraphs: true,
            },
            context,
        });
        return {
            type: 'void',
            execute,
        };
    }
}
exports.ActorQueryOperationDrop = ActorQueryOperationDrop;
//# sourceMappingURL=ActorQueryOperationDrop.js.map