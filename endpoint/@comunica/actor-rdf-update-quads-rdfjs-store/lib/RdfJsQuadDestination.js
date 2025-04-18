"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RdfJsQuadDestination = void 0;
const event_emitter_promisify_1 = require("event-emitter-promisify");
const rdf_string_1 = require("rdf-string");
/**
 * A quad destination that wraps around an {@link RDF.Store}.
 */
class RdfJsQuadDestination {
    constructor(dataFactory, store) {
        this.dataFactory = dataFactory;
        this.store = store;
    }
    async update(quadStreams) {
        if (quadStreams.delete) {
            await (0, event_emitter_promisify_1.promisifyEventEmitter)(this.store.remove(quadStreams.delete));
        }
        if (quadStreams.insert) {
            await (0, event_emitter_promisify_1.promisifyEventEmitter)(this.store.import(quadStreams.insert));
        }
    }
    async deleteGraphs(graphs, _requireExistence, _dropGraphs) {
        switch (graphs) {
            case 'ALL':
                /* eslint-disable no-fallthrough */
                // Remove the default graph
                await (0, event_emitter_promisify_1.promisifyEventEmitter)(this.store.deleteGraph(this.dataFactory.defaultGraph()));
            // Drop through to remove all named graphs
            case 'NAMED':
                /* eslint-enable no-fallthrough */
                // Warning: this is sub-optimal!
                // Query ALL quads to determine all named graphs
                // eslint-disable-next-line no-case-declarations
                const allQuads = this.store.match();
                // eslint-disable-next-line no-case-declarations
                const namedGraphs = {};
                allQuads.on('data', (quad) => {
                    if (quad.graph.termType !== 'DefaultGraph') {
                        namedGraphs[(0, rdf_string_1.termToString)(quad.graph)] = true;
                    }
                });
                await (0, event_emitter_promisify_1.promisifyEventEmitter)(allQuads);
                // Delete all named graphs
                await Promise.all(Object.keys(namedGraphs)
                    .map(namedGraph => (0, event_emitter_promisify_1.promisifyEventEmitter)(this.store
                    .deleteGraph((0, rdf_string_1.stringToTerm)(namedGraph, this.dataFactory)))));
                break;
            default:
                // Delete the default graph or a named graph
                for (const graph of Array.isArray(graphs) ? graphs : [graphs]) {
                    await (0, event_emitter_promisify_1.promisifyEventEmitter)(this.store.deleteGraph(graph));
                }
        }
    }
    async createGraphs(graphs, requireNonExistence) {
        // We don't have to create anything, since RDF/JS stores don't record empty graphs.
        // The only check we have to do is error on existence
        if (requireNonExistence) {
            for (const graph of graphs) {
                const eventEmitter = this.store.match(undefined, undefined, undefined, graph);
                await new Promise((resolve, reject) => {
                    eventEmitter.once('data', () => {
                        reject(new Error(`Unable to create graph ${graph.value} as it already exists`));
                    });
                    eventEmitter.on('end', resolve);
                    eventEmitter.on('error', reject);
                });
            }
        }
    }
}
exports.RdfJsQuadDestination = RdfJsQuadDestination;
//# sourceMappingURL=RdfJsQuadDestination.js.map