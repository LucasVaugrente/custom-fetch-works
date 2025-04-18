"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationService = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_bindings_factory_1 = require("@comunica/utils-bindings-factory");
const utils_metadata_1 = require("@comunica/utils-metadata");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const asynciterator_1 = require("asynciterator");
/**
 * A comunica Service Query Operation Actor.
 * It unwraps the SERVICE operation and executes it on the given source.
 */
class ActorQueryOperationService extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'service');
    }
    async testOperation(operation, _context) {
        if (operation.name.termType !== 'NamedNode') {
            return (0, core_1.failTest)(`${this.name} can only query services by IRI, while a ${operation.name.termType} was given.`);
        }
        return (0, core_1.passTestVoid)();
    }
    async runOperation(operation, context) {
        // Identify the SERVICE target as query source
        const { querySource } = await this.mediatorQuerySourceIdentify.mediate({
            querySourceUnidentified: {
                value: operation.name.value,
                type: this.forceSparqlEndpoint ? 'sparql' : undefined,
            },
            context,
        });
        // Attach the source to the operation, and execute
        let output;
        try {
            output = (0, utils_query_operation_1.getSafeBindings)(await this.mediatorQueryOperation.mediate({
                operation: (0, utils_query_operation_1.assignOperationSource)(operation.input, querySource),
                context,
            }));
        }
        catch (error) {
            if (operation.silent) {
                // Emit a single empty binding
                const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
                const bindingsFactory = await utils_bindings_factory_1.BindingsFactory.create(this.mediatorMergeBindingsContext, context, dataFactory);
                output = {
                    bindingsStream: new asynciterator_1.SingletonIterator(bindingsFactory.bindings()),
                    type: 'bindings',
                    metadata: async () => ({
                        state: new utils_metadata_1.MetadataValidationState(),
                        cardinality: { type: 'exact', value: 1 },
                        variables: [],
                    }),
                };
                this.logWarn(context, `An error occurred when executing a SERVICE clause: ${error.message}`);
            }
            else {
                throw error;
            }
        }
        return output;
    }
}
exports.ActorQueryOperationService = ActorQueryOperationService;
//# sourceMappingURL=ActorQueryOperationService.js.map