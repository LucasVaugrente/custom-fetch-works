"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEY_CONTEXT_WRAPPED_RDF_JOIN = exports.ActorRdfJoinWrapStream = void 0;
const bus_rdf_join_1 = require("@comunica/bus-rdf-join");
const core_1 = require("@comunica/core");
/**
 * A comunica Wrap Stream RDF Join Actor.
 */
class ActorRdfJoinWrapStream extends bus_rdf_join_1.ActorRdfJoin {
    constructor(args) {
        super(args, {
            logicalType: 'inner',
            physicalName: 'wrap-stream',
            limitEntries: 0,
            limitEntriesMin: true,
            canHandleUndefs: true,
            isLeaf: false,
        });
    }
    async test(action) {
        if (action.context.get(exports.KEY_CONTEXT_WRAPPED_RDF_JOIN) === action.entries) {
            return (0, core_1.failTest)('Unable to wrap join operation multiple times');
        }
        const metadatas = await bus_rdf_join_1.ActorRdfJoin.getMetadatas(action.entries);
        return await this.getJoinCoefficients(action, { metadatas });
    }
    async getOutput(action) {
        // Prevent infinite recursion. In consequent query operation calls this key is set to false
        // To allow the operation to wrap ALL rdf-join runs
        action.context = this.setContextWrapped(action, action.context);
        const result = await this.mediatorJoin.mediate(action);
        const { stream, metadata } = (await this.mediatorIteratorTransform.mediate({
            type: result.type,
            operation: action.type,
            stream: result.bindingsStream,
            metadata: result.metadata,
            context: action.context,
            originalAction: action,
        }));
        result.bindingsStream = stream;
        result.metadata = metadata;
        return { result };
    }
    async getJoinCoefficients(_action, sideData) {
        return (0, core_1.passTestWithSideData)({
            iterations: -1,
            persistedItems: -1,
            blockingItems: -1,
            requestTime: -1,
        }, sideData);
    }
    /**
     * Sets KEY_CONTEXT_WRAPPED_RDF_JOIN key in the context to the entries being joined.
     * @param action The join action being executed
     * @param context The ActionContext
     * @returns The updated ActionContext
     */
    setContextWrapped(action, context) {
        return context.set(exports.KEY_CONTEXT_WRAPPED_RDF_JOIN, action.entries);
    }
}
exports.ActorRdfJoinWrapStream = ActorRdfJoinWrapStream;
/**
 * Key that shows if the query operation has already been wrapped by a process iterator call
 */
exports.KEY_CONTEXT_WRAPPED_RDF_JOIN = new core_1.ActionContextKey('@comunica/actor-rdf-join:wrapped');
//# sourceMappingURL=ActorRdfJoinWrapStream.js.map