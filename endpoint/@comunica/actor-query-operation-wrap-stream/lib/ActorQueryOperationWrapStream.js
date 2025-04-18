"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEY_CONTEXT_WRAPPED_QUERY_OPERATION = exports.ActorQueryOperationWrapStream = void 0;
const bus_query_operation_1 = require("@comunica/bus-query-operation");
const core_1 = require("@comunica/core");
/**
 * A comunica Wrap Stream Query Operation Actor.
 */
class ActorQueryOperationWrapStream extends bus_query_operation_1.ActorQueryOperation {
    constructor(args) {
        super(args);
    }
    async test(action) {
        if (action.context.get(exports.KEY_CONTEXT_WRAPPED_QUERY_OPERATION) === action.operation) {
            return (0, core_1.failTest)('Unable to wrap query source multiple times');
        }
        // Ensure this is always run if not already wrapped
        return (0, core_1.passTest)({ httpRequests: Number.NEGATIVE_INFINITY });
    }
    async run(action) {
        // Prevent infinite recursion. In consequent query operation calls this key should be set to false
        // To allow the operation to wrap ALL query operation runs
        action.context = this.setContextWrapped(action.operation, action.context);
        const output = await this.mediatorQueryOperation.mediate(action);
        switch (output.type) {
            case 'bindings': {
                const bindingIteratorTransformed = await this.mediatorIteratorTransform.mediate({
                    type: 'bindings',
                    operation: action.operation.type,
                    stream: output.bindingsStream,
                    metadata: output.metadata,
                    originalAction: action,
                    context: action.context,
                });
                output.bindingsStream =
                    bindingIteratorTransformed.stream;
                output.metadata =
                    bindingIteratorTransformed.metadata;
                break;
            }
            case 'quads': {
                const iteratorTransformed = await this.mediatorIteratorTransform.mediate({
                    type: 'quads',
                    operation: action.operation.type,
                    stream: output.quadStream,
                    metadata: output.metadata,
                    context: action.context,
                    originalAction: action,
                });
                output.quadStream = iteratorTransformed.stream;
                output.metadata = iteratorTransformed.metadata;
                break;
            }
            default: {
                break;
            }
        }
        return output;
    }
    /**
     * Sets KEY_CONTEXT_WRAPPED_QUERY_OPERATION to the operation being executed.
     * @param operation The query operation.
     * @param context The current action context.
     * @returns A new action context with the operation marked as wrapped.
     */
    setContextWrapped(operation, context) {
        return context.set(exports.KEY_CONTEXT_WRAPPED_QUERY_OPERATION, operation);
    }
}
exports.ActorQueryOperationWrapStream = ActorQueryOperationWrapStream;
/**
 * Key that that stores the last executed operation
 */
exports.KEY_CONTEXT_WRAPPED_QUERY_OPERATION = new core_1.ActionContextKey('@comunica/actor-query-operation:wrapped');
//# sourceMappingURL=ActorQueryOperationWrapStream.js.map