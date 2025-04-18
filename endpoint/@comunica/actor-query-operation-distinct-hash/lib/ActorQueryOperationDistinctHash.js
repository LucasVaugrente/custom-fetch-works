"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationDistinctHash = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const core_1 = require("@comunica/core");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
/**
 * A comunica Distinct Hash Query Operation Actor.
 */
class ActorQueryOperationDistinctHash extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'distinct');
    }
    async testOperation(_operation, _context) {
        return (0, core_1.passTestVoid)();
    }
    async runOperation(operation, context) {
        const output = await this.mediatorQueryOperation.mediate({ operation: operation.input, context });
        if (output.type === 'quads') {
            const outputQuads = (0, utils_query_operation_1.getSafeQuads)(output);
            const quadStream = outputQuads.quadStream.filter(await this.newHashFilterQuads(context));
            return {
                type: 'quads',
                quadStream,
                metadata: outputQuads.metadata,
            };
        }
        const outputBindings = (0, utils_query_operation_1.getSafeBindings)(output);
        const variables = (await outputBindings.metadata()).variables.map(v => v.variable);
        const bindingsStream = outputBindings.bindingsStream
            .filter(await this.newHashFilter(context, variables));
        return {
            type: 'bindings',
            bindingsStream,
            metadata: outputBindings.metadata,
        };
    }
    /**
     * Create a new distinct filter function.
     * This will maintain an internal hash datastructure so that every bindings object only returns true once.
     * @param context The action context.
     * @param variables The variables to take into account while hashing.
     * @return {(bindings: Bindings) => boolean} A distinct filter for bindings.
     */
    async newHashFilter(context, variables) {
        const { hashFunction } = await this.mediatorHashBindings.mediate({ context });
        const hashes = {};
        return (bindings) => {
            const hash = hashFunction(bindings, variables);
            return !(hash in hashes) && (hashes[hash] = true);
        };
    }
    /**
     * Create a new distinct filter function to hash quads.
     * This will maintain an internal hash datastructure so that every quad object only returns true once.
     * @param context The action context.
     * @return {(quad: RDF.Quad) => boolean} A distinct filter for quads.
     */
    async newHashFilterQuads(context) {
        const { hashFunction } = await this.mediatorHashQuads.mediate({ context });
        const hashes = {};
        return (quad) => {
            const hash = hashFunction(quad);
            return !(hash in hashes) && (hashes[hash] = true);
        };
    }
}
exports.ActorQueryOperationDistinctHash = ActorQueryOperationDistinctHash;
//# sourceMappingURL=ActorQueryOperationDistinctHash.js.map