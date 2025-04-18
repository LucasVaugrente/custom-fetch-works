"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationReducedHash = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const core_1 = require("@comunica/core");
const utils_query_operation_1 = require("@comunica/utils-query-operation");
const lru_cache_1 = require("lru-cache");
/**
 * A comunica Reduced Hash Query Operation Actor.
 */
class ActorQueryOperationReducedHash extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'reduced');
    }
    async testOperation(_operation, _context) {
        return (0, core_1.passTestVoid)();
    }
    async runOperation(operation, context) {
        const output = (0, utils_query_operation_1.getSafeBindings)(await this.mediatorQueryOperation.mediate({ operation: operation.input, context }));
        const variables = (await output.metadata()).variables.map(v => v.variable);
        const bindingsStream = output.bindingsStream.filter(await this.newHashFilter(context, variables));
        return {
            type: 'bindings',
            bindingsStream,
            metadata: output.metadata,
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
        const hashes = new lru_cache_1.LRUCache({ max: this.cacheSize });
        return (bindings) => {
            const hash = hashFunction(bindings, variables);
            if (hashes.has(hash)) {
                return false;
            }
            hashes.set(hash, true);
            return true;
        };
    }
}
exports.ActorQueryOperationReducedHash = ActorQueryOperationReducedHash;
//# sourceMappingURL=ActorQueryOperationReducedHash.js.map