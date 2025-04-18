"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationCreate = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
/**
 * A [Query Operation](https://github.com/comunica/comunica/tree/master/packages/bus-query-operation) actor that
 * handles SPARQL create operations.
 */
class ActorQueryOperationCreate extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'create');
    }
    async testOperation(operation, context) {
        return (0, utils_query_operation_1.testReadOnly)(context);
    }
    async runOperation(operation, context) {
        // Delegate to update-quads bus
        const { execute } = await this.mediatorUpdateQuads.mediate({
            createGraphs: {
                graphs: [operation.source],
                requireNonExistence: !operation.silent,
            },
            context,
        });
        return {
            type: 'void',
            execute,
        };
    }
}
exports.ActorQueryOperationCreate = ActorQueryOperationCreate;
//# sourceMappingURL=ActorQueryOperationCreate.js.map