"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationProject = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const utils_data_factory_1 = require("@comunica/utils-data-factory");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
/**
 * A comunica Project Query Operation Actor.
 */
class ActorQueryOperationProject extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'project');
    }
    async testOperation(_operation, _context) {
        return (0, core_1.passTestVoid)();
    }
    async runOperation(operation, context) {
        const dataFactory = context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        // Resolve the input
        const output = (0, utils_query_operation_1.getSafeBindings)(await this.mediatorQueryOperation.mediate({ operation: operation.input, context }));
        // Index variables
        const outputMetadata = await output.metadata();
        const variablesOutputIndexed = Object
            .fromEntries(outputMetadata.variables.map(entry => [entry.variable.value, entry]));
        const variablesOperation = operation.variables.map(v => ({ variable: v, canBeUndef: false }));
        const variablesOperationIndexed = Object
            .fromEntries(variablesOperation.map(entry => [entry.variable.value, entry]));
        // Find all variables that should be deleted from the input stream.
        const deleteVariables = outputMetadata.variables
            .filter(variable => !(variable.variable.value in variablesOperationIndexed));
        // Determine if variables can be undef
        const variablesOutput = variablesOperation.map(variable => ({
            variable: variable.variable,
            canBeUndef: !(variable.variable.value in variablesOutputIndexed) ||
                variablesOutputIndexed[variable.variable.value].canBeUndef,
        }));
        // Make sure the project variables are the only variables that are present in the bindings.
        let bindingsStream = deleteVariables.length === 0 ?
            output.bindingsStream :
            output.bindingsStream.map((bindings) => {
                for (const deleteVariable of deleteVariables) {
                    bindings = bindings.delete(deleteVariable.variable);
                }
                return bindings;
            });
        // Make sure that blank nodes with same labels are not reused over different bindings, as required by SPARQL 1.1.
        // Required for the BNODE() function: https://www.w3.org/TR/sparql11-query/#func-bnode
        // When we have a scoped blank node, make sure the skolemized value is maintained.
        let blankNodeCounter = 0;
        bindingsStream = bindingsStream.map((bindings) => {
            blankNodeCounter++;
            const scopedBlankNodesCache = new Map();
            return bindings.map((term) => {
                if (term instanceof utils_data_factory_1.BlankNodeBindingsScoped) {
                    let scopedBlankNode = scopedBlankNodesCache.get(term.value);
                    if (!scopedBlankNode) {
                        scopedBlankNode = dataFactory.blankNode(`${term.value}${blankNodeCounter}`);
                        scopedBlankNodesCache.set(term.value, scopedBlankNode);
                    }
                    return scopedBlankNode;
                }
                return term;
            });
        });
        return {
            type: 'bindings',
            bindingsStream,
            metadata: async () => ({ ...outputMetadata, variables: variablesOutput }),
        };
    }
}
exports.ActorQueryOperationProject = ActorQueryOperationProject;
//# sourceMappingURL=ActorQueryOperationProject.js.map