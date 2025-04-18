"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorQueryParse = void 0;
const core_1 = require("@comunica/core");
/**
 * A comunica actor for query-parse events.
 *
 * Actor types:
 * * Input:  IActionSparqlParse:      A SPARQL query string.
 * * Test:   <none>
 * * Output: IActorSparqlParseOutput: A parsed query in SPARQL query algebra.
 *
 * @see IActionQueryParse
 * @see IActorQueryParseOutput
 */
class ActorQueryParse extends core_1.Actor {
    /* eslint-disable max-len */
    /**
     * @param args -
     *   \ @defaultNested {<default_bus> a <cc:components/Bus.jsonld#Bus>} bus
     *   \ @defaultNested {Query parsing failed: none of the configured parsers were able to the query "${action.query}"} busFailMessage
     */
    /* eslint-enable max-len */
    constructor(args) {
        super(args);
    }
}
exports.ActorQueryParse = ActorQueryParse;
//# sourceMappingURL=ActorQueryParse.js.map