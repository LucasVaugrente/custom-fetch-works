"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryOperationSlice = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
/**
 * A comunica Slice Query Operation Actor.
 */
class ActorQueryOperationSlice extends bus_query_operation_1.ActorQueryOperationTypedMediated {
    constructor(args) {
        super(args, 'slice');
    }
    async testOperation(_operation, _context) {
        return (0, core_1.passTestVoid)();
    }
    async runOperation(operation, context) {
        // Add limit indicator to the context, which can be used for query planning
        // eslint-disable-next-line unicorn/explicit-length-check
        if (operation.length) {
            context = context.set(context_entries_1.KeysQueryOperation.limitIndicator, operation.length);
        }
        // Resolve the input
        const output = await this.mediatorQueryOperation
            .mediate({ operation: operation.input, context });
        if (output.type === 'bindings') {
            const bindingsStream = this.sliceStream(output.bindingsStream, operation);
            return {
                type: 'bindings',
                bindingsStream,
                metadata: this.sliceMetadata(output, operation),
            };
        }
        if (output.type === 'quads') {
            const quadStream = this.sliceStream(output.quadStream, operation);
            return {
                type: 'quads',
                quadStream,
                metadata: this.sliceMetadata(output, operation),
            };
        }
        // In all other cases, return the result as-is.
        return output;
    }
    // Slice the stream based on the pattern values
    sliceStream(stream, pattern) {
        // eslint-disable-next-line unicorn/explicit-length-check
        const hasLength = Boolean(pattern.length) || pattern.length === 0;
        const { start } = pattern;
        const end = hasLength ? pattern.start + pattern.length - 1 : Number.POSITIVE_INFINITY;
        return stream.transform({ offset: start, limit: Math.max(end - start + 1, 0), autoStart: false });
    }
    // If we find metadata, apply slicing on the total number of items
    sliceMetadata(output, pattern) {
        // eslint-disable-next-line unicorn/explicit-length-check
        const hasLength = Boolean(pattern.length) || pattern.length === 0;
        return () => output.metadata()
            .then((subMetadata) => {
            const cardinality = { ...subMetadata.cardinality };
            if (Number.isFinite(cardinality.value)) {
                cardinality.value = Math.max(0, cardinality.value - pattern.start);
                if (hasLength) {
                    cardinality.value = Math.min(cardinality.value, pattern.length);
                }
            }
            return { ...subMetadata, cardinality };
        });
    }
}
exports.ActorQueryOperationSlice = ActorQueryOperationSlice;
//# sourceMappingURL=ActorQueryOperationSlice.js.map