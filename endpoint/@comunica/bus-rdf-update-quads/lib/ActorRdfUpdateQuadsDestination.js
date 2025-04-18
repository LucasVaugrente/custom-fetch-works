"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorRdfUpdateQuadsDestination = exports.deskolemize = exports.deskolemizeStream = void 0;
const actor_context_preprocess_query_source_skolemize_1 = require("@comunica/actor-context-preprocess-query-source-skolemize");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const ActorRdfUpdateQuads_1 = require("./ActorRdfUpdateQuads");
function deskolemizeStream(dataFactory, stream, id) {
    return stream?.map(quad => (0, actor_context_preprocess_query_source_skolemize_1.deskolemizeQuad)(dataFactory, quad, id));
}
exports.deskolemizeStream = deskolemizeStream;
function deskolemize(action) {
    const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
    const destination = action.context.get(context_entries_1.KeysRdfUpdateQuads.destination);
    const id = action.context.get(context_entries_1.KeysQuerySourceIdentify.sourceIds)?.get(destination);
    if (!id) {
        return action;
    }
    return {
        ...action,
        quadStreamInsert: deskolemizeStream(dataFactory, action.quadStreamInsert, id),
        quadStreamDelete: deskolemizeStream(dataFactory, action.quadStreamDelete, id),
    };
}
exports.deskolemize = deskolemize;
/**
 * A base implementation for rdf-update-quads events
 * that wraps around an {@link IQuadDestination}.
 *
 * @see IQuadDestination
 */
class ActorRdfUpdateQuadsDestination extends ActorRdfUpdateQuads_1.ActorRdfUpdateQuads {
    async test(_action) {
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const destination = await this.getDestination(action.context);
        return await this.getOutput(destination, deskolemize(action));
    }
    /**
     * Get the output of the given action on a destination.
     * @param {IQuadDestination} destination A quad destination, possibly lazy.
     * @param {IActionRdfUpdateQuads} action The action.
     */
    async getOutput(destination, action) {
        const execute = async () => {
            await destination.update({ insert: action.quadStreamInsert, delete: action.quadStreamDelete });
            await (action.deleteGraphs ?
                destination.deleteGraphs(action.deleteGraphs.graphs, action.deleteGraphs.requireExistence, action.deleteGraphs.dropGraphs) :
                Promise.resolve());
            await (action.createGraphs ?
                destination.createGraphs(action.createGraphs.graphs, action.createGraphs.requireNonExistence) :
                Promise.resolve());
        };
        return { execute };
    }
}
exports.ActorRdfUpdateQuadsDestination = ActorRdfUpdateQuadsDestination;
//# sourceMappingURL=ActorRdfUpdateQuadsDestination.js.map