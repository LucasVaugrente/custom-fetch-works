"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryParseGraphql = void 0;
const bus_query_parse_1 = require("@comunica/bus-query-parse");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const graphql_to_sparql_1 = require("graphql-to-sparql");
/**
 * A comunica GraphQL SPARQL Parse Actor.
 */
class ActorQueryParseGraphql extends bus_query_parse_1.ActorQueryParse {
    constructor(args) {
        super(args);
        this.graphqlToSparql = new graphql_to_sparql_1.Converter({ requireContext: true });
    }
    async test(action) {
        if (action.queryFormat?.language !== 'graphql') {
            return (0, core_1.failTest)('This actor can only parse GraphQL queries');
        }
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const context = action.context.get(context_entries_1.KeysInitQuery.jsonLdContext) || {};
        const options = {
            // eslint-disable-next-line ts/no-unnecessary-type-assertion
            singularizeVariables: action.context.get(context_entries_1.KeysInitQuery.graphqlSingularizeVariables),
        };
        // TODO: pass data factory
        return { operation: await this.graphqlToSparql.graphqlToSparqlAlgebra(action.query, context, options) };
    }
}
exports.ActorQueryParseGraphql = ActorQueryParseGraphql;
//# sourceMappingURL=ActorQueryParseGraphql.js.map