"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadDestinationSparql = void 0;
const stream_to_string_1 = require("@jeswr/stream-to-string");
const asynciterator_1 = require("asynciterator");
const fetch_sparql_endpoint_1 = require("fetch-sparql-endpoint");
const rdf_string_ttl_1 = require("rdf-string-ttl");
/**
 * A quad destination that represents an LDP resource.
 */
class QuadDestinationSparql {
    constructor(url, context, mediatorHttp, dataFactory) {
        this.url = url;
        this.context = context;
        this.mediatorHttp = mediatorHttp;
        this.endpointFetcher = new fetch_sparql_endpoint_1.SparqlEndpointFetcher({
            fetch: (input, init) => this.mediatorHttp.mediate({ input, init, context: this.context }),
            prefixVariableQuestionMark: true,
            dataFactory,
        });
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
        // Serialize query stream to string
        const query = await (0, stream_to_string_1.stringify)(queryStream);
        // Send update query to endpoint
        await this.endpointFetcher.fetchUpdate(this.url, query);
    }
    async deleteGraphs(graphsIn, requireExistence, dropGraphs) {
        const graphs = Array.isArray(graphsIn) ?
            graphsIn :
            [graphsIn];
        const queries = [];
        for (const graph of graphs) {
            let graphValue;
            if (typeof graph === 'string') {
                graphValue = graph;
            }
            else if (graph.termType === 'DefaultGraph') {
                graphValue = 'DEFAULT';
            }
            else {
                graphValue = `GRAPH <${graph.value}>`;
            }
            queries.push(`${dropGraphs ? 'DROP' : 'CLEAR'} ${requireExistence ? '' : 'SILENT '}${graphValue}`);
        }
        await this.endpointFetcher.fetchUpdate(this.url, queries.join('; '));
    }
    async createGraphs(graphs, requireNonExistence) {
        const queries = [];
        for (const graph of graphs) {
            queries.push(`CREATE${requireNonExistence ? '' : ' SILENT'} GRAPH <${graph.value}>`);
        }
        await this.endpointFetcher.fetchUpdate(this.url, queries.join('; '));
    }
}
exports.QuadDestinationSparql = QuadDestinationSparql;
//# sourceMappingURL=QuadDestinationSparql.js.map