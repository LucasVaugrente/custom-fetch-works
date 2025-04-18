"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationUnion = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const core_1 = require("@comunica/core");
const utils_metadata_1 = require("@comunica/utils-metadata");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const asynciterator_1 = require("asynciterator");
/**
 * A comunica Union Query Operation Actor.
 */
class ActorQueryOperationUnion extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'union');
    }
    /**
     * Takes the union of the given double array variables.
     * Uniqueness is guaranteed.
     * @param {string[][]} variables Double array of variables to take the union of.
     * @return {string[]} The union of the given variables.
     */
    static unionVariables(variables) {
        const variablesIndexed = {};
        for (const variablesA of variables) {
            for (const variable of variablesA) {
                if (!variablesIndexed[variable.variable.value]) {
                    variablesIndexed[variable.variable.value] = {
                        variable: variable.variable,
                        canBeUndef: variable.canBeUndef,
                        occurrences: 0,
                    };
                }
                const entry = variablesIndexed[variable.variable.value];
                entry.canBeUndef = entry.canBeUndef || variable.canBeUndef;
                entry.occurrences++;
            }
        }
        return Object.values(variablesIndexed)
            .map(entry => entry.occurrences === variables.length ?
            { variable: entry.variable, canBeUndef: entry.canBeUndef } :
            { variable: entry.variable, canBeUndef: true });
    }
    /**
     * Takes the union of the given metadata array.
     * It will ensure that the cardinality metadata value is properly calculated.
     * @param {{[p: string]: any}[]} metadatas Array of metadata.
     * @param bindings If the union of the variables field should also be taken.
     * @param context The action context
     * @param mediatorRdfMetadataAccumulate Mediator for metadata accumulation
     * @return {{[p: string]: any}} Union of the metadata.
     */
    static async unionMetadata(metadatas, bindings, context, mediatorRdfMetadataAccumulate) {
        let accumulatedMetadata = (await mediatorRdfMetadataAccumulate
            .mediate({ mode: 'initialize', context })).metadata;
        // Accumulate cardinality
        for (const appendingMetadata of metadatas) {
            accumulatedMetadata = {
                ...appendingMetadata,
                ...(await mediatorRdfMetadataAccumulate
                    .mediate({
                    mode: 'append',
                    accumulatedMetadata: accumulatedMetadata,
                    appendingMetadata: appendingMetadata,
                    context,
                })).metadata,
            };
        }
        // Create new metadata state
        accumulatedMetadata.state = new utils_metadata_1.MetadataValidationState();
        // Propagate metadata invalidations
        const invalidateListener = () => accumulatedMetadata.state.invalidate();
        for (const metadata of metadatas) {
            metadata.state.addInvalidateListener(invalidateListener);
        }
        // Union variables
        if (bindings) {
            const variables = metadatas.map(metadata => metadata.variables);
            accumulatedMetadata.variables = ActorQueryOperationUnion.unionVariables(variables);
        }
        return accumulatedMetadata;
    }
    async testOperation(_operation, _context) {
        return (0, core_1.passTestVoid)();
    }
    async runOperation(operation, context) {
        // Determine the type over which we are taking a union
        const outputsRaw = await Promise.all(operation.input
            .map(subOperation => this.mediatorQueryOperation.mediate({ operation: subOperation, context })));
        let outputType;
        for (const output of outputsRaw) {
            if (outputType === undefined) {
                outputType = output.type;
            }
            else if (outputType !== output.type) {
                throw new Error(`Unable to union ${outputType} and ${output.type}`);
            }
        }
        // Handle bindings
        if (outputType === 'bindings' || operation.input.length === 0) {
            const outputs = outputsRaw.map(utils_query_operation_1.getSafeBindings);
            const bindingsStream = new asynciterator_1.UnionIterator(outputs.map((output) => output.bindingsStream), { autoStart: false });
            const metadata = () => Promise.all(outputs.map(output => output.metadata()))
                .then(subMeta => ActorQueryOperationUnion
                .unionMetadata(subMeta, true, context, this.mediatorRdfMetadataAccumulate));
            return { type: 'bindings', bindingsStream, metadata };
        }
        // Handle quads
        if (outputType === 'quads') {
            const outputs = outputsRaw.map(utils_query_operation_1.getSafeQuads);
            const quadStream = new asynciterator_1.UnionIterator(outputs.map((output) => output.quadStream), { autoStart: false });
            const metadata = () => Promise.all(outputs.map(output => output.metadata()))
                .then(subMeta => ActorQueryOperationUnion
                .unionMetadata(subMeta, false, context, this.mediatorRdfMetadataAccumulate));
            return { type: 'quads', quadStream, metadata };
        }
        // Throw otherwise
        throw new Error(`Unable to union ${outputType}`);
    }
}
exports.ActorQueryOperationUnion = ActorQueryOperationUnion;
//# sourceMappingURL=ActorQueryOperationUnion.js.map