"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadDestinationPatchSparqlUpdate = void 0;
const bus_http_1 = require("@comunica/bus-http");
const asynciterator_1 = require("asynciterator");
const rdf_string_ttl_1 = require("rdf-string-ttl");
const readable_stream_1 = require("readable-stream");
/**
 * A quad destination that represents a resource that is patchable via SPARQL Update.
 */
class QuadDestinationPatchSparqlUpdate {
    constructor(url, context, mediatorHttp) {
        this.url = url;
        this.context = context;
        this.mediatorHttp = mediatorHttp;
    }
    async update(quadStreams) {
        // Create combined query stream with quads to insert and delete
        const queryStream = this.createCombinedQuadsQuery(quadStreams.insert, quadStreams.delete);
        await this.wrapSparqlUpdateRequest(queryStream);
    }
    createCombinedQuadsQuery(quadsToInsert, quadsToDelete) {
        return new asynciterator_1.ArrayIterator([], { autoStart: false })
            .append(this.createQuadsQuery('DELETE', quadsToDelete))
            .append(quadsToDelete && quadsToInsert ? [' ;\n'] : [])
            .append(this.createQuadsQuery('INSERT', quadsToInsert));
    }
    createQuadsQuery(type, quads) {
        if (!quads) {
            return new asynciterator_1.ArrayIterator([], { autoStart: false });
        }
        // Wrap triples in DATA block
        return quads
            .map((quad) => {
            let stringQuad = `${(0, rdf_string_ttl_1.termToString)(quad.subject)} ${(0, rdf_string_ttl_1.termToString)(quad.predicate)} ${(0, rdf_string_ttl_1.termToString)(quad.object)} .`;
            if (quad.graph.termType === 'DefaultGraph') {
                stringQuad = `  ${stringQuad}\n`;
            }
            else {
                stringQuad = `  GRAPH ${(0, rdf_string_ttl_1.termToString)(quad.graph)} { ${stringQuad} }\n`;
            }
            return stringQuad;
        })
            .prepend([`${type} DATA {\n`])
            .append(['}']);
    }
    async wrapSparqlUpdateRequest(queryStream) {
        const readable = new readable_stream_1.Readable();
        readable.wrap(queryStream);
        // Send data in PUT request
        const headers = new Headers({ 'content-type': 'application/sparql-update' });
        const httpResponse = await this.mediatorHttp.mediate({
            context: this.context,
            init: {
                headers,
                method: 'PATCH',
                body: bus_http_1.ActorHttp.toWebReadableStream(readable),
            },
            input: this.url,
        });
        await (0, bus_http_1.validateAndCloseHttpResponse)(this.url, httpResponse);
    }
    async deleteGraphs(_graphs, _requireExistence, _dropGraphs) {
        throw new Error(`Patch-based SPARQL Update destinations don't support named graphs`);
    }
    async createGraphs(_graphs, _requireNonExistence) {
        throw new Error(`Patch-based SPARQL Update destinations don't support named graphs`);
    }
}
exports.QuadDestinationPatchSparqlUpdate = QuadDestinationPatchSparqlUpdate;
//# sourceMappingURL=QuadDestinationPatchSparqlUpdate.js.map