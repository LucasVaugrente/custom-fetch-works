"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryParseSparql = void 0;
const bus_query_parse_1 = require("@comunica/bus-query-parse");
const context_entries_1 = require("@comunica/context-entries");
const core_1 = require("@comunica/core");
const sparqlalgebrajs_1 = require("sparqlalgebrajs");
const sparqljs_1 = require("sparqljs");
/**
 * A comunica Algebra SPARQL Parse Actor.
 */
class ActorQueryParseSparql extends bus_query_parse_1.ActorQueryParse {
    constructor(args) {
        super(args);
        this.prefixes = Object.freeze(this.prefixes);
    }
    async test(action) {
        if (action.queryFormat && action.queryFormat.language !== 'sparql') {
            return (0, core_1.failTest)('This actor can only parse SPARQL queries');
        }
        return (0, core_1.passTestVoid)();
    }
    async run(action) {
        const dataFactory = action.context.getSafe(context_entries_1.KeysInitQuery.dataFactory);
        const parser = new sparqljs_1.Parser({
            prefixes: this.prefixes,
            baseIRI: action.baseIRI,
            sparqlStar: true,
            factory: dataFactory,
        });
        const parsedSyntax = parser.parse(action.query);
        const baseIRI = parsedSyntax.type === 'query' ? parsedSyntax.base : undefined;
        return {
            baseIRI,
            operation: (0, sparqlalgebrajs_1.translate)(parsedSyntax, {
                quads: true,
                prefixes: this.prefixes,
                blankToVariable: true,
                baseIRI: action.baseIRI,
                dataFactory,
            }),
        };
    }
}
exports.ActorQueryParseSparql = ActorQueryParseSparql;
//# sourceMappingURL=ActorQueryParseSparql.js.map